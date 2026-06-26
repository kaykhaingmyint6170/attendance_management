<template>
    <div class="dp-wrapper" ref="wrapperRef">
        <div class="dp-input" :class="{ 'dp-input--active': open }" @click="toggle">
            <svg class="dp-input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            <span :class="{ 'dp-input-placeholder': !modelValue }">{{ displayValue || placeholder }}</span>
            <svg class="dp-input-chevron" :class="{ 'dp-input-chevron--open': open }" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
        <transition name="dp-pop">
            <div v-if="open" class="dp-popover">
                <div class="dp-header">
                    <button class="dp-nav-btn" @click="prevMonth" type="button">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
                    </button>
                    <span class="dp-header-label">{{ monthYearLabel }}</span>
                    <button class="dp-nav-btn" @click="nextMonth" type="button">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                    </button>
                </div>
                <div class="dp-weekdays">
                    <span v-for="d in weekdays" :key="d" class="dp-weekday">{{ d }}</span>
                </div>
                <div class="dp-grid">
                    <button
                        v-for="(cell, i) in gridCells"
                        :key="i"
                        class="dp-cell"
                        :class="{
                            'dp-cell--other': cell.other,
                            'dp-cell--today': cell.isToday,
                            'dp-cell--selected': cell.isSelected
                        }"
                        type="button"
                        @click="selectDate(cell)"
                    >{{ cell.day }}</button>
                </div>
                <div class="dp-footer">
                    <button class="dp-footer-btn dp-clear" type="button" @click="clear">Clear</button>
                    <button class="dp-footer-btn dp-today" type="button" @click="goToday">Today</button>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue';

export default {
    name: 'DatePicker',
    props: {
        modelValue: { type: String, default: '' },
        placeholder: { type: String, default: 'Select date' }
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
        const open = ref(false);
        const wrapperRef = ref(null);
        const viewMonth = ref(new Date().getMonth());
        const viewYear = ref(new Date().getFullYear());

        const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
        const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

        const monthYearLabel = computed(() => `${months[viewMonth.value]} ${viewYear.value}`);

        const displayValue = computed(() => {
            if (!props.modelValue) return '';
            const [y, m, d] = props.modelValue.split('-').map(Number);
            return `${months[m-1]} ${d}, ${y}`;
        });

        const today = new Date();
        const todayStr = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;

        function pad(n) { return String(n).padStart(2, '0'); }

        function buildGrid(y, m) {
            const first = new Date(y, m, 1).getDay();
            const len = new Date(y, m+1, 0).getDate();
            const prevLen = new Date(y, m, 0).getDate();
            const cells = [];

            for (let i = first - 1; i >= 0; i--) {
                const d = prevLen - i;
                const pm = m === 0 ? 11 : m - 1;
                const py = m === 0 ? y - 1 : y;
                cells.push({ day: d, date: `${py}-${pad(pm+1)}-${pad(d)}`, other: true, isToday: false, isSelected: false });
            }
            for (let d = 1; d <= len; d++) {
                const ds = `${y}-${pad(m+1)}-${pad(d)}`;
                cells.push({ day: d, date: ds, other: false, isToday: ds === todayStr, isSelected: ds === props.modelValue });
            }
            let nd = 1;
            while (cells.length < 42) {
                const nm = m === 11 ? 0 : m + 1;
                const ny = m === 11 ? y + 1 : y;
                cells.push({ day: nd, date: `${ny}-${pad(nm+1)}-${pad(nd)}`, other: true, isToday: false, isSelected: false });
                nd++;
            }
            return cells;
        }

        const gridCells = computed(() => buildGrid(viewYear.value, viewMonth.value));

        function prevMonth() {
            if (viewMonth.value === 0) { viewMonth.value = 11; viewYear.value--; }
            else { viewMonth.value--; }
        }
        function nextMonth() {
            if (viewMonth.value === 11) { viewMonth.value = 0; viewYear.value++; }
            else { viewMonth.value++; }
        }
        function toggle() { open.value = !open.value; }
        function selectDate(cell) { emit('update:modelValue', cell.date); open.value = false; }
        function clear() { emit('update:modelValue', ''); open.value = false; }
        function goToday() {
            const n = new Date();
            viewMonth.value = n.getMonth();
            viewYear.value = n.getFullYear();
            emit('update:modelValue', `${n.getFullYear()}-${pad(n.getMonth()+1)}-${pad(n.getDate())}`);
            open.value = false;
        }

        watch(() => props.modelValue, (v) => {
            if (v) { const [y, m] = v.split('-').map(Number); viewYear.value = y; viewMonth.value = m - 1; }
        }, { immediate: true });

        function clickOutside(e) {
            if (wrapperRef.value && !wrapperRef.value.contains(e.target)) open.value = false;
        }
        onMounted(() => document.addEventListener('mousedown', clickOutside));
        onBeforeUnmount(() => document.removeEventListener('mousedown', clickOutside));

        return { open, wrapperRef, weekdays, monthYearLabel, displayValue, gridCells, prevMonth, nextMonth, toggle, selectDate, clear, goToday };
    }
};
</script>

<style scoped>
.dp-wrapper { position: relative; width: 100%; z-index: 1; }

/* ── trigger input ── */
.dp-input {
    display: flex; align-items: center; gap: 8px;
    height: 40px; padding: 0 10px;
    border: 1px solid #e5e7eb; border-radius: 12px;
    font-size: 0.8125rem; color: #374151;
    background: #f9fafb; cursor: pointer;
    transition: all 0.15s; user-select: none;
    min-width: 170px;
}
.dp-input:hover { border-color: #d1d5db; }
.dp-input--active { border-color: #5EEAD4; box-shadow: 0 0 0 3px rgba(13,148,136,0.08); background: #fff; }
.dp-input-icon { color: #9ca3af; flex-shrink: 0; }
.dp-input-placeholder { color: #9ca3af; }
.dp-input-chevron {
    margin-left: auto; color: #9ca3af; flex-shrink: 0;
    transition: transform 0.2s ease;
}
.dp-input-chevron--open { transform: rotate(180deg); }

/* ── popover ── */
.dp-popover {
    position: absolute; top: calc(100% + 6px); left: 0; z-index: 999;
    background: #fff; border-radius: 16px;
    box-shadow: 0 4px 24px -4px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.04);
    padding: 16px; width: 280px;
}

/* ── header ── */
.dp-header {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 14px;
}
.dp-header-label { font-size: 0.9375rem; font-weight: 700; color: #111827; letter-spacing: -0.01em; }
.dp-nav-btn {
    display: flex; align-items: center; justify-content: center;
    width: 32px; height: 32px; border: none; border-radius: 8px;
    background: transparent; color: #6b7280; cursor: pointer;
    transition: all 0.15s;
}
.dp-nav-btn:hover { background: #f3f4f6; color: #111827; }

/* ── weekdays ── */
.dp-weekdays { display: grid; grid-template-columns: repeat(7, 1fr); margin-bottom: 2px; }
.dp-weekday {
    text-align: center; font-size: 0.6875rem; font-weight: 600;
    color: #9ca3af; text-transform: uppercase; padding: 4px 0;
}

/* ── day grid ── */
.dp-grid { display: grid; grid-template-columns: repeat(7, 1fr); }
.dp-cell {
    display: flex; align-items: center; justify-content: center;
    width: 100%; aspect-ratio: 1;
    border: none; border-radius: 8px;
    font-size: 0.8125rem; font-weight: 500; color: #374151;
    background: transparent; cursor: pointer;
    transition: all 0.1s;
}
.dp-cell:hover { background: #f3f4f6; }
.dp-cell--other { color: #d1d5db; }
.dp-cell--today { font-weight: 700; color: #0D9488; background: #ECFDF5; }
.dp-cell--selected { background: #0D9488; color: #fff; font-weight: 700; }
.dp-cell--selected:hover { background: #0F766E; }
.dp-cell--today.dp-cell--selected { background: #0D9488; color: #fff; }

/* ── footer ── */
.dp-footer {
    display: flex; justify-content: space-between; align-items: center;
    margin-top: 12px; padding-top: 12px; border-top: 1px solid #f3f4f6;
}
.dp-footer-btn {
    border: none; background: transparent; cursor: pointer;
    font-size: 0.8125rem; font-weight: 600; padding: 6px 10px;
    border-radius: 8px; transition: all 0.15s;
}
.dp-clear { color: #6b7280; }
.dp-clear:hover { background: #f3f4f6; color: #374151; }
.dp-today { color: #0D9488; }
.dp-today:hover { background: #ECFDF5; }

/* ── popover transition ── */
.dp-pop-enter-active { transition: all 0.2s ease-out; }
.dp-pop-leave-active { transition: all 0.15s ease-in; }
.dp-pop-enter-from { opacity: 0; transform: translateY(-6px) scale(0.97); }
.dp-pop-leave-to { opacity: 0; transform: translateY(-4px) scale(0.98); }

/* ── dark ── */
:global(.dark) .dp-input { background: #1e293b; border-color: #334155; color: #e2e8f0; }
:global(.dark) .dp-input:hover { border-color: #475569; }
:global(.dark) .dp-input--active { border-color: #5EEAD4; box-shadow: 0 0 0 3px rgba(13,148,136,0.15); background: #0f172a; }
:global(.dark) .dp-input-icon { color: #64748b; }
:global(.dark) .dp-input-placeholder { color: #64748b; }
:global(.dark) .dp-input-chevron { color: #64748b; }
:global(.dark) .dp-popover { background: #1e293b; box-shadow: 0 4px 24px -4px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05); }
:global(.dark) .dp-header-label { color: #f1f5f9; }
:global(.dark) .dp-nav-btn { color: #94a3b8; }
:global(.dark) .dp-nav-btn:hover { background: #334155; color: #f1f5f9; }
:global(.dark) .dp-weekday { color: #64748b; }
:global(.dark) .dp-cell { color: #e2e8f0; }
:global(.dark) .dp-cell:hover { background: #334155; }
:global(.dark) .dp-cell--other { color: #475569; }
:global(.dark) .dp-cell--today { background: rgba(13,148,136,0.15); color: #5EEAD4; }
:global(.dark) .dp-cell--selected { background: #0D9488; color: #fff; }
:global(.dark) .dp-footer { border-top-color: #334155; }
:global(.dark) .dp-clear { color: #94a3b8; }
:global(.dark) .dp-clear:hover { background: #334155; color: #e2e8f0; }
:global(.dark) .dp-today:hover { background: rgba(13,148,136,0.15); }
</style>
