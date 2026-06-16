<template>
    <div class="page-list">
        <div class="page-bg-orb bottom-0 left-0 w-56 h-56 bg-teal-400/4 rounded-full blur-3xl" />
        <div class="pg-header"><h1 class="pg-title">Leave Management</h1></div>
        <div v-if="loading" class="loader-wrap"><div class="loader-ring" /><span class="loader-text">Loading...</span></div>
        <div v-else>
            <div v-if="records.length" class="card table-card">
                <div class="table-wrap">
                    <table>
                        <thead><tr><th>Employee</th><th>Type</th><th>From</th><th>To</th><th>Reason</th><th>Status</th><th>Action</th></tr></thead>
                        <tbody>
                            <tr v-for="(lr, i) in records" :key="lr.id" :style="{ animationDelay: i * 0.05 + 's' }">
                                <td><div class="user-cell"><div class="user-avatar">{{ lr.user?.name?.charAt(0) }}</div><span class="font-semibold">{{ lr.user?.name }}</span></div></td>
                                <td class="capitalize">{{ lr.type }}</td><td>{{ lr.start_date }}</td><td>{{ lr.end_date }}</td>
                                <td class="truncate-cell">{{ lr.reason }}</td>
                                <td><span class="badge" :class="'badge-' + lr.status">{{ lr.status }}</span></td>
                                <td>
                                    <div v-if="lr.status === 'pending'" class="action-btns">
                                        <button @click="approveLeave(lr)" class="btn-sm btn-success">Approve</button>
                                        <button @click="openReject(lr)" class="btn-sm btn-danger">Reject</button>
                                    </div>
                                    <span v-else-if="lr.admin_notes" class="notes-hint" :title="lr.admin_notes">{{ lr.admin_notes.substring(0, 25) }}{{ lr.admin_notes.length > 25 ? '...' : '' }}</span>
                                </td>
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

        <!-- Reject Modal -->
        <transition name="fade">
            <div v-if="showRejectModal" class="modal-backdrop" @click.self="showRejectModal = false">
                <div class="modal-card">
                    <div class="modal-header">
                        <div class="modal-icon red"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"/></svg></div>
                        <div><h3>Reject Leave Request</h3><p>Employee: <strong>{{ rejectTarget?.user?.name }}</strong></p></div>
                    </div>
                    <textarea v-model="rejectNotes" rows="3" class="modal-textarea" placeholder="Reason for rejection (optional)"></textarea>
                    <div v-if="rejectError" class="error-msg"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><span>{{ rejectError }}</span></div>
                    <div class="modal-actions">
                        <button @click="confirmReject" :disabled="rejecting" class="btn btn-reject">
                            <span v-if="!rejecting">Reject</span><span v-else class="flex items-center gap-2"><span class="spinner-sm" /> Processing...</span>
                        </button>
                        <button @click="showRejectModal = false" class="btn btn-ghost-modal">Cancel</button>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import api from '../../composables/useApi';
export default {
    name: 'LeaveManagement',
    setup() {
        const loading = ref(true); const records = ref([]);
        const pagination = ref({ current_page: 1, last_page: 1, next_page_url: null, prev_page_url: null });
        const showRejectModal = ref(false); const rejectTarget = ref(null); const rejectNotes = ref(''); const rejectError = ref(null); const rejecting = ref(false);
        async function loadPage(page) { loading.value = true; try { const { data } = await api.get(`/leave-requests?page=${page}`); records.value = data.data; pagination.value = { current_page: data.current_page, last_page: data.last_page, next_page_url: data.next_page_url, prev_page_url: data.prev_page_url }; } catch (e) {} finally { loading.value = false; } }
        async function approveLeave(lr) { try { await api.put(`/leave-requests/${lr.id}`, { status: 'approved' }); loadPage(pagination.value.current_page); } catch (e) {} }
        function openReject(lr) { rejectTarget.value = lr; rejectNotes.value = ''; rejectError.value = null; showRejectModal.value = true; }
        async function confirmReject() { rejecting.value = true; rejectError.value = null; try { await api.put(`/leave-requests/${rejectTarget.value.id}`, { status: 'rejected', admin_notes: rejectNotes.value }); showRejectModal.value = false; loadPage(pagination.value.current_page); } catch (e) { rejectError.value = e.response?.data?.message || 'Failed to reject'; } finally { rejecting.value = false; } }
        onMounted(() => loadPage(1));
        return { loading, records, pagination, showRejectModal, rejectTarget, rejectNotes, rejectError, rejecting, loadPage, approveLeave, openReject, confirmReject };
    }
};
</script>

<style scoped>
.page-list { display: flex; flex-direction: column; gap: 1.25rem; position: relative; }
.page-bg-orb { position: absolute; pointer-events: none; z-index: 0; }
.pg-header { animation: fadeInUp 0.4s ease-out both; position: relative; z-index: 1; }
.pg-title { font-size: 1.625rem; font-weight: 800; color: #111827; letter-spacing: -0.02em; }
.card { background: #fff; border-radius: 20px; border: 1px solid #f1f5f9; box-shadow: 0 1px 3px rgba(0,0,0,0.03), 0 8px 24px -12px rgba(0,0,0,0.06); overflow: hidden; position: relative; z-index: 1; }
.table-card { animation: fadeInUp 0.5s ease-out 0.1s both; }
.table-wrap { overflow-x: auto; }
.table-wrap table { width: 100%; font-size: 0.8125rem; border-collapse: collapse; }
.table-wrap thead th { text-align: left; padding: 0.75rem 1.5rem; font-size: 0.6875rem; font-weight: 700; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.05em; background: #f9fafb; white-space: nowrap; }
.table-wrap tbody td { padding: 0.875rem 1.5rem; border-top: 1px solid #f3f4f6; color: #374151; }
.table-wrap tbody tr { animation: fadeInUp 0.35s ease-out both; transition: background 0.15s; }
.table-wrap tbody tr:hover { background: #f9fafb; }
.user-cell { display: flex; align-items: center; gap: 10px; }
.user-avatar { width: 30px; height: 30px; border-radius: 10px; background: linear-gradient(135deg, #0D9488, #059669); color: #fff; font-size: 0.75rem; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.truncate-cell { max-width: 180px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

.badge { display: inline-flex; align-items: center; padding: 3px 10px; border-radius: 999px; font-size: 0.6875rem; font-weight: 700; text-transform: capitalize; }
.badge-pending { background: #FFFBEB; color: #D97706; }
.badge-approved { background: #ECFDF5; color: #059669; }
.badge-rejected { background: #FFF1F2; color: #E11D48; }

.action-btns { display: flex; gap: 6px; }
.btn-sm { padding: 5px 14px; height: 32px; border-radius: 9px; font-size: 0.6875rem; font-weight: 700; cursor: pointer; border: none; transition: all 0.15s; }
.btn-success { background: #ECFDF5; color: #059669; }
.btn-success:hover { background: #D1FAE5; }
.btn-danger { background: #FFF1F2; color: #E11D48; }
.btn-danger:hover { background: #FFE4E6; }
.notes-hint { font-size: 0.75rem; color: #9ca3af; font-style: italic; }

.empty-card { padding: 3.5rem 1.5rem; text-align: center; }
.empty-illustration-sm { width: 64px; height: 64px; border-radius: 18px; background: #f3f4f6; display: flex; align-items: center; justify-content: center; margin: 0 auto 14px; }
.empty-illustration-sm svg { width: 32px; height: 32px; color: #d1d5db; }
.empty-card > p { font-size: 0.9375rem; font-weight: 600; color: #6b7280; }

.pager { display: flex; align-items: center; justify-content: space-between; padding: 14px 18px; background: #fff; border-radius: 14px; border: 1px solid #f1f5f9; animation: fadeInUp 0.5s ease-out 0.2s both; position: relative; z-index: 1; }
.pager-btn { display: inline-flex; align-items: center; gap: 4px; padding: 6px 14px; border: 1px solid #e5e7eb; border-radius: 10px; font-size: 0.8125rem; font-weight: 600; color: #374151; background: #fff; cursor: pointer; transition: all 0.15s; }
.pager-btn:hover:not(:disabled) { background: #f9fafb; border-color: #d1d5db; }
.pager-btn:disabled { opacity: 0.4; cursor: not-allowed; }
.pager-info { font-size: 0.75rem; color: #9ca3af; font-weight: 500; }

.btn { display: inline-flex; align-items: center; justify-content: center; gap: 6px; padding: 0 20px; height: 42px; border: none; border-radius: 13px; font-size: 0.8125rem; font-weight: 600; cursor: pointer; transition: all 0.15s; flex: 1; }
.btn-reject { background: linear-gradient(135deg, #E11D48, #BE123C); color: #fff; box-shadow: 0 2px 10px rgba(225,29,72,0.25); }
.btn-reject:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 4px 16px rgba(225,29,72,0.35); }
.btn-reject:disabled { opacity: 0.6; cursor: not-allowed; }
.btn-ghost-modal { background: #fff; color: #374151; border: 1px solid #e5e7eb; }
.btn-ghost-modal:hover { background: #f9fafb; }

.loader-wrap { display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 6rem 0; }
.loader-ring { width: 40px; height: 40px; border: 3px solid #CCFBF1; border-top-color: #0D9488; border-radius: 50%; animation: spin 0.7s linear infinite; }
.loader-text { font-size: 0.8125rem; color: #9ca3af; }

.modal-backdrop { position: fixed; inset: 0; background: rgba(17,24,39,0.5); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; z-index: 60; padding: 1rem; }
.modal-card { background: #fff; border-radius: 20px; padding: 1.5rem; max-width: 440px; width: 100%; box-shadow: 0 20px 60px rgba(0,0,0,0.15); animation: popIn 0.3s ease-out; }
.modal-header { display: flex; align-items: flex-start; gap: 14px; margin-bottom: 1.25rem; }
.modal-icon { width: 44px; height: 44px; border-radius: 14px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.modal-icon.red { background: #FFF1F2; color: #E11D48; }
.modal-icon svg { width: 22px; height: 22px; }
.modal-header h3 { font-size: 1.0625rem; font-weight: 700; color: #111827; }
.modal-header p { font-size: 0.8125rem; color: #6b7280; margin-top: 2px; }
.modal-textarea { width: 100%; padding: 10px 14px; border: 1px solid #e5e7eb; border-radius: 12px; font-size: 0.8125rem; color: #374151; background: #f9fafb; outline: none; resize: vertical; font-family: inherit; transition: all 0.15s; }
.modal-textarea:focus { border-color: #FECDD3; box-shadow: 0 0 0 3px rgba(225,29,72,0.08); background: #fff; }
.modal-actions { display: flex; gap: 10px; margin-top: 1.25rem; }
.error-msg { display: flex; align-items: center; gap: 8px; padding: 10px 14px; background: #FFF1F2; color: #E11D48; font-size: 0.8125rem; border-radius: 12px; border: 1px solid #FFE4E6; margin-top: 0.75rem; }
.error-msg svg { width: 16px; height: 16px; flex-shrink: 0; }

.spinner-sm { width: 16px; height: 16px; border: 2px solid rgba(255,255,255,0.3); border-top-color: #fff; border-radius: 50%; display: inline-block; animation: spin 0.6s linear infinite; }

.fade-enter-active { transition: opacity 0.2s ease; }
.fade-leave-active { transition: opacity 0.15s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

@keyframes fadeInUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
@keyframes spin { to { transform: rotate(360deg); } }
@keyframes popIn { 0% { opacity: 0; transform: scale(0.92); } 100% { opacity: 1; transform: scale(1); } }
</style>
