<template>
    <div class="page-list">
        <div class="page-bg-orb top-0 right-0 w-56 h-56 bg-teal-400/4 rounded-full blur-3xl" />
        <div class="pg-header">
            <div><h1 class="pg-title">My Attendance History</h1><p class="pg-sub">View your check-in and check-out records</p></div>
        </div>
        <div v-if="loading" class="loader-wrap"><div class="loader-ring" /><span class="loader-text">Loading...</span></div>
        <div v-else>
            <div v-if="records.length" class="card table-card">
                <div class="table-wrap">
                    <table>
                        <thead><tr><th>Date</th><th>Check In</th><th>Check Out</th><th>Status</th></tr></thead>
                        <tbody>
                            <tr v-for="(rec, i) in records" :key="rec.id" :style="{ animationDelay: i * 0.05 + 's' }">
                                <td class="font-semibold">{{ rec.date }}</td><td>{{ formatTime(rec.check_in_at) }}</td><td>{{ formatTime(rec.check_out_at) || '—' }}</td>
                                <td><span class="badge" :class="'badge-' + rec.status">{{ rec.status }}</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div v-else class="card empty-card">
                <div class="empty-illustration-sm"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg></div>
                <p>No attendance records found</p>
            </div>
            <div v-if="pagination.last_page > 1" class="pager">
                <button class="pager-btn" :disabled="!pagination.prev_page_url" @click="loadPage(pagination.current_page - 1)">&larr; Prev</button>
                <span class="pager-info">Page {{ pagination.current_page }} of {{ pagination.last_page }}</span>
                <button class="pager-btn" :disabled="!pagination.next_page_url" @click="loadPage(pagination.current_page + 1)">Next &rarr;</button>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import api from '../../composables/useApi';
export default {
    name: 'MyAttendance',
    setup() {
        const loading = ref(true); const records = ref([]);
        const pagination = ref({ current_page: 1, last_page: 1, next_page_url: null, prev_page_url: null });
        function formatTime(dt) { if (!dt) return null; return new Date(dt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); }
        async function loadPage(page) { loading.value = true; try { const { data } = await api.get(`/attendance/my?page=${page}`); records.value = data.data; pagination.value = { current_page: data.current_page, last_page: data.last_page, next_page_url: data.next_page_url, prev_page_url: data.prev_page_url }; } catch (e) {} finally { loading.value = false; } }
        onMounted(() => loadPage(1));
        return { loading, records, pagination, formatTime, loadPage };
    }
};
</script>

<style scoped>
.page-list { display: flex; flex-direction: column; gap: 1.25rem; position: relative; }
.page-bg-orb { position: absolute; pointer-events: none; z-index: 0; }
.pg-header { animation: fadeInUp 0.4s ease-out both; position: relative; z-index: 1; }
.pg-title { font-size: 1.625rem; font-weight: 800; color: #111827; letter-spacing: -0.02em; }
.pg-sub { font-size: 0.8125rem; color: #6b7280; margin-top: 3px; }
.card { background: #fff; border-radius: 20px; border: 1px solid #f1f5f9; box-shadow: 0 1px 3px rgba(0,0,0,0.03), 0 8px 24px -12px rgba(0,0,0,0.06); overflow: hidden; animation: fadeInUp 0.5s ease-out 0.1s both; position: relative; z-index: 1; }
.table-wrap { overflow-x: auto; }
.table-wrap table { width: 100%; font-size: 0.8125rem; border-collapse: collapse; }
.table-wrap thead th { text-align: left; padding: 0.75rem 1.5rem; font-size: 0.6875rem; font-weight: 700; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.05em; background: #f9fafb; }
.table-wrap tbody td { padding: 0.875rem 1.5rem; border-top: 1px solid #f3f4f6; color: #374151; }
.table-wrap tbody tr { animation: fadeInUp 0.35s ease-out both; transition: background 0.15s; }
.table-wrap tbody tr:hover { background: #f9fafb; }

.badge { display: inline-flex; align-items: center; padding: 3px 10px; border-radius: 999px; font-size: 0.6875rem; font-weight: 700; text-transform: capitalize; }
.badge-present { background: #ECFDF5; color: #059669; }
.badge-late { background: #FFFBEB; color: #D97706; }
.badge-absent { background: #FFF1F2; color: #E11D48; }
.badge-pending { background: #FFFBEB; color: #D97706; }
.badge-approved { background: #ECFDF5; color: #059669; }
.badge-rejected { background: #FFF1F2; color: #E11D48; }

.empty-card { padding: 3.5rem 1.5rem; text-align: center; }
.empty-illustration-sm { width: 64px; height: 64px; border-radius: 18px; background: #f3f4f6; display: flex; align-items: center; justify-content: center; margin: 0 auto 14px; }
.empty-illustration-sm svg { width: 32px; height: 32px; color: #d1d5db; }
.empty-card > p { font-size: 0.9375rem; font-weight: 600; color: #6b7280; }

.pager { display: flex; align-items: center; justify-content: space-between; padding: 14px 18px; background: #fff; border-radius: 14px; border: 1px solid #f1f5f9; animation: fadeInUp 0.5s ease-out 0.2s both; position: relative; z-index: 1; }
.pager-btn { display: inline-flex; align-items: center; gap: 4px; padding: 6px 14px; border: 1px solid #e5e7eb; border-radius: 10px; font-size: 0.8125rem; font-weight: 600; color: #374151; background: #fff; cursor: pointer; transition: all 0.15s; }
.pager-btn:hover:not(:disabled) { background: #f9fafb; border-color: #d1d5db; }
.pager-btn:disabled { opacity: 0.4; cursor: not-allowed; }
.pager-info { font-size: 0.75rem; color: #9ca3af; font-weight: 500; }

.loader-wrap { display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 6rem 0; }
.loader-ring { width: 40px; height: 40px; border: 3px solid #CCFBF1; border-top-color: #0D9488; border-radius: 50%; animation: spin 0.7s linear infinite; }
.loader-text { font-size: 0.8125rem; color: #9ca3af; }

@keyframes fadeInUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
@keyframes spin { to { transform: rotate(360deg); } }
</style>
