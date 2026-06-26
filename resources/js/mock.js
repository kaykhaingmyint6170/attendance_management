// Mock API — monkey-patches axios API methods with in-memory mock
// Remove this file and the import in app.js when connecting to a real Laravel backend.

// ═══ Mock database ────────────────────────────────────────
const users = {
    'hr@team14.com':        { id: 1, name: 'Sarah Chen',    email: 'hr@team14.com',        role: 'hr',       token: 'mock-token-hr-001' },
    'manager@team14.com':   { id: 2, name: 'Mike Torres',   email: 'manager@team14.com',   role: 'manager',  token: 'mock-token-mgr-001' },
    'alice.johnson@team14.com': { id: 3, name: 'Alice Johnson', email: 'alice.johnson@team14.com', role: 'employee', token: 'mock-token-emp-001' },
};

let leaveId = 100;
const mkLeave = (uid, type, s, e, reason, status, notes = '') => ({
    id: leaveId++, user_id: uid, type, start_date: s, end_date: e, reason, status,
    admin_notes: notes, user: Object.values(users).find(u => u.id === uid),
});

const leaves = [
    mkLeave(3, 'vacation', '2026-06-20', '2026-06-22', 'Family trip to the beach', 'pending'),
    mkLeave(1, 'sick', '2026-06-15', '2026-06-15', 'Not feeling well', 'approved'),
    mkLeave(2, 'personal', '2026-06-25', '2026-06-26', 'Personal errands', 'pending'),
];

const mkAtt = (uid, date, status, ci, co) => ({
    id: Math.random().toString(36).slice(2, 8), user_id: uid, date, status,
    check_in_at: ci, check_out_at: co, user: Object.values(users).find(u => u.id === uid),
});

const attendance = [
    mkAtt(1, '2026-06-17', 'present', '2026-06-17T08:55:00Z', '2026-06-17T17:05:00Z'),
    mkAtt(2, '2026-06-17', 'present', '2026-06-17T09:02:00Z', null),
    mkAtt(3, '2026-06-17', 'late',   '2026-06-17T09:47:00Z', null),
    mkAtt(1, '2026-06-16', 'present', '2026-06-16T08:50:00Z', '2026-06-16T17:10:00Z'),
    mkAtt(2, '2026-06-16', 'present', '2026-06-16T09:00:00Z', '2026-06-16T17:00:00Z'),
    mkAtt(3, '2026-06-16', 'present', '2026-06-16T08:45:00Z', '2026-06-16T17:05:00Z'),
    mkAtt(1, '2026-06-15', 'present', '2026-06-15T08:58:00Z', '2026-06-15T17:00:00Z'),
    mkAtt(2, '2026-06-15', 'present', '2026-06-15T09:01:00Z', '2026-06-15T16:55:00Z'),
    mkAtt(3, '2026-06-15', 'absent',  null, null),
];

const today = () => new Date().toISOString().split('T')[0];
const delay = (ms) => new Promise(r => setTimeout(r, ms > 0 ? ms : 250));

function mkErr(status, msg) {
    const err = new Error(msg);
    err.response = { status, data: { message: msg } };
    return err;
}

// ═══ Route handler ────────────────────────────────────────
function handle(method, path, body, params) {
    const token = localStorage.getItem('token');
    const user = token ? Object.values(users).find(u => u.token === token) : null;

    // ── Auth ──
    if (path === '/login' && method === 'post') {
        const u = Object.values(users).find(x => x.email === body.email);
        if (!u || body.password !== 'password') throw mkErr(422, 'Invalid email or password.');
        return { data: { user: u, token: u.token } };
    }
    if (path === '/register' && method === 'post') {
        const nu = { id: 10, name: body.name, email: body.email, role: 'employee', token: 'mock-token-' + Date.now() };
        users[body.email] = nu;
        return { data: { user: nu, token: nu.token } };
    }
    if (path === '/user' && method === 'get') {
        if (!user) throw mkErr(401, 'Unauthenticated.');
        return { data: user };
    }
    if (path === '/logout' && method === 'post') {
        return { data: { message: 'Logged out' } };
    }

    // ── Dashboard ──
    if (path === '/dashboard' && method === 'get') {
        const cur = user || users['alice.johnson@team14.com'];
        const td = today();
        const todayAtt = attendance.filter(a => a.date === td);
        const present = todayAtt.filter(a => a.status === 'present' || a.status === 'late').length;
        return { data: {
            role: cur.role,
            stats: {
                total_employees: Object.keys(users).length, present_today: present,
                late_today: todayAtt.filter(a => a.status === 'late').length,
                absent_today: todayAtt.filter(a => a.status === 'absent').length,
                pending_leaves: leaves.filter(l => l.status === 'pending').length,
            },
            today_record: cur.role === 'employee'
                ? (attendance.find(a => a.user_id === cur.id && a.date === td) || null) : null,
            recent_attendance: todayAtt,
            pending_leaves: leaves.filter(l => l.status === 'pending'),
            attendance_this_week: [
                { date: '2026-06-12', present: 2 }, { date: '2026-06-13', present: 2 },
                { date: '2026-06-14', present: 3 }, { date: '2026-06-15', present: 3 },
                { date: '2026-06-16', present: 3 }, { date: '2026-06-17', present: 2 },
            ],
        }};
    }

    // ── Attendance ──
    if (path === '/attendance/today' && method === 'get') {
        const cur = user || users['alice.johnson@team14.com'];
        const td = today();
        const rec = attendance.find(a => a.user_id === cur.id && a.date === td);
        return { data: { record: rec || null, can_check_in: !(rec && rec.check_in_at), can_check_out: !!(rec && rec.check_in_at && !rec.check_out_at) } };
    }
    if (path === '/attendance/check-in' && method === 'post') {
        const cur = user || users['alice.johnson@team14.com'];
        const now = new Date();
        const rec = mkAtt(cur.id, today(), now.getHours() >= 9 ? 'late' : 'present', now.toISOString(), null);
        attendance.push(rec);
        return { data: rec };
    }
    if (path === '/attendance/check-out' && method === 'post') {
        const cur = user || users['alice.johnson@team14.com'];
        const td = today();
        const rec = attendance.find(a => a.user_id === cur.id && a.date === td);
        if (rec) rec.check_out_at = new Date().toISOString();
        return { data: rec };
    }
    if (path === '/attendance/my' && method === 'get') {
        const cur = user || users['alice.johnson@team14.com'];
        return { data: { data: attendance.filter(a => a.user_id === cur.id), current_page: 1, last_page: 1, next_page_url: null, prev_page_url: null } };
    }
    if (path === '/attendance' && method === 'get') {
        let filtered = [...attendance];
        if (params.date_from) filtered = filtered.filter(a => a.date >= params.date_from);
        if (params.date_to)   filtered = filtered.filter(a => a.date <= params.date_to);
        if (params.user_id)   filtered = filtered.filter(a => a.user_id === parseInt(params.user_id));
        return { data: { data: filtered, current_page: 1, last_page: 1, next_page_url: null, prev_page_url: null } };
    }

    // ── Leave Requests ──
    if (path === '/leave-requests/my' && method === 'get') {
        const cur = user || users['alice.johnson@team14.com'];
        return { data: { data: leaves.filter(l => l.user_id === cur.id), current_page: 1, last_page: 1, next_page_url: null, prev_page_url: null } };
    }
    if (path === '/leave-requests' && method === 'get') {
        let filtered = [...leaves];
        if (params.status) filtered = filtered.filter(l => l.status === params.status);
        return { data: { data: filtered, current_page: 1, last_page: 1, next_page_url: null, prev_page_url: null } };
    }
    if (path === '/leave-requests' && method === 'post') {
        const cur = user || users['alice.johnson@team14.com'];
        const lr = mkLeave(cur.id, body.type, body.start_date, body.end_date, body.reason, 'pending');
        leaves.unshift(lr);
        return { data: lr };
    }
    const lm = path.match(/^\/leave-requests\/(\d+)$/);
    if (lm) {
        const id = parseInt(lm[1]);
        const lr = leaves.find(l => l.id === id);
        if (method === 'put') {
            if (lr) { if (body.status) lr.status = body.status; if (body.admin_notes !== undefined) lr.admin_notes = body.admin_notes; }
            return { data: lr };
        }
        if (method === 'delete') {
            const idx = leaves.findIndex(l => l.id === id);
            if (idx !== -1) leaves.splice(idx, 1);
            return { data: { message: 'Deleted' } };
        }
    }

    // ── Users ──
    if (path === '/users' && method === 'get') {
        return { data: Object.values(users) };
    }

    throw mkErr(404, 'Not found');
}

// ═══ Monkey-patch the API module ──────────────────────────
// We patch after a microtick so that all components have their
// imports resolved, then we swap the real API for the mock.

import api from './composables/useApi';

const _get = api.get.bind(api);
const _post = api.post.bind(api);
const _put = api.put.bind(api);
const _delete = api.delete.bind(api);

function isLocal() {
    const h = window.location.hostname;
    return h.includes('localhost') || h.includes('127.0.0.1');
}

function mockRequest(method, url, data) {
    const noApi = url.replace(/^\/api/, '');
    const qIdx = noApi.indexOf('?');
    const cleaned = qIdx >= 0 ? noApi.slice(0, qIdx) : noApi;
    const params = {};
    if (qIdx >= 0) { new URLSearchParams(noApi.slice(qIdx + 1)).forEach((v, k) => { params[k] = v; }); }
    const body = typeof data === 'string' ? JSON.parse(data) : (data || {});
    try {
        const result = handle(method, cleaned, body, params);
        return Promise.resolve(result);
    } catch (e) {
        return Promise.reject(e);
    }
}

// Override API methods — with a 200-400ms simulated delay
api.get = function (url, config) {
    if (isLocal()) return _get(url, config);
    return delay(250).then(() => mockRequest('get', url));
};
api.post = function (url, data, config) {
    if (isLocal()) return _post(url, data, config);
    return delay(350).then(() => mockRequest('post', url, data));
};
api.put = function (url, data, config) {
    if (isLocal()) return _put(url, data, config);
    return delay(250).then(() => mockRequest('put', url, data));
};
api.delete = function (url, config) {
    if (isLocal()) return _delete(url, config);
    return delay(250).then(() => mockRequest('delete', url));
};
