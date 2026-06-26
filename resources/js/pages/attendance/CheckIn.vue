<template>
    <div class="page-checkin">
        <div class="page-bg-orb top-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-teal-400/5 rounded-full blur-3xl" />

        <div class="ch-header">
            <div>
                <h1 class="ch-title">Check In / Out</h1>
                <p class="ch-date">{{ todayDate }}</p>
            </div>
            <div class="clock-illustration">
                <svg viewBox="0 0 100 100" class="clock-svg">
                    <circle cx="50" cy="50" r="46" fill="none" stroke="#e5e7eb" stroke-width="2" />
                    <circle cx="50" cy="50" r="46" fill="none" stroke="#0D9488" stroke-width="3" stroke-dasharray="289" stroke-dashoffset="72" stroke-linecap="round" />
                    <line x1="50" y1="50" x2="50" y2="26" stroke="#374151" stroke-width="3" stroke-linecap="round" />
                    <line x1="50" y1="50" x2="66" y2="50" stroke="#0D9488" stroke-width="2.5" stroke-linecap="round" />
                    <circle cx="50" cy="50" r="4" fill="#0D9488" />
                </svg>
            </div>
        </div>

        <div v-if="loading" class="loader-wrap"><div class="loader-ring" /><span class="loader-text">Loading...</span></div>

        <template v-else>
            <div class="card status-card" :class="{ 'has-record': todayRecord }">
                <div class="card-inner">
                    <h2 class="card-label">Today's Status</h2>
                    <template v-if="todayRecord">
                        <div class="time-row">
                            <div class="time-icon green"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/></svg></div>
                            <div class="time-info"><span class="time-label">Check In</span><span class="time-value">{{ formatTime(todayRecord.check_in_at) }}</span></div>
                        </div>
                        <div class="time-row">
                            <div class="time-icon orange"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg></div>
                            <div class="time-info"><span class="time-label">Check Out</span><span class="time-value">{{ todayRecord.check_out_at ? formatTime(todayRecord.check_out_at) : '—' }}</span></div>
                        </div>
                        <div class="status-badge-row"><span>Status</span><span class="badge-lg" :class="'badge-lg-' + todayRecord.status">{{ todayRecord.status }}</span></div>
                    </template>
                    <div v-else class="empty-state">
                        <div class="empty-illustration"><div class="empty-circle"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg></div><div class="empty-ripple" /></div>
                        <p>No record yet</p><p class="empty-sub">Ready to start your day?</p>
                    </div>
                </div>
            </div>

            <div class="actions">
                <button v-if="canCheckIn" @click="doCheckIn" :disabled="actionLoading" class="btn btn-checkin">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    <span>{{ actionLoading ? 'Processing...' : 'Check In' }}</span>
                </button>
                <button v-if="canCheckOut" @click="doCheckOut" :disabled="actionLoading" class="btn btn-checkout">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    <span>{{ actionLoading ? 'Processing...' : 'Check Out' }}</span>
                </button>
                <div v-if="!canCheckIn && !canCheckOut" class="done-state">
                    <div class="done-icon"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg></div>
                    <p>All done for today!</p>
                </div>
            </div>

            <transition name="slide-up">
                <div v-if="message" class="msg" :class="'msg-' + messageType">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path v-if="messageType === 'error'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span>{{ message }}</span>
                </div>
            </transition>
        </template>
    </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import api from '../../composables/useApi';
export default {
    name: 'CheckIn',
    setup() {
        const loading = ref(true); const actionLoading = ref(false);
        const todayRecord = ref(null); const canCheckIn = ref(true); const canCheckOut = ref(false);
        const message = ref(null); const messageType = ref('success');
        const todayDate = computed(() => new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
        function formatTime(dt) { if (!dt) return '—'; return new Date(dt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); }
        async function loadStatus() {
            try { const { data } = await api.get('/attendance/today'); todayRecord.value = data.record; canCheckIn.value = data.can_check_in; canCheckOut.value = data.can_check_out; } catch (e) {} finally { loading.value = false; }
        }
        async function doCheckIn() { actionLoading.value = true; message.value = null; try { const { data } = await api.post('/attendance/check-in'); todayRecord.value = data; canCheckIn.value = false; canCheckOut.value = true; message.value = 'Checked in successfully!'; messageType.value = 'success'; } catch (e) { message.value = e.response?.data?.message || 'Check-in failed'; messageType.value = 'error'; } finally { actionLoading.value = false; } }
        async function doCheckOut() { actionLoading.value = true; message.value = null; try { const { data } = await api.post('/attendance/check-out'); todayRecord.value = data; canCheckOut.value = false; message.value = 'Checked out successfully!'; messageType.value = 'success'; } catch (e) { message.value = e.response?.data?.message || 'Check-out failed'; messageType.value = 'error'; } finally { actionLoading.value = false; } }
        onMounted(loadStatus);
        return { loading, actionLoading, todayRecord, canCheckIn, canCheckOut, message, messageType, todayDate, formatTime, doCheckIn, doCheckOut };
    }
};
</script>

<style scoped>
.page-checkin { max-width: 28rem; margin: 0 auto; display: flex; flex-direction: column; gap: 1.5rem; position: relative; }
.page-bg-orb { position: absolute; pointer-events: none; z-index: 0; }
.ch-header { display: flex; align-items: center; justify-content: space-between; animation: fadeInUp 0.4s ease-out both; position: relative; z-index: 1; }
.ch-title { font-size: 1.625rem; font-weight: 800; color: #111827; letter-spacing: -0.02em; }
.ch-date { font-size: 0.8125rem; color: #6b7280; margin-top: 3px; }
.clock-illustration { width: 64px; height: 64px; flex-shrink: 0; }
.clock-svg { width: 100%; height: 100%; animation: clockFloat 4s ease-in-out infinite; }
@keyframes clockFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
.card { background: #fff; border-radius: 20px; border: 1px solid #f1f5f9; box-shadow: 0 1px 3px rgba(0,0,0,0.03), 0 8px 24px -12px rgba(0,0,0,0.06); animation: fadeInUp 0.5s ease-out 0.1s both; position: relative; z-index: 1; }
.card-inner { padding: 1.5rem; }
.card-label { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #9ca3af; margin-bottom: 1rem; text-align: center; }
.time-row { display: flex; align-items: center; gap: 14px; padding: 1rem; border-radius: 14px; background: #f9fafb; margin-bottom: 8px; }
.time-icon { width: 42px; height: 42px; border-radius: 13px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.time-icon svg { width: 20px; height: 20px; }
.time-icon.green { background: #ECFDF5; color: #059669; }
.time-icon.orange { background: #FFF7ED; color: #F97316; }
.time-info { display: flex; flex-direction: column; gap: 1px; }
.time-label { font-size: 0.6875rem; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.05em; }
.time-value { font-size: 1rem; font-weight: 700; color: #111827; }
.status-badge-row { display: flex; align-items: center; justify-content: space-between; padding: 0.75rem 1rem; margin-top: 4px; }
.status-badge-row > span:first-child { font-size: 0.8125rem; color: #6b7280; }
.badge-lg { padding: 5px 14px; border-radius: 999px; font-size: 0.75rem; font-weight: 700; text-transform: capitalize; }
.badge-lg-present { background: #ECFDF5; color: #059669; }
.badge-lg-late { background: #FFFBEB; color: #D97706; }
.badge-lg-absent { background: #FFF1F2; color: #E11D48; }
.empty-state { text-align: center; padding: 1.5rem 0 0.5rem; }
.empty-illustration { position: relative; width: 80px; height: 80px; margin: 0 auto 1rem; display: flex; align-items: center; justify-content: center; }
.empty-circle { width: 72px; height: 72px; border-radius: 24px; background: #f3f4f6; display: flex; align-items: center; justify-content: center; }
.empty-circle svg { width: 34px; height: 34px; color: #d1d5db; }
.empty-ripple { position: absolute; inset: -4px; border-radius: 28px; border: 2px solid rgba(209,213,219,0.5); animation: ripple 2s ease-out infinite; }
@keyframes ripple { 0% { transform: scale(1); opacity: 0.6; } 100% { transform: scale(1.15); opacity: 0; } }
.empty-state > p { font-size: 0.9375rem; font-weight: 600; color: #6b7280; }
.empty-sub { font-size: 0.8125rem !important; font-weight: 400 !important; color: #9ca3af !important; margin-top: 2px; }
.actions { display: flex; gap: 12px; justify-content: center; animation: fadeInUp 0.5s ease-out 0.15s both; position: relative; z-index: 1; }
.btn { flex: 1; display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 0.875rem 1.5rem; border: none; border-radius: 16px; font-size: 0.9375rem; font-weight: 700; color: #fff; cursor: pointer; transition: all 0.2s ease; }
.btn svg { width: 20px; height: 20px; }
.btn:hover:not(:disabled) { transform: translateY(-1px); }
.btn:active:not(:disabled) { transform: scale(0.98); }
.btn:disabled { opacity: 0.5; cursor: not-allowed; }
.btn-checkin { background: linear-gradient(135deg, #059669, #047857); box-shadow: 0 4px 20px rgba(5,150,105,0.3); }
.btn-checkin:hover:not(:disabled) { box-shadow: 0 6px 28px rgba(5,150,105,0.4); }
.btn-checkout { background: linear-gradient(135deg, #F97316, #DC2626); box-shadow: 0 4px 20px rgba(220,38,38,0.25); }
.btn-checkout:hover:not(:disabled) { box-shadow: 0 6px 28px rgba(220,38,38,0.35); }
.done-state { text-align: center; padding: 1rem; animation: popIn 0.4s ease-out; }
.done-icon { width: 56px; height: 56px; border-radius: 50%; background: #ECFDF5; color: #059669; display: flex; align-items: center; justify-content: center; margin: 0 auto 12px; box-shadow: 0 0 0 8px rgba(5,150,105,0.1); animation: donePulse 2s ease-in-out infinite; }
.done-icon svg { width: 28px; height: 28px; }
@keyframes donePulse { 0%, 100% { box-shadow: 0 0 0 8px rgba(5,150,105,0.1); } 50% { box-shadow: 0 0 0 16px rgba(5,150,105,0.05); } }
.done-state p { font-size: 0.9375rem; font-weight: 600; color: #374151; }
.msg { display: flex; align-items: center; justify-content: center; gap: 8px; padding: 12px 16px; border-radius: 14px; font-size: 0.8125rem; font-weight: 600; position: relative; z-index: 1; }
.msg svg { width: 20px; height: 20px; flex-shrink: 0; }
.msg-success { background: #ECFDF5; color: #059669; border: 1px solid #A7F3D0; }
.msg-error { background: #FFF1F2; color: #E11D48; border: 1px solid #FECDD3; }
.loader-wrap { display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 6rem 0; }
.loader-ring { width: 40px; height: 40px; border: 3px solid #CCFBF1; border-top-color: #0D9488; border-radius: 50%; animation: spin 0.7s linear infinite; }
.loader-text { font-size: 0.8125rem; color: #9ca3af; }
.slide-up-enter-active { transition: all 0.3s ease-out; }
.slide-up-leave-active { transition: all 0.2s ease-in; }
.slide-up-enter-from { opacity: 0; transform: translateY(10px); }
.slide-up-leave-to { opacity: 0; transform: translateY(-10px); }
@keyframes fadeInUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
@keyframes popIn { 0% { opacity: 0; transform: scale(0.8); } 70% { transform: scale(1.05); } 100% { opacity: 1; transform: scale(1); } }
@keyframes spin { to { transform: rotate(360deg); } }

/* ═══ DARK MODE OVERRIDES ═══ */
:global(.dark) .ch-title { color: #f1f5f9; }
:global(.dark) .ch-date { color: #64748b; }
:global(.dark) .card { background: #1e293b; border-color: #334155; }
:global(.dark) .card-label { color: #64748b; }
:global(.dark) .time-row { background: #0f172a; }
:global(.dark) .time-value { color: #f1f5f9; }
:global(.dark) .time-label { color: #64748b; }
:global(.dark) .status-badge-row > span:first-child { color: #94a3b8; }
:global(.dark) .empty-circle { background: #334155; }
:global(.dark) .empty-circle svg { color: #64748b; }
:global(.dark) .empty-state > p { color: #94a3b8; }
:global(.dark) .empty-sub { color: #64748b !important; }
:global(.dark) .done-state p { color: #cbd5e1; }
:global(.dark) .loader-ring { border-color: rgba(13, 148, 136, 0.2); border-top-color: #0D9488; }
:global(.dark) .loader-text { color: #64748b; }
</style>
