<template>
    <div class="page-dashboard">
        <!-- Background decoration -->
        <div class="page-bg-orb top-0 right-0 w-64 h-64 bg-teal-400/5 rounded-full blur-3xl" />
        <div class="page-bg-orb bottom-0 left-0 w-72 h-72 bg-emerald-300/5 rounded-full blur-3xl" />

        <!-- Header -->
        <div class="dash-header">
            <div>
                <h1 class="dash-title">Dashboard</h1>
                <p class="dash-date">{{ dateDisplay }}</p>
            </div>
            <div class="live-badge">
                <span class="live-dot" />
                <span>Live</span>
            </div>
        </div>

        <div v-if="loading" class="loader-wrap">
            <div class="loader-ring" />
            <span class="loader-text">Loading dashboard...</span>
        </div>

        <!-- ═══ EMPLOYEE ═══ -->
        <template v-else-if="data && data.role === 'employee'">
            <div class="card dash-card today-card" :class="{ 'no-record': !data.today_record }">
                <div class="card-top">
                    <h2>Today's Status</h2>
                    <span class="card-date-badge">{{ shortDate }}</span>
                </div>
                <template v-if="data.today_record">
                    <div class="status-hero" :class="'status-' + data.today_record.status">
                        <div class="status-icon-wrap">
                            <svg v-if="data.today_record.status === 'present'" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                            <svg v-else-if="data.today_record.status === 'late'" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                            <svg v-else fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                        </div>
                        <div class="status-label">{{ data.today_record.status }}</div>
                    </div>
                    <div class="time-row">
                        <div class="time-box"><span class="time-tag">Check In</span><span class="time-val">{{ formatTime(data.today_record.check_in_at) || '—' }}</span></div>
                        <div class="time-divider" />
                        <div class="time-box"><span class="time-tag">Check Out</span><span class="time-val">{{ formatTime(data.today_record.check_out_at) || 'Not yet' }}</span></div>
                    </div>
                </template>
                <div v-else class="empty-state">
                    <div class="empty-icon"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg></div>
                    <p>No record for today</p>
                </div>
                <router-link to="/check-in" class="card-action">Go to Check In <span>&rarr;</span></router-link>
            </div>

            <div class="card dash-card list-card">
                <h2 class="card-title">Recent Attendance</h2>
                <template v-if="data.recent_attendance?.length">
                    <div class="list-items">
                        <div v-for="(record, i) in data.recent_attendance" :key="record.id" class="list-item" :style="{ animationDelay: i * 0.06 + 's' }">
                            <div class="item-left">
                                <div class="item-icon" :class="'icon-' + record.status">
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                                </div>
                                <div><p class="item-title">{{ record.date }}</p><p class="item-sub">{{ formatTime(record.check_in_at) }} &mdash; {{ formatTime(record.check_out_at) || 'ongoing' }}</p></div>
                            </div>
                            <span class="badge" :class="'badge-' + record.status">{{ record.status }}</span>
                        </div>
                    </div>
                </template>
                <div v-else class="empty-state"><p>No records yet</p></div>
            </div>
        </template>

        <!-- ═══ HR/MANAGER ═══ -->
        <template v-else-if="data">
            <div class="stat-grid">
                <div v-for="(stat, i) in stats" :key="stat.key" class="stat-card" :class="'stat-' + stat.color" :style="{ animationDelay: i * 0.08 + 's' }">
                    <div class="stat-icon"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="stat.icon"/></svg></div>
                    <p class="stat-num">{{ stat.value }}</p>
                    <p class="stat-label">{{ stat.label }}</p>
                    <div class="stat-glow" />
                </div>
            </div>

            <div class="card dash-card table-card">
                <div class="card-top"><h2>Today's Attendance</h2><router-link to="/attendance" class="card-link">View all</router-link></div>
                <div class="table-wrap">
                    <table>
                        <thead><tr><th>Employee</th><th>Check In</th><th>Check Out</th><th>Status</th></tr></thead>
                        <tbody>
                            <tr v-for="(record, i) in data.recent_attendance" :key="record.id" :style="{ animationDelay: i * 0.05 + 's' }">
                                <td><div class="user-cell"><div class="user-avatar">{{ record.user?.name?.charAt(0) }}</div><span>{{ record.user?.name }}</span></div></td>
                                <td>{{ formatTime(record.check_in_at) || '—' }}</td>
                                <td>{{ formatTime(record.check_out_at) || '—' }}</td>
                                <td><span class="badge" :class="'badge-' + record.status">{{ record.status }}</span></td>
                            </tr>
                            <tr v-if="!data.recent_attendance?.length"><td colspan="4" class="empty-cell">No records for today</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="card dash-card table-card">
                <div class="card-top"><h2>Pending Leave Requests</h2><router-link to="/leave-management" class="card-link">Manage</router-link></div>
                <div class="table-wrap">
                    <table>
                        <thead><tr><th>Employee</th><th>Type</th><th>Duration</th><th>Reason</th></tr></thead>
                        <tbody>
                            <tr v-for="(lr, i) in data.pending_leaves" :key="lr.id" :style="{ animationDelay: i * 0.05 + 's' }">
                                <td><div class="user-cell"><div class="user-avatar">{{ lr.user?.name?.charAt(0) }}</div><span>{{ lr.user?.name }}</span></div></td>
                                <td class="capitalize">{{ lr.type }}</td>
                                <td>{{ lr.start_date }} &mdash; {{ lr.end_date }}</td>
                                <td class="truncate">{{ lr.reason }}</td>
                            </tr>
                            <tr v-if="!data.pending_leaves?.length"><td colspan="4" class="empty-cell">No pending leave requests</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="card dash-card weekly-card">
                <h2 class="card-title">Weekly Overview</h2>
                <div class="bar-chart">
                    <div v-for="day in data.attendance_this_week" :key="day.date" class="bar-col">
                        <div class="bar-fill-wrap"><div class="bar-fill" :style="{ height: barHeight(day), animationDelay: '0.3s' }" /></div>
                        <span class="bar-label">{{ dayLabel(day.date) }}</span>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import api from '../composables/useApi';
export default {
    name: 'Dashboard',
    setup() {
        const loading = ref(true);
        const data = ref(null);
        const dateDisplay = computed(() => new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
        const shortDate = computed(() => new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
        const stats = computed(() => [
            { key: 'total', label: 'Total Employees', color: 'teal', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z', value: data.value?.stats?.total_employees },
            { key: 'present', label: 'Present Today', color: 'green', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', value: data.value?.stats?.present_today },
            { key: 'late', label: 'Late Today', color: 'amber', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', value: data.value?.stats?.late_today },
            { key: 'absent', label: 'Absent Today', color: 'rose', icon: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z', value: data.value?.stats?.absent_today },
            { key: 'leaves', label: 'Pending Leaves', color: 'purple', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', value: data.value?.stats?.pending_leaves },
        ]);
        function formatTime(dt) { if (!dt) return null; return new Date(dt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); }
        function barHeight(day) { const max = Math.max(...(data.value?.attendance_this_week?.map(d => d.present) || [1]), 1); return Math.max(8, (day.present / max) * 100) + '%'; }
        function dayLabel(dateStr) { return new Date(dateStr + 'T00:00:00').toLocaleDateString('en', { weekday: 'short' }); }
        onMounted(async () => { try { const res = await api.get('/dashboard'); data.value = res.data; } catch (e) { console.error(e); } finally { loading.value = false; } });
        return { loading, data, dateDisplay, shortDate, stats, formatTime, barHeight, dayLabel };
    }
};
</script>

<style scoped>
.page-dashboard { display: flex; flex-direction: column; gap: 1.5rem; position: relative; }
.page-bg-orb { position: absolute; pointer-events: none; z-index: 0; }
.dash-header { display: flex; align-items: center; justify-content: space-between; animation: fadeInUp 0.4s ease-out both; position: relative; z-index: 1; }
.dash-title { font-size: 1.625rem; font-weight: 800; color: #111827; letter-spacing: -0.02em; }
.dash-date { font-size: 0.8125rem; color: #6b7280; margin-top: 2px; }
.live-badge { display: flex; align-items: center; gap: 8px; padding: 6px 14px; background: #fff; border-radius: 12px; font-size: 0.75rem; font-weight: 600; color: #6b7280; border: 1px solid #f1f5f9; box-shadow: 0 1px 3px rgba(0,0,0,0.04); }
.live-dot { width: 7px; height: 7px; border-radius: 50%; background: #10b981; box-shadow: 0 0 6px rgba(16,185,129,0.5); animation: livePulse 2s ease-in-out infinite; }
@keyframes livePulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.35; } }

.card { background: #fff; border-radius: 20px; border: 1px solid #f1f5f9; box-shadow: 0 1px 3px rgba(0,0,0,0.03), 0 8px 24px -12px rgba(0,0,0,0.06); overflow: hidden; position: relative; z-index: 1; }
.dash-card { animation: fadeInUp 0.5s ease-out both; }
.dash-card:nth-child(3) { animation-delay: 0.1s; }
.dash-card:nth-child(4) { animation-delay: 0.15s; }
.dash-card:nth-child(5) { animation-delay: 0.2s; }
.card-top { display: flex; align-items: center; justify-content: space-between; padding: 1.25rem 1.5rem; }
.card-top h2 { font-size: 1rem; font-weight: 700; color: #111827; }
.card-date-badge { font-size: 0.6875rem; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.05em; }
.card-title { font-size: 1rem; font-weight: 700; color: #111827; padding: 1.25rem 1.5rem; }
.card-link { font-size: 0.8125rem; font-weight: 600; color: #0D9488; text-decoration: none; transition: color 0.15s; }
.card-link:hover { color: #0F766E; }
.card-action { display: flex; align-items: center; justify-content: center; gap: 6px; padding: 0.875rem; background: #f8fafc; border-top: 1px solid #f1f5f9; font-size: 0.8125rem; font-weight: 600; color: #0D9488; text-decoration: none; transition: all 0.15s; }
.card-action:hover { background: #F0FDFA; }
.card-action span { transition: transform 0.15s; }
.card-action:hover span { transform: translateX(3px); }

.today-card { text-align: center; padding: 0; }
.status-hero { display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 1rem 0 1.25rem; }
.status-icon-wrap { width: 72px; height: 72px; border-radius: 24px; display: flex; align-items: center; justify-content: center; animation: popIn 0.4s ease-out both; }
.status-icon-wrap svg { width: 36px; height: 36px; }
.status-present .status-icon-wrap { background: #ECFDF5; color: #059669; }
.status-late .status-icon-wrap { background: #FFFBEB; color: #D97706; }
.status-absent .status-icon-wrap { background: #FFF1F2; color: #E11D48; }
.status-label { font-size: 1.25rem; font-weight: 700; text-transform: capitalize; color: #111827; }
.time-row { display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; padding: 1rem 1.5rem 1.5rem; background: #f9fafb; margin: 0 1.25rem 0; border-radius: 16px; }
.time-box { display: flex; flex-direction: column; gap: 2px; }
.time-tag { font-size: 0.6875rem; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.05em; }
.time-val { font-size: 0.9375rem; font-weight: 700; color: #111827; }
.time-divider { width: 1px; height: 32px; background: #e5e7eb; }

/* Stat Grid */
.stat-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.75rem; position: relative; z-index: 1; }
@media (min-width: 640px) { .stat-grid { grid-template-columns: repeat(5, 1fr); } }
.stat-card { position: relative; padding: 1.25rem; border-radius: 18px; border: 1px solid transparent; overflow: hidden; animation: fadeInUp 0.5s ease-out both; transition: transform 0.2s ease, box-shadow 0.2s ease; }
.stat-card:hover { transform: translateY(-2px); }
.stat-teal { background: linear-gradient(135deg, #F0FDFA, #CCFBF1); border-color: #99F6E4; }
.stat-green { background: linear-gradient(135deg, #ECFDF5, #D1FAE5); border-color: #A7F3D0; }
.stat-amber { background: linear-gradient(135deg, #FFFBEB, #FEF3C7); border-color: #FDE68A; }
.stat-rose { background: linear-gradient(135deg, #FFF1F2, #FFE4E6); border-color: #FECDD3; }
.stat-purple { background: linear-gradient(135deg, #FAF5FF, #F3E8FF); border-color: #E9D5FF; }
.stat-icon { width: 36px; height: 36px; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 10px; }
.stat-teal .stat-icon { background: #99F6E4; color: #0D9488; }
.stat-green .stat-icon { background: #A7F3D0; color: #059669; }
.stat-amber .stat-icon { background: #FDE68A; color: #D97706; }
.stat-rose .stat-icon { background: #FECDD3; color: #E11D48; }
.stat-purple .stat-icon { background: #E9D5FF; color: #7C3AED; }
.stat-icon svg { width: 18px; height: 18px; }
.stat-num { font-size: 1.75rem; font-weight: 800; color: #111827; line-height: 1; margin-bottom: 2px; }
.stat-label { font-size: 0.6875rem; color: #6b7280; font-weight: 500; }
.stat-glow { position: absolute; top: -20px; right: -20px; width: 80px; height: 80px; border-radius: 50%; opacity: 0.12; filter: blur(24px); }
.stat-teal .stat-glow { background: #0D9488; }
.stat-green .stat-glow { background: #10B981; }
.stat-amber .stat-glow { background: #F59E0B; }
.stat-rose .stat-glow { background: #E11D48; }
.stat-purple .stat-glow { background: #8B5CF6; }

.table-wrap { overflow-x: auto; }
.table-wrap table { width: 100%; font-size: 0.8125rem; border-collapse: collapse; }
.table-wrap thead th { text-align: left; padding: 0.75rem 1.5rem; font-size: 0.6875rem; font-weight: 700; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.05em; background: #f9fafb; }
.table-wrap tbody td { padding: 0.875rem 1.5rem; border-top: 1px solid #f3f4f6; color: #374151; }
.table-wrap tbody tr { animation: fadeInUp 0.35s ease-out both; transition: background 0.15s; }
.table-wrap tbody tr:hover { background: #f9fafb; }
.user-cell { display: flex; align-items: center; gap: 10px; }
.user-avatar { width: 30px; height: 30px; border-radius: 10px; background: linear-gradient(135deg, #0D9488, #059669); color: #fff; font-size: 0.75rem; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.empty-cell { text-align: center; padding: 3rem 1.5rem !important; color: #9ca3af; }

.badge { display: inline-flex; align-items: center; padding: 3px 10px; border-radius: 999px; font-size: 0.6875rem; font-weight: 700; text-transform: capitalize; }
.badge-present { background: #ECFDF5; color: #059669; }
.badge-late { background: #FFFBEB; color: #D97706; }
.badge-absent { background: #FFF1F2; color: #E11D48; }

.list-items { display: flex; flex-direction: column; gap: 2px; padding: 0 1.5rem 1.25rem; }
.list-item { display: flex; align-items: center; justify-content: space-between; padding: 0.875rem 1rem; border-radius: 14px; transition: background 0.15s; animation: fadeInUp 0.35s ease-out both; }
.list-item:hover { background: #f9fafb; }
.item-left { display: flex; align-items: center; gap: 12px; }
.item-icon { width: 38px; height: 38px; border-radius: 12px; display: flex; align-items: center; justify-content: center; }
.item-icon svg { width: 20px; height: 20px; }
.icon-present { background: #ECFDF5; color: #059669; }
.icon-late { background: #FFFBEB; color: #D97706; }
.icon-absent { background: #FFF1F2; color: #E11D48; }
.item-title { font-size: 0.8125rem; font-weight: 600; color: #111827; }
.item-sub { font-size: 0.75rem; color: #9ca3af; margin-top: 1px; }

.weekly-card { padding: 1.5rem; position: relative; z-index: 1; }
.bar-chart { display: flex; align-items: flex-end; gap: 0.5rem; height: 120px; margin-top: 0.5rem; }
.bar-col { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 6px; height: 100%; justify-content: flex-end; }
.bar-fill-wrap { width: 100%; height: 100%; display: flex; align-items: flex-end; justify-content: center; }
.bar-fill { width: 100%; max-width: 36px; background: linear-gradient(180deg, #0D9488, #34D399); border-radius: 8px 8px 0 0; min-height: 4px; animation: barGrow 0.6s ease-out both; transition: opacity 0.15s; }
.bar-fill:hover { opacity: 0.8; }
.bar-label { font-size: 0.625rem; font-weight: 600; color: #9ca3af; text-transform: uppercase; }

.empty-state { padding: 2.5rem 1.5rem; text-align: center; color: #9ca3af; font-size: 0.875rem; }
.empty-icon { width: 56px; height: 56px; border-radius: 16px; background: #f3f4f6; display: flex; align-items: center; justify-content: center; margin: 0 auto 12px; }
.empty-icon svg { width: 28px; height: 28px; color: #d1d5db; }

.loader-wrap { display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 6rem 0; position: relative; z-index: 1; }
.loader-ring { width: 40px; height: 40px; border: 3px solid #CCFBF1; border-top-color: #0D9488; border-radius: 50%; animation: spin 0.7s linear infinite; }
.loader-text { font-size: 0.8125rem; color: #9ca3af; }

@keyframes fadeInUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
@keyframes popIn { 0% { opacity: 0; transform: scale(0.8); } 70% { transform: scale(1.05); } 100% { opacity: 1; transform: scale(1); } }
@keyframes barGrow { from { height: 0; } }
@keyframes spin { to { transform: rotate(360deg); } }

/* ═══ DARK MODE OVERRIDES ═══ */
:global(.dark) .dash-title { color: #f1f5f9; }
:global(.dark) .dash-date { color: #64748b; }
:global(.dark) .live-badge { background: #1e293b; border-color: #334155; color: #94a3b8; }
:global(.dark) .card { background: #1e293b; border-color: #334155; }
:global(.dark) .card-top h2,
:global(.dark) .card-title { color: #f1f5f9; }
:global(.dark) .card-date-badge { color: #64748b; }
:global(.dark) .card-action { background: #0f172a; border-color: #334155; color: #5EEAD4; }
:global(.dark) .card-action:hover { background: rgba(13, 148, 136, 0.1); }
:global(.dark) .status-label { color: #f1f5f9; }
:global(.dark) .time-row { background: #0f172a; }
:global(.dark) .time-tag { color: #64748b; }
:global(.dark) .time-val { color: #f1f5f9; }
:global(.dark) .time-divider { background: #334155; }
:global(.dark) .stat-num { color: #f1f5f9; }
:global(.dark) .stat-label { color: #94a3b8; }
:global(.dark) .stat-teal { background: linear-gradient(135deg, rgba(13, 148, 136, 0.15), rgba(13, 148, 136, 0.08)); border-color: rgba(13, 148, 136, 0.25); }
:global(.dark) .stat-green { background: linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(16, 185, 129, 0.08)); border-color: rgba(16, 185, 129, 0.25); }
:global(.dark) .stat-amber { background: linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(245, 158, 11, 0.08)); border-color: rgba(245, 158, 11, 0.25); }
:global(.dark) .stat-rose { background: linear-gradient(135deg, rgba(225, 29, 72, 0.15), rgba(225, 29, 72, 0.08)); border-color: rgba(225, 29, 72, 0.25); }
:global(.dark) .stat-purple { background: linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(139, 92, 246, 0.08)); border-color: rgba(139, 92, 246, 0.25); }
:global(.dark) .stat-teal .stat-icon { background: rgba(13, 148, 136, 0.25); color: #5EEAD4; }
:global(.dark) .stat-green .stat-icon { background: rgba(16, 185, 129, 0.25); color: #34d399; }
:global(.dark) .stat-amber .stat-icon { background: rgba(245, 158, 11, 0.25); color: #fbbf24; }
:global(.dark) .stat-rose .stat-icon { background: rgba(225, 29, 72, 0.25); color: #fb7185; }
:global(.dark) .stat-purple .stat-icon { background: rgba(139, 92, 246, 0.25); color: #a78bfa; }
:global(.dark) .item-title { color: #e2e8f0; }
:global(.dark) .item-sub { color: #64748b; }
:global(.dark) .list-item:hover { background: #0f172a; }
:global(.dark) .empty-state { color: #64748b; }
:global(.dark) .bar-label { color: #64748b; }
:global(.dark) .loader-text { color: #64748b; }
:global(.dark) .loader-ring { border-color: rgba(13, 148, 136, 0.2); border-top-color: #0D9488; }
</style>
