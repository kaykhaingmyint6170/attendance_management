<template>
    <button
        @click="toggleTheme"
        class="theme-toggle"
        :class="{ dark: isDark }"
        :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
        aria-label="Toggle theme"
    >
        <div class="toggle-track">
            <div class="toggle-thumb">
                <!-- Sun icon -->
                <svg v-if="!isDark" class="icon sun-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="5" />
                    <line x1="12" y1="1" x2="12" y2="3" />
                    <line x1="12" y1="21" x2="12" y2="23" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                    <line x1="1" y1="12" x2="3" y2="12" />
                    <line x1="21" y1="12" x2="23" y2="12" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
                <!-- Moon icon -->
                <svg v-else class="icon moon-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
            </div>
        </div>
    </button>
</template>

<script setup>
import { useTheme } from '../composables/useTheme';
const { isDark, toggleTheme } = useTheme();
</script>

<style scoped>
.theme-toggle {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
    -webkit-tap-highlight-color: transparent;
}

.toggle-track {
    width: 52px;
    height: 28px;
    border-radius: 14px;
    background: #e5e7eb;
    position: relative;
    transition: background 0.3s ease;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.12);
}

.theme-toggle.dark .toggle-track {
    background: #1e293b;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.3);
}

.toggle-thumb {
    position: absolute;
    top: 3px;
    left: 3px;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), background 0.3s ease;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
}

.theme-toggle.dark .toggle-thumb {
    transform: translateX(24px);
    background: #334155;
}

.icon {
    width: 14px;
    height: 14px;
    transition: all 0.35s ease;
}

.sun-icon {
    color: #f59e0b;
    animation: sunRotate 0.5s ease-out;
}

.moon-icon {
    color: #94a3b8;
    animation: moonSlide 0.5s ease-out;
}

@keyframes sunRotate {
    from { transform: rotate(-90deg); opacity: 0; }
    to { transform: rotate(0deg); opacity: 1; }
}

@keyframes moonSlide {
    from { transform: translateX(4px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
}

.theme-toggle:hover .toggle-thumb {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.theme-toggle:focus-visible .toggle-track {
    outline: 2px solid #0D9488;
    outline-offset: 2px;
}
</style>
