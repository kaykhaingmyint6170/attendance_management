<template>
    <div class="min-h-screen bg-gray-50 dark:bg-gray-950 bg-grid transition-colors duration-300">
        <!-- ═══ TOP NAVBAR ═══ -->
        <nav class="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200/60 dark:border-gray-700/60 shadow-sm transition-colors duration-300">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex items-center justify-between h-16">
                    <!-- Brand -->
                    <div class="flex items-center gap-3">
                        <div class="w-9 h-9 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center shrink-0 shadow-sm shadow-primary/20">
                            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                        </div>
                        <h1 class="text-base font-bold text-gray-900 dark:text-gray-100 hidden sm:block">Staff Info</h1>
                    </div>

                    <!-- Desktop Nav Links -->
                    <div class="hidden md:flex items-center gap-1">
                        <router-link to="/" class="nav-link" :class="{ active: isActive('/') }">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
                            Dashboard
                        </router-link>
                        <router-link to="/check-in" class="nav-link" :class="{ active: isActive('/check-in') }">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                            Check In/Out
                        </router-link>
                        <router-link to="/my-attendance" class="nav-link" :class="{ active: isActive('/my-attendance') }">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
                            My Attendance
                        </router-link>
                        <router-link to="/leave-requests" class="nav-link" :class="{ active: isActive('/leave-requests') }">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                            My Leaves
                        </router-link>
                        <template v-if="userRole !== 'employee'">
                            <div class="w-px h-6 bg-gray-200 mx-1" />
                            <router-link to="/attendance" class="nav-link" :class="{ active: isActiveExact('/attendance') }">
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"/></svg>
                                All Records
                            </router-link>
                            <router-link to="/leave-management" class="nav-link" :class="{ active: isActive('/leave-management') }">
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                                All Leaves
                            </router-link>
                        </template>
                    </div>

                    <!-- Right side -->
                    <div class="flex items-center gap-3">
                        <!-- Live indicator -->
                        <div class="hidden sm:flex items-center gap-1.5 bg-gray-100 dark:bg-gray-800 px-2.5 py-1 rounded-full transition-colors duration-300">
                            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            <span class="text-[11px] font-medium text-gray-500 dark:text-gray-400">Live</span>
                        </div>

                        <!-- User + Role -->
                        <div class="hidden sm:flex items-center gap-2">
                            <div class="w-8 h-8 bg-gradient-to-br from-primary to-primary-dark rounded-lg flex items-center justify-center text-white text-xs font-bold shadow-sm">
                                {{ userName.charAt(0).toUpperCase() }}
                            </div>
                            <div class="hidden lg:block">
                                <p class="text-sm font-medium text-gray-900 dark:text-gray-100 leading-tight">{{ userName }}</p>
                                <span class="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium" :class="roleBadgeClass">{{ userRole }}</span>
                            </div>
                        </div>

                        <!-- Theme Toggle -->
                        <ThemeToggle />

                        <!-- Logout -->
                        <button @click="logout"
                            class="hidden sm:flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 px-3 py-1.5 rounded-lg transition-all duration-150"
                            title="Logout">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
                            <span class="hidden lg:inline">Logout</span>
                        </button>

                        <!-- Mobile menu toggle -->
                        <button @click="mobileOpen = !mobileOpen"
                            class="md:hidden p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                            <svg v-if="!mobileOpen" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
                            <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Mobile dropdown -->
            <transition name="slide-down">
                <div v-if="mobileOpen" class="md:hidden border-t border-gray-100 dark:border-gray-700 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg transition-colors duration-300">
                    <div class="px-4 py-3 space-y-1">
                        <router-link v-for="item in navItems" :key="item.to" :to="item.to" @click="mobileOpen = false"
                            class="mobile-nav-link" :class="{ active: isActive(item.to) }">
                            {{ item.label }}
                        </router-link>
                        <template v-if="userRole !== 'employee'">
                            <div class="border-t border-gray-100 dark:border-gray-700 my-1" />
                            <router-link to="/attendance" @click="mobileOpen = false"
                                class="mobile-nav-link" :class="{ active: isActiveExact('/attendance') }">
                                All Records
                            </router-link>
                            <router-link to="/leave-management" @click="mobileOpen = false"
                                class="mobile-nav-link" :class="{ active: isActive('/leave-management') }">
                                All Leaves
                            </router-link>
                        </template>
                        <div class="border-t border-gray-100 dark:border-gray-700 my-1 pt-2 flex items-center justify-between">
                            <div class="flex items-center gap-2">
                                <div class="w-8 h-8 bg-gradient-to-br from-primary to-primary-dark rounded-lg flex items-center justify-center text-white text-xs font-bold">
                                    {{ userName.charAt(0).toUpperCase() }}
                                </div>
                                <div>
                                    <p class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ userName }}</p>
                                    <span class="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium" :class="roleBadgeClass">{{ userRole }}</span>
                                </div>
                            </div>
                            <button @click="logout" class="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
                            </button>
                        </div>
                    </div>
                </div>
            </transition>
        </nav>

        <!-- ═══ MAIN CONTENT ═══ -->
        <main class="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            <div v-if="loading" class="flex justify-center py-24">
                <div class="flex flex-col items-center gap-3">
                    <div class="w-10 h-10 border-[3px] border-primary-100 dark:border-primary-900 border-t-primary rounded-full animate-spin" />
                    <span class="text-sm text-gray-400 dark:text-gray-500">Loading...</span>
                </div>
            </div>
            <router-view v-else @loading="setLoading" />
        </main>
    </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import api from '../composables/useApi';
import ThemeToggle from './ThemeToggle.vue';

export default {
    name: 'AppLayout',
    components: { ThemeToggle },
    setup() {
        const router = useRouter();
        const route = useRoute();
        const loading = ref(false);
        const mobileOpen = ref(false);
        const user = ref(JSON.parse(localStorage.getItem('user') || '{}'));

        const userName = computed(() => user.value?.name || 'User');
        const userRole = computed(() => user.value?.role || 'employee');

        const roleBadgeClass = computed(() => {
            const roles = {
                hr: 'bg-slate-100 text-slate-700',
                manager: 'bg-primary-100 text-primary-dark',
                employee: 'bg-green-100 text-green-700',
            };
            return roles[user.value?.role] || 'bg-gray-100 text-gray-600';
        });

        const navItems = [
            { to: '/', label: 'Dashboard' },
            { to: '/check-in', label: 'Check In/Out' },
            { to: '/my-attendance', label: 'My Attendance' },
            { to: '/leave-requests', label: 'My Leaves' },
        ];

        function isActive(path) {
            if (path === '/') return route.path === '/';
            return route.path.startsWith(path);
        }

        function isActiveExact(path) {
            return route.path === path || route.path.startsWith(path + '?');
        }

        function setLoading(val) {
            loading.value = val;
        }

        async function logout() {
            try { await api.post('/logout'); } catch (e) {}
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            router.push('/login');
        }

        return { loading, mobileOpen, userName, userRole, roleBadgeClass, navItems, isActive, isActiveExact, setLoading, logout };
    }
};
</script>

<style scoped>
/* Desktop nav link */
.nav-link {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    border-radius: 10px;
    font-size: 0.8125rem;
    font-weight: 500;
    color: #6b7280;
    transition: all 0.15s ease;
}
.nav-link svg { width: 16px; height: 16px; }
.nav-link:hover { background: #f3f4f6; color: #111827; }
.nav-link.active { background: #F0FDFA; color: #0D9488; font-weight: 600; }

/* Dark nav links */
:global(.dark) .nav-link { color: #94a3b8; }
:global(.dark) .nav-link:hover { background: #1e293b; color: #e2e8f0; }
:global(.dark) .nav-link.active { background: rgba(13, 148, 136, 0.15); color: #5EEAD4; }

/* Mobile nav link */
.mobile-nav-link {
    display: flex;
    align-items: center;
    padding: 10px 14px;
    border-radius: 12px;
    font-size: 0.875rem;
    font-weight: 500;
    color: #374151;
    text-decoration: none;
    transition: all 0.15s ease;
}
.mobile-nav-link:hover { background: #f3f4f6; }
.mobile-nav-link.active { background: #F0FDFA; color: #0D9488; font-weight: 600; }

/* Dark mobile nav links */
:global(.dark) .mobile-nav-link { color: #cbd5e1; }
:global(.dark) .mobile-nav-link:hover { background: #1e293b; }
:global(.dark) .mobile-nav-link.active { background: rgba(13, 148, 136, 0.15); color: #5EEAD4; }

/* Slide-down transition for mobile menu */
.slide-down-enter-active { transition: all 0.25s ease-out; }
.slide-down-leave-active { transition: all 0.15s ease-in; }
.slide-down-enter-from, .slide-down-leave-to { opacity: 0; max-height: 0; }
.slide-down-enter-to, .slide-down-leave-from { max-height: 500px; }
</style>
