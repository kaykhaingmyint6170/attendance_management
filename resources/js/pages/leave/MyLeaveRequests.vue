<template>
    <div class="page-list">
        <div class="page-bg-orb bottom-0 left-0 w-56 h-56 bg-teal-400/4 rounded-full blur-3xl" />
        <div class="pg-header">
            <div><h1 class="pg-title">My Leave Requests</h1><p class="pg-sub">Manage your leave submissions</p></div>
            <button @click="showForm = !showForm" class="btn btn-primary">
                <svg v-if="!showForm" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
                <svg v-else fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                {{ showForm ? 'Close' : 'New Request' }}
            </button>
        </div>
        <transition name="slide-down">
            <div v-if="showForm" class="card form-card">
                <div class="form-header-row"><div class="form-icon"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg></div><h3>New Leave Request</h3></div>
                <form @submit.prevent="submitLeave" class="form-grid">
                    <div class="field"><label>Leave Type</label><select v-model="form.type"><option value="vacation">Vacation</option><option value="sick">Sick</option><option value="personal">Personal</option><option value="other">Other</option></select></div>
                    <div class="field-row"><div class="field flex-1"><label>Start Date</label><input v-model="form.start_date" type="date" /></div><div class="field flex-1"><label>End Date</label><input v-model="form.end_date" type="date" /></div></div>
                    <div class="field"><label>Reason</label><textarea v-model="form.reason" rows="3" placeholder="Brief reason for leave..."></textarea></div>
                    <div v-if="formError" class="error-msg"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><span>{{ formError }}</span></div>
                    <div class="form-actions">
                        <button type="submit" :disabled="submitting" class="btn btn-primary"><span v-if="!submitting">Submit Request</span><span v-else class="flex items-center gap-2"><span class="spinner-sm" /> Submitting...</span></button>
                        <button type="button" @click="showForm = false" class="btn btn-ghost">Cancel</button>
                    </div>
                </form>
            </div>
        </transition>
        <div v-if="loading" class="loader-wrap"><div class="loader-ring" /><span class="loader-text">Loading...</span></div>
        <div v-else>
            <div v-if="records.length" class="card table-card">
                <div class="table-wrap">
                    <table>
                        <thead><tr><th>Type</th><th>From</th><th>To</th><th>Reason</th><th>Status</th><th>Action</th></tr></thead>
                        <tbody>
                            <tr v-for="(lr, i) in records" :key="lr.id" :style="{ animationDelay: i * 0.05 + 's' }">
                                <td class="font-semibold capitalize">{{ lr.type }}</td><td>{{ lr.start_date }}</td><td>{{ lr.end_date }}</td>
                                <td class="truncate-cell">{{ lr.reason }}</td>
                                <td><span class="badge" :class="'badge-' + lr.status">{{ lr.status }}</span></td>
                                <td><button v-if="lr.status === 'pending'" @click="deleteLeave(lr.id)" class="btn-sm btn-danger">Cancel</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div v-else class="card empty-card">
                <div class="empty-illustration-sm"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg></div>
                <p>No leave requests found</p>
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
import { ref, reactive, onMounted } from 'vue';
import api from '../../composables/useApi';
export default {
    name: 'MyLeaveRequests',
    setup() {
        const loading = ref(true); const records = ref([]); const pagination = ref({ current_page: 1, last_page: 1, next_page_url: null, prev_page_url: null });
        const showForm = ref(false); const submitting = ref(false); const formError = ref(null);
        const form = reactive({ type: 'vacation', start_date: '', end_date: '', reason: '' });
        async function loadPage(page) { loading.value = true; try { const { data } = await api.get(`/leave-requests/my?page=${page}`); records.value = data.data; pagination.value = { current_page: data.current_page, last_page: data.last_page, next_page_url: data.next_page_url, prev_page_url: data.prev_page_url }; } catch (e) {} finally { loading.value = false; } }
        async function submitLeave() { submitting.value = true; formError.value = null; try { await api.post('/leave-requests', form); showForm.value = false; form.type = 'vacation'; form.start_date = ''; form.end_date = ''; form.reason = ''; loadPage(1); } catch (e) { const errs = e.response?.data?.errors; formError.value = errs ? Object.values(errs).flat().join(', ') : e.response?.data?.message || 'Submission failed'; } finally { submitting.value = false; } }
        async function deleteLeave(id) { if (!confirm('Cancel this leave request?')) return; try { await api.delete(`/leave-requests/${id}`); loadPage(pagination.value.current_page); } catch (e) {} }
        onMounted(() => loadPage(1));
        return { loading, records, pagination, showForm, submitting, formError, form, loadPage, submitLeave, deleteLeave };
    }
};
</script>

<style scoped>
.page-list { display: flex; flex-direction: column; gap: 1.25rem; position: relative; }
.page-bg-orb { position: absolute; pointer-events: none; z-index: 0; }
.pg-header { display: flex; align-items: center; justify-content: space-between; animation: fadeInUp 0.4s ease-out both; position: relative; z-index: 1; }
.pg-title { font-size: 1.625rem; font-weight: 800; color: #111827; letter-spacing: -0.02em; }
.pg-sub { font-size: 0.8125rem; color: #6b7280; margin-top: 3px; }
.card { background: #fff; border-radius: 20px; border: 1px solid #f1f5f9; box-shadow: 0 1px 3px rgba(0,0,0,0.03), 0 8px 24px -12px rgba(0,0,0,0.06); overflow: hidden; position: relative; z-index: 1; }
.form-card { padding: 1.5rem; animation: fadeInUp 0.4s ease-out both; }
.form-header-row { display: flex; align-items: center; gap: 12px; margin-bottom: 1.25rem; }
.form-icon { width: 40px; height: 40px; border-radius: 12px; background: #F0FDFA; color: #0D9488; display: flex; align-items: center; justify-content: center; }
.form-icon svg { width: 20px; height: 20px; }
.form-header-row h3 { font-size: 1.0625rem; font-weight: 700; color: #111827; }
.form-grid { display: flex; flex-direction: column; gap: 1rem; }
.field { display: flex; flex-direction: column; gap: 0.25rem; }
.field label { font-size: 0.6875rem; font-weight: 600; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.05em; }
.field input, .field select, .field textarea { padding: 10px 14px; border: 1px solid #e5e7eb; border-radius: 12px; font-size: 0.8125rem; color: #374151; background: #f9fafb; outline: none; transition: all 0.15s; font-family: inherit; }
.field input:focus, .field select:focus, .field textarea:focus { border-color: #5EEAD4; box-shadow: 0 0 0 3px rgba(13,148,136,0.08); background: #fff; }
.field textarea { resize: vertical; }
.field-row { display: flex; gap: 0.75rem; }
.btn { display: inline-flex; align-items: center; gap: 6px; padding: 0 20px; height: 42px; border: none; border-radius: 13px; font-size: 0.8125rem; font-weight: 600; cursor: pointer; transition: all 0.15s; }
.btn svg { width: 18px; height: 18px; }
.btn-primary { background: linear-gradient(135deg, #0D9488, #0F766E); color: #fff; box-shadow: 0 2px 10px rgba(13,148,136,0.25); }
.btn-primary:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 4px 16px rgba(13,148,136,0.35); }
.btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }
.btn-ghost { background: #fff; color: #374151; border: 1px solid #e5e7eb; }
.btn-ghost:hover { background: #f9fafb; }
.btn-sm { padding: 5px 14px; height: 32px; border-radius: 9px; font-size: 0.6875rem; font-weight: 700; cursor: pointer; border: none; transition: all 0.15s; }
.btn-danger { background: #FFF1F2; color: #E11D48; }
.btn-danger:hover { background: #FFE4E6; }
.form-actions { display: flex; gap: 10px; margin-top: 4px; }
.error-msg { display: flex; align-items: center; gap: 8px; padding: 10px 14px; background: #FFF1F2; color: #E11D48; font-size: 0.8125rem; border-radius: 12px; border: 1px solid #FFE4E6; }
.error-msg svg { width: 16px; height: 16px; flex-shrink: 0; }
.table-card { animation: fadeInUp 0.5s ease-out 0.1s both; }
.table-wrap { overflow-x: auto; }
.table-wrap table { width: 100%; font-size: 0.8125rem; border-collapse: collapse; }
.table-wrap thead th { text-align: left; padding: 0.75rem 1.5rem; font-size: 0.6875rem; font-weight: 700; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.05em; background: #f9fafb; white-space: nowrap; }
.table-wrap tbody td { padding: 0.875rem 1.5rem; border-top: 1px solid #f3f4f6; color: #374151; }
.table-wrap tbody tr { animation: fadeInUp 0.35s ease-out both; transition: background 0.15s; }
.table-wrap tbody tr:hover { background: #f9fafb; }
.truncate-cell { max-width: 180px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

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
.spinner-sm { width: 16px; height: 16px; border: 2px solid rgba(255,255,255,0.3); border-top-color: #fff; border-radius: 50%; display: inline-block; animation: spin 0.6s linear infinite; }

.slide-down-enter-active { transition: all 0.3s ease-out; }
.slide-down-leave-active { transition: all 0.2s ease-in; }
.slide-down-enter-from { opacity: 0; transform: translateY(-10px); max-height: 0; }
.slide-down-enter-to { max-height: 500px; }
.slide-down-leave-from { max-height: 500px; }
.slide-down-leave-to { opacity: 0; transform: translateY(-10px); max-height: 0; }

@keyframes fadeInUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
@keyframes spin { to { transform: rotate(360deg); } }

/* ═══ DARK MODE OVERRIDES ═══ */
:global(.dark) .pg-title { color: #f1f5f9; }
:global(.dark) .pg-sub { color: #64748b; }
:global(.dark) .card { background: #1e293b; border-color: #334155; }
:global(.dark) .form-header-row h3 { color: #f1f5f9; }
:global(.dark) .form-icon { background: rgba(13, 148, 136, 0.15); color: #5EEAD4; }
:global(.dark) .empty-card > p { color: #94a3b8; }
:global(.dark) .pager-info { color: #64748b; }
:global(.dark) .loader-ring { border-color: rgba(13, 148, 136, 0.2); border-top-color: #0D9488; }
:global(.dark) .loader-text { color: #64748b; }
</style>
