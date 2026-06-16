<template>
    <div class="login-page">
        <!-- ═══ LEFT: Animated Illustration Panel ═══ -->
        <div class="illustration-panel">
            <!-- Floating blobs -->
            <div class="blobs-layer">
                <div class="blob blob-1" />
                <div class="blob blob-2" />
                <div class="blob blob-3" />
                <div class="blob blob-4" />
                <div class="blob blob-5" />
            </div>

            <!-- Decorative rings -->
            <div class="ring ring-1" />
            <div class="ring ring-2" />
            <div class="ring ring-3" />

            <!-- Dots pattern -->
            <div class="dots-layer" />

            <!-- Illustration scene -->
            <div class="scene">
                <!-- Floating calendar card -->
                <div class="float-card card-cal">
                    <div class="cal-inner">
                        <span class="cal-num">17</span>
                        <span class="cal-month">JUN</span>
                        <span class="cal-dot" />
                    </div>
                </div>

                <!-- Floating check-in card -->
                <div class="float-card card-check">
                    <svg class="check-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span class="check-label">Checked In</span>
                    <span class="check-time">09:00 AM</span>
                </div>

                <!-- Floating avatar group -->
                <div class="float-card card-team">
                    <div class="team-avatars">
                        <div class="tav tav-1">A</div>
                        <div class="tav tav-2">M</div>
                        <div class="tav tav-3">K</div>
                        <div class="tav tav-plus">+5</div>
                    </div>
                    <span class="team-label">Team present today</span>
                </div>

                <!-- Floating stat mini-card -->
                <div class="float-card card-stat">
                    <div class="stat-bar-wrap">
                        <div class="stat-bar-fill" />
                    </div>
                    <div class="stat-info">
                        <span>Attendance rate</span>
                        <span class="stat-val">94%</span>
                    </div>
                </div>
            </div>

            <!-- Hero text -->
            <div class="hero">
                <div class="hero-badge">
                    <span class="pulse" />
                    Team-14 KKM
                </div>
                <h1 class="hero-title">
                    Attendance<br/>Made <span class="hero-grad">Simple</span>
                </h1>
                <p class="hero-desc">
                    Track time, manage leaves, and stay connected — all in one place.
                </p>
                <div class="hero-pills">
                    <span class="pill">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                        Real-time tracking
                    </span>
                    <span class="pill">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                        One-click check-in
                    </span>
                    <span class="pill">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                        Easy leave requests
                    </span>
                </div>
            </div>

            <!-- Bottom wave -->
            <div class="wave-wrap">
                <svg class="wave-svg" viewBox="0 0 1440 120" preserveAspectRatio="none">
                    <path class="wave-path" d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z" />
                </svg>
            </div>
        </div>

        <!-- ═══ RIGHT: Sign In Form ═══ -->
        <div class="form-panel">
            <div class="form-wrapper">
                <!-- Mobile logo -->
                <div class="mobile-header">
                    <div class="logo-icon">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                    </div>
                    <h2>Welcome Back</h2>
                    <p>Sign in to your account</p>
                </div>

                <!-- Desktop heading -->
                <div class="desktop-header">
                    <h2>Welcome Back</h2>
                    <p>Sign in to your account to continue</p>
                </div>

                <!-- Form card -->
                <div class="form-card">
                    <form @submit.prevent="login">
                        <div class="field">
                            <label>Email Address</label>
                            <div class="input-wrap">
                                <svg class="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                                </svg>
                                <input v-model="form.email" type="email" required autocomplete="email" placeholder="you@example.com" />
                            </div>
                        </div>

                        <div class="field">
                            <label>Password</label>
                            <div class="input-wrap">
                                <svg class="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                                </svg>
                                <input :type="showPassword ? 'text' : 'password'" v-model="form.password" required autocomplete="current-password" placeholder="Enter your password" />
                                <button type="button" @click="showPassword = !showPassword" class="toggle-pw" tabindex="-1">
                                    <svg v-if="!showPassword" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                                    </svg>
                                    <svg v-else fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <transition name="shake">
                            <div v-if="error" class="error-box">
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                                <span>{{ error }}</span>
                            </div>
                        </transition>

                        <button type="submit" :disabled="submitting" class="submit-btn">
                            <transition name="fade" mode="out-in">
                                <svg v-if="submitting" key="spin" class="spinner-svg" fill="none" viewBox="0 0 24 24">
                                    <circle class="spinner-track" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                                    <path class="spinner-head" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                                </svg>
                                <svg v-else key="arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/>
                                </svg>
                            </transition>
                            <span>{{ submitting ? 'Signing in...' : 'Sign In' }}</span>
                        </button>
                    </form>

                    <div class="divider"><span>or</span></div>

                    <p class="footer-text">
                        Don't have an account?
                        <router-link to="/register">Create one</router-link>
                    </p>
                </div>

                <!-- Quick access -->
                <div class="quick-access">
                    <p class="qa-title">Quick Access</p>
                    <div class="qa-items">
                        <div class="qa-item"><span class="qa-dot qa-hr" />HR: hr@team14.com / password</div>
                        <div class="qa-item"><span class="qa-dot qa-mgr" />Mgr: manager@team14.com / password</div>
                        <div class="qa-item"><span class="qa-dot qa-emp" />Emp: alice.johnson@team14.com / password</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import api from '../../composables/useApi';
export default {
    name: 'Login',
    setup() {
        const router = useRouter();
        const submitting = ref(false);
        const error = ref(null);
        const showPassword = ref(false);
        const form = reactive({ email: '', password: '' });
        async function login() {
            submitting.value = true; error.value = null;
            try {
                const { data } = await api.post('/login', form);
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                router.push('/');
            } catch (e) {
                error.value = e.response?.data?.message || e.response?.data?.errors?.email?.[0] || 'Login failed';
            } finally { submitting.value = false; }
        }
        return { form, showPassword, login, submitting, error };
    }
};
</script>

<style scoped>
/* ═══════════════════════════════════════════════
   LAYOUT
   ═══════════════════════════════════════════════ */
.login-page { display: flex; min-height: 100vh; }

/* ═══ LEFT: ILLUSTRATION ═══ */
.illustration-panel {
    display: none;
    position: relative; flex: 1;
    background: linear-gradient(155deg, #0F4C48 0%, #0B3835 25%, #0F4C48 55%, #0D3D3A 100%);
    overflow: hidden;
    align-items: center; justify-content: center;
}
@media (min-width: 1024px) { .illustration-panel { display: flex; } }

/* Blobs */
.blobs-layer { position: absolute; inset: 0; overflow: hidden; }
.blob { position: absolute; border-radius: 50%; filter: blur(80px); opacity: 0.22; }
.blob-1 { width: 380px; height: 380px; background: #0D9488; top: -100px; left: -60px; animation: blobFloat 20s ease-in-out infinite; }
.blob-2 { width: 280px; height: 280px; background: #14B8A6; top: 20%; right: -80px; animation: blobFloat 24s ease-in-out infinite reverse; }
.blob-3 { width: 200px; height: 200px; background: #06B6D4; bottom: 15%; left: 15%; animation: blobFloat 18s ease-in-out 4s infinite; }
.blob-4 { width: 160px; height: 160px; background: #8B5CF6; top: 45%; left: 35%; animation: blobFloat 16s ease-in-out 6s infinite reverse; }
.blob-5 { width: 100px; height: 100px; background: #F59E0B; bottom: 25%; right: 25%; animation: blobFloat 14s ease-in-out 2s infinite; }

@keyframes blobFloat {
    0%, 100% { transform: translate(0, 0) scale(1); }
    25%      { transform: translate(50px, -30px) scale(1.15); }
    50%      { transform: translate(-20px, 25px) scale(0.9); }
    75%      { transform: translate(-40px, -15px) scale(1.1); }
}

/* Rings */
.ring { position: absolute; border-radius: 50%; }
.ring-1 { width: 520px; height: 520px; top: -120px; right: -160px; border: 2px solid rgba(255,255,255,0.06); animation: spinSlow 45s linear infinite; }
.ring-2 { width: 360px; height: 360px; bottom: -100px; left: -100px; border: 2px solid rgba(255,255,255,0.04); animation: spinSlow 35s linear infinite reverse; }
.ring-3 { width: 200px; height: 200px; top: 40%; left: 50%; border: 2px dashed rgba(255,255,255,0.05); animation: spinSlow 28s linear infinite; }
@keyframes spinSlow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

.dots-layer { position: absolute; inset: 0; opacity: 0.04; background-image: radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px); background-size: 26px 26px; }

/* Scene with floating cards */
.scene { position: relative; z-index: 10; width: 100%; height: 300px; max-width: 420px; }
.float-card { position: absolute; background: rgba(255,255,255,0.07); backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.1); border-radius: 18px; padding: 18px; box-shadow: 0 10px 40px rgba(0,0,0,0.25); }

.card-cal { top: 5px; left: 5%; animation: cardFloat1 6.5s ease-in-out infinite; }
.cal-inner { display: flex; flex-direction: column; align-items: center; gap: 3px; }
.cal-num { font-size: 32px; font-weight: 800; color: #fff; line-height: 1; }
.cal-month { font-size: 11px; color: rgba(255,255,255,0.45); text-transform: uppercase; letter-spacing: 3px; font-weight: 600; }
.cal-dot { width: 8px; height: 8px; border-radius: 50%; margin-top: 6px; background: #10B981; box-shadow: 0 0 10px #10B981; }

.card-check { top: 25px; right: 5%; animation: cardFloat2 7.5s ease-in-out 1.5s infinite; text-align: center; }
.check-icon { width: 32px; height: 32px; color: #10B981; margin: 0 auto 6px; }
.check-label { display: block; font-size: 12px; font-weight: 700; color: #fff; margin-bottom: 2px; }
.check-time { font-size: 10px; color: rgba(255,255,255,0.35); }

.card-team { bottom: 50px; left: 10%; animation: cardFloat3 8s ease-in-out 2s infinite; }
.team-avatars { display: flex; margin-bottom: 8px; }
.tav { width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; color: #fff; margin-left: -8px; border: 2px solid rgba(15,76,72,0.9); }
.tav:first-child { margin-left: 0; }
.tav-1 { background: #0D9488; }
.tav-2 { background: #8B5CF6; }
.tav-3 { background: #EC4899; }
.tav-plus { background: rgba(255,255,255,0.12); font-size: 9px; }
.team-label { font-size: 10px; color: rgba(255,255,255,0.4); }

.card-stat { bottom: 15px; right: 6%; animation: cardFloat4 7s ease-in-out 0.8s infinite; }
.stat-bar-wrap { width: 100px; height: 4px; background: rgba(255,255,255,0.08); border-radius: 2px; margin-bottom: 10px; overflow: hidden; }
.stat-bar-fill { width: 94%; height: 100%; background: linear-gradient(90deg, #0D9488, #34D399); border-radius: 2px; animation: barPulse 2.5s ease-in-out infinite; }
.stat-info { display: flex; justify-content: space-between; font-size: 10px; color: rgba(255,255,255,0.4); }
.stat-val { color: #fff; font-weight: 700; }

@keyframes cardFloat1 { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-14px) rotate(1.5deg); } }
@keyframes cardFloat2 { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-10px) rotate(-1deg); } }
@keyframes cardFloat3 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
@keyframes cardFloat4 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
@keyframes barPulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.55; } }

/* Hero text */
.hero { position: relative; z-index: 10; text-align: center; padding: 0 2rem; }
.hero-badge {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 6px 18px; background: rgba(255,255,255,0.07);
    border: 1px solid rgba(255,255,255,0.08); border-radius: 999px;
    font-size: 11px; font-weight: 600; color: rgba(255,255,255,0.6);
    margin-bottom: 1.25rem;
    animation: fadeUp 0.6s ease-out 0.2s both;
}
.pulse { width: 7px; height: 7px; border-radius: 50%; background: #10B981; box-shadow: 0 0 8px #10B981; animation: dotPulse 2s ease-in-out infinite; }
@keyframes dotPulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.4; transform: scale(1.4); } }

.hero-title {
    font-size: 2.75rem; font-weight: 800; color: #fff; line-height: 1.12;
    margin-bottom: 0.875rem;
    animation: fadeUp 0.6s ease-out 0.35s both;
}
.hero-grad { background: linear-gradient(135deg, #5EEAD4, #A78BFA); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.hero-desc {
    font-size: 0.9375rem; color: rgba(255,255,255,0.45); line-height: 1.6;
    margin-bottom: 1.5rem;
    animation: fadeUp 0.6s ease-out 0.5s both;
}
.hero-pills {
    display: flex; flex-wrap: wrap; gap: 8px; justify-content: center;
    animation: fadeUp 0.6s ease-out 0.65s both;
}
.pill {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 6px 14px; background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.07); border-radius: 999px;
    font-size: 11px; color: rgba(255,255,255,0.5);
    transition: all 0.3s ease;
}
.pill svg { width: 13px; height: 13px; opacity: 0.45; }
.pill:hover { background: rgba(255,255,255,0.1); border-color: rgba(255,255,255,0.12); color: rgba(255,255,255,0.75); transform: translateY(-1px); }

@keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

/* Wave */
.wave-wrap { position: absolute; bottom: 0; left: 0; right: 0; height: 70px; overflow: hidden; }
.wave-svg { width: 100%; height: 100%; }
.wave-path { fill: rgba(255,255,255,0.025); animation: waveShift 8s ease-in-out infinite; }
@keyframes waveShift {
    0%, 100% { d: path("M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z"); }
    50%      { d: path("M0,70 C240,10 480,100 720,50 C960,0 1200,100 1440,70 L1440,120 L0,120 Z"); }
}

/* ═══ RIGHT: FORM ═══ */
.form-panel { flex: 1; display: flex; align-items: center; justify-content: center; padding: 1.5rem; background: #f8fafc; position: relative; }
.form-panel::before { content: ''; position: absolute; top: -60px; right: -60px; width: 260px; height: 260px; background: #CCFBF1; border-radius: 50%; filter: blur(100px); opacity: 0.4; }
.form-wrapper { position: relative; width: 100%; max-width: 400px; }

.mobile-header { text-align: center; margin-bottom: 2rem; }
@media (min-width: 1024px) { .mobile-header { display: none; } }
.logo-icon { display: inline-flex; align-items: center; justify-content: center; width: 52px; height: 52px; background: linear-gradient(135deg, #0D9488, #059669); border-radius: 16px; color: #fff; margin-bottom: 1rem; box-shadow: 0 8px 24px rgba(13,148,136,0.3); }
.logo-icon svg { width: 28px; height: 28px; }
.mobile-header h2 { font-size: 1.5rem; font-weight: 700; color: #111827; }
.mobile-header p { font-size: 0.875rem; color: #6b7280; margin-top: 4px; }

.desktop-header { margin-bottom: 1.75rem; text-align: center; }
.desktop-header h2 { font-size: 1.5rem; font-weight: 700; color: #111827; }
.desktop-header p { font-size: 0.875rem; color: #6b7280; margin-top: 4px; }
@media (max-width: 1023px) { .desktop-header { display: none; } }

.form-card { background: #fff; border-radius: 20px; padding: 2rem; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.04), 0 10px 30px -10px rgba(0,0,0,0.06); border: 1px solid #f1f5f9; }

form { display: flex; flex-direction: column; gap: 1.125rem; }

.field { display: flex; flex-direction: column; gap: 0.375rem; }
.field label { font-size: 0.8125rem; font-weight: 600; color: #374151; }

.input-wrap { position: relative; }
.input-icon { position: absolute; left: 13px; top: 50%; transform: translateY(-50%); width: 18px; height: 18px; color: #9ca3af; pointer-events: none; transition: color 0.2s; }
.input-wrap:focus-within .input-icon { color: #0D9488; }
.input-wrap input {
    width: 100%; height: 46px;
    padding: 0 14px 0 42px;
    border: 1px solid #e5e7eb; border-radius: 14px;
    font-size: 0.875rem; color: #111827;
    background: #f9fafb; outline: none;
    transition: all 0.2s ease;
}
.input-wrap input::placeholder { color: #c4c8cf; }
.input-wrap input:focus { border-color: #5EEAD4; background: #fff; box-shadow: 0 0 0 3px rgba(13,148,136,0.08); }

.toggle-pw { position: absolute; right: 4px; top: 50%; transform: translateY(-50%); padding: 6px 10px; border-radius: 10px; color: #9ca3af; background: none; border: none; cursor: pointer; transition: all 0.15s; }
.toggle-pw:hover { color: #6b7280; background: #f3f4f6; }
.toggle-pw svg { width: 18px; height: 18px; }

.error-box { display: flex; align-items: center; gap: 8px; padding: 10px 14px; background: #FFF1F2; color: #E11D48; font-size: 0.8125rem; border-radius: 12px; border: 1px solid #FFE4E6; }
.error-box svg { width: 18px; height: 18px; flex-shrink: 0; }

.submit-btn {
    display: flex; align-items: center; justify-content: center; gap: 8px;
    width: 100%; height: 48px;
    background: linear-gradient(135deg, #0D9488, #0F766E);
    color: #fff; font-size: 0.9375rem; font-weight: 600;
    border: none; border-radius: 14px; cursor: pointer;
    box-shadow: 0 4px 18px rgba(13,148,136,0.3);
    transition: all 0.2s ease;
}
.submit-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 6px 26px rgba(13,148,136,0.4); }
.submit-btn:active:not(:disabled) { transform: scale(0.98); }
.submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }
.submit-btn svg { width: 20px; height: 20px; }

.spinner-svg { animation: spin 0.8s linear infinite; }
.spinner-track { opacity: 0.25; }
.spinner-head { opacity: 0.75; }
@keyframes spin { to { transform: rotate(360deg); } }

.divider { display: flex; align-items: center; margin: 1.25rem 0; }
.divider::before, .divider::after { content: ''; flex: 1; height: 1px; background: #e5e7eb; }
.divider span { padding: 0 14px; font-size: 0.6875rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: #9ca3af; }

.footer-text { text-align: center; font-size: 0.875rem; color: #6b7280; }
.footer-text a { color: #0D9488; font-weight: 600; text-decoration: none; transition: color 0.15s; }
.footer-text a:hover { color: #0F766E; }

.quick-access { margin-top: 1.25rem; background: #fff; border-radius: 14px; padding: 14px 18px; border: 1px solid #f1f5f9; box-shadow: 0 1px 3px rgba(0,0,0,0.03); }
.qa-title { font-size: 0.6875rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #9ca3af; margin-bottom: 10px; }
.qa-items { display: flex; flex-direction: column; gap: 6px; }
.qa-item { display: flex; align-items: center; gap: 8px; font-size: 0.75rem; color: #6b7280; }
.qa-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
.qa-hr { background: #0D9488; }
.qa-mgr { background: #8B5CF6; }
.qa-emp { background: #10B981; }

/* Transitions */
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.shake-enter-active { animation: shakeIn 0.4s ease-out; }
.shake-leave-active { animation: shakeIn 0.3s ease-in reverse; }
@keyframes shakeIn {
    0%   { opacity: 0; transform: translateX(-8px); }
    20%  { transform: translateX(6px); }
    40%  { transform: translateX(-4px); }
    60%  { transform: translateX(2px); }
    100% { opacity: 1; transform: translateX(0); }
}
</style>
