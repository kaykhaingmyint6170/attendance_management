<template>
    <div class="login-page">
        <div class="illustration-panel">
            <div class="blobs-layer">
                <div class="blob blob-1" />
                <div class="blob blob-2" />
                <div class="blob blob-3" />
                <div class="blob blob-4" />
                <div class="blob blob-5" />
            </div>
            <div class="ring ring-1" />
            <div class="ring ring-2" />
            <div class="ring ring-3" />
            <div class="dots-layer" />
            <div class="scene">
                <div class="float-card card-form"><div class="form-bars"><div class="fbar w-90" /><div class="fbar w-65" /><div class="fbar w-75" /></div></div>
                <div class="float-card card-badge-reg"><div class="badge-icon">&#10003;</div><span class="badge-text">Account created</span></div>
                <div class="float-card card-team-reg"><div class="team-grid"><div class="tg tg-1">A</div><div class="tg tg-2">M</div><div class="tg tg-3">K</div><div class="tg tg-4">S</div><div class="tg tg-5">R</div><div class="tg tg-plus">+12</div></div><span class="team-label">Join your team</span></div>
            </div>
            <div class="hero">
                <div class="hero-badge"><span class="pulse" />Team-14 KKM</div>
                <h1 class="hero-title">Join Your<br/><span class="hero-grad">Team</span> Today</h1>
                <p class="hero-desc">Create your account and start tracking attendance in minutes.</p>
                <div class="hero-pills">
                    <span class="pill"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>Quick sign up</span>
                    <span class="pill"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>Secure data</span>
                    <span class="pill"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>Team collaboration</span>
                </div>
            </div>
            <div class="wave-wrap"><svg class="wave-svg" viewBox="0 0 1440 120" preserveAspectRatio="none"><path class="wave-path" d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z" /></svg></div>
        </div>
        <div class="form-panel">
            <div class="form-wrapper">
                <div class="mobile-header">
                    <div class="logo-icon"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/></svg></div>
                    <h2>Create Account</h2><p>Join the Team-14 system</p>
                </div>
                <div class="desktop-header"><h2>Create Account</h2><p>Join the Team-14 KKM system</p></div>
                <div class="form-card">
                    <form @submit.prevent="register">
                        <div class="field"><label>Full Name</label><div class="input-wrap"><svg class="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg><input v-model="form.name" type="text" required autocomplete="name" placeholder="John Doe" /></div></div>
                        <div class="field"><label>Email Address</label><div class="input-wrap"><svg class="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg><input v-model="form.email" type="email" required autocomplete="email" placeholder="you@example.com" /></div></div>
                        <div class="field"><label>Password</label><div class="input-wrap"><svg class="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg><input :type="showPassword ? 'text' : 'password'" v-model="form.password" required autocomplete="new-password" placeholder="Min. 6 characters" /><button type="button" @click="showPassword = !showPassword" class="toggle-pw" tabindex="-1"><svg v-if="!showPassword" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg><svg v-else fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/></svg></button></div></div>
                        <div class="field"><label>Confirm Password</label><div class="input-wrap"><svg class="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg><input :type="showConfirm ? 'text' : 'password'" v-model="form.password_confirmation" required autocomplete="new-password" placeholder="Repeat your password" /><button type="button" @click="showConfirm = !showConfirm" class="toggle-pw" tabindex="-1"><svg v-if="!showConfirm" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg><svg v-else fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/></svg></button></div></div>
                        <transition name="shake"><div v-if="error" class="error-box"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><span>{{ error }}</span></div></transition>
                        <button type="submit" :disabled="submitting" class="submit-btn">
                            <transition name="fade" mode="out-in">
                                <svg v-if="submitting" key="spin" class="spinner-svg" fill="none" viewBox="0 0 24 24"><circle class="spinner-track" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/><path class="spinner-head" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                                <svg v-else key="plus" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
                            </transition>
                            <span>{{ submitting ? 'Creating Account...' : 'Create Account' }}</span>
                        </button>
                    </form>
                    <div class="divider"><span>or</span></div>
                    <p class="footer-text">Already have an account? <router-link to="/login">Sign in</router-link></p>
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
    name: 'Register',
    setup() {
        const router = useRouter();
        const submitting = ref(false);
        const error = ref(null);
        const showPassword = ref(false);
        const showConfirm = ref(false);
        const form = reactive({ name: '', email: '', password: '', password_confirmation: '' });
        async function register() {
            submitting.value = true; error.value = null;
            try {
                const { data } = await api.post('/register', form);
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                router.push('/');
            } catch (e) {
                const errs = e.response?.data?.errors;
                error.value = errs ? Object.values(errs).flat().join(', ') : e.response?.data?.message || 'Registration failed';
            } finally { submitting.value = false; }
        }
        return { form, showPassword, showConfirm, register, submitting, error };
    }
};
</script>

<style scoped>
.login-page { display: flex; min-height: 100vh; }
.illustration-panel { display: none; position: relative; flex: 1; background: linear-gradient(155deg, #0F4C48 0%, #0B3835 25%, #0F4C48 55%, #0D3D3A 100%); overflow: hidden; align-items: center; justify-content: center; }
@media (min-width: 1024px) { .illustration-panel { display: flex; } }
.blobs-layer { position: absolute; inset: 0; overflow: hidden; }
.blob { position: absolute; border-radius: 50%; filter: blur(80px); opacity: 0.22; }
.blob-1 { width: 380px; height: 380px; background: #0D9488; top: -100px; left: -60px; animation: blobFloat 20s ease-in-out infinite; }
.blob-2 { width: 280px; height: 280px; background: #14B8A6; top: 20%; right: -80px; animation: blobFloat 24s ease-in-out infinite reverse; }
.blob-3 { width: 200px; height: 200px; background: #06B6D4; bottom: 15%; left: 15%; animation: blobFloat 18s ease-in-out 4s infinite; }
.blob-4 { width: 160px; height: 160px; background: #8B5CF6; top: 45%; left: 35%; animation: blobFloat 16s ease-in-out 6s infinite reverse; }
.blob-5 { width: 100px; height: 100px; background: #F59E0B; bottom: 25%; right: 25%; animation: blobFloat 14s ease-in-out 2s infinite; }
@keyframes blobFloat { 0%, 100% { transform: translate(0,0) scale(1); } 25% { transform: translate(50px,-30px) scale(1.15); } 50% { transform: translate(-20px,25px) scale(0.9); } 75% { transform: translate(-40px,-15px) scale(1.1); } }
.ring { position: absolute; border-radius: 50%; }
.ring-1 { width: 520px; height: 520px; top: -120px; right: -160px; border: 2px solid rgba(255,255,255,0.06); animation: spinSlow 45s linear infinite; }
.ring-2 { width: 360px; height: 360px; bottom: -100px; left: -100px; border: 2px solid rgba(255,255,255,0.04); animation: spinSlow 35s linear infinite reverse; }
.ring-3 { width: 200px; height: 200px; top: 40%; left: 50%; border: 2px dashed rgba(255,255,255,0.05); animation: spinSlow 28s linear infinite; }
@keyframes spinSlow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
.dots-layer { position: absolute; inset: 0; opacity: 0.04; background-image: radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px); background-size: 26px 26px; }
.scene { position: relative; z-index: 10; width: 100%; height: 300px; max-width: 420px; }
.float-card { position: absolute; background: rgba(255,255,255,0.07); backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.1); border-radius: 18px; padding: 18px; box-shadow: 0 10px 40px rgba(0,0,0,0.25); }
.card-form { top: 12px; left: 6%; animation: cardFloat1 7s ease-in-out infinite; }
.form-bars { display: flex; flex-direction: column; gap: 7px; }
.fbar { height: 5px; background: rgba(255,255,255,0.12); border-radius: 3px; }
.w-90 { width: 90px; } .w-65 { width: 65px; } .w-75 { width: 75px; }
.card-badge-reg { top: 30px; right: 6%; animation: cardFloat2 8s ease-in-out 1.5s infinite; text-align: center; }
.badge-icon { width: 38px; height: 38px; border-radius: 50%; background: #10B981; color: #fff; font-size: 20px; font-weight: 700; display: flex; align-items: center; justify-content: center; margin: 0 auto 8px; box-shadow: 0 0 20px rgba(16,185,129,0.4); }
.badge-text { font-size: 12px; font-weight: 600; color: #fff; }
.card-team-reg { bottom: 40px; left: 8%; animation: cardFloat3 8.5s ease-in-out 2s infinite; }
.team-grid { display: flex; margin-bottom: 8px; }
.tg { width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 700; color: #fff; margin-left: -6px; border: 2px solid rgba(15,76,72,0.9); }
.tg:first-child { margin-left: 0; }
.tg-1 { background: #0D9488; } .tg-2 { background: #8B5CF6; } .tg-3 { background: #EC4899; }
.tg-4 { background: #10B981; } .tg-5 { background: #F59E0B; }
.tg-plus { background: rgba(255,255,255,0.12); font-size: 8px; }
.team-label { font-size: 10px; color: rgba(255,255,255,0.4); }
@keyframes cardFloat1 { 0%,100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-14px) rotate(1.5deg); } }
@keyframes cardFloat2 { 0%,100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-10px) rotate(-1deg); } }
@keyframes cardFloat3 { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
.hero { position: relative; z-index: 10; text-align: center; padding: 0 2rem; }
.hero-badge { display: inline-flex; align-items: center; gap: 8px; padding: 6px 18px; background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.08); border-radius: 999px; font-size: 11px; font-weight: 600; color: rgba(255,255,255,0.6); margin-bottom: 1.25rem; animation: fadeUp 0.6s ease-out 0.2s both; }
.pulse { width: 7px; height: 7px; border-radius: 50%; background: #10B981; box-shadow: 0 0 8px #10B981; animation: dotPulse 2s ease-in-out infinite; }
@keyframes dotPulse { 0%,100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.4; transform: scale(1.4); } }
.hero-title { font-size: 2.75rem; font-weight: 800; color: #fff; line-height: 1.12; margin-bottom: 0.875rem; animation: fadeUp 0.6s ease-out 0.35s both; }
.hero-grad { background: linear-gradient(135deg, #5EEAD4, #A78BFA); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.hero-desc { font-size: 0.9375rem; color: rgba(255,255,255,0.45); line-height: 1.6; margin-bottom: 1.5rem; animation: fadeUp 0.6s ease-out 0.5s both; }
.hero-pills { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; animation: fadeUp 0.6s ease-out 0.65s both; }
.pill { display: inline-flex; align-items: center; gap: 6px; padding: 6px 14px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.07); border-radius: 999px; font-size: 11px; color: rgba(255,255,255,0.5); transition: all 0.3s ease; }
.pill svg { width: 13px; height: 13px; opacity: 0.45; }
.pill:hover { background: rgba(255,255,255,0.1); border-color: rgba(255,255,255,0.12); color: rgba(255,255,255,0.75); transform: translateY(-1px); }
@keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
.wave-wrap { position: absolute; bottom: 0; left: 0; right: 0; height: 70px; overflow: hidden; }
.wave-svg { width: 100%; height: 100%; }
.wave-path { fill: rgba(255,255,255,0.025); animation: waveShift 8s ease-in-out infinite; }
@keyframes waveShift { 0%,100% { d: path("M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z"); } 50% { d: path("M0,70 C240,10 480,100 720,50 C960,0 1200,100 1440,70 L1440,120 L0,120 Z"); } }

.form-panel { flex: 1; display: flex; align-items: center; justify-content: center; padding: 1.5rem; background: #f8fafc; position: relative; }
.form-panel::before { content: ''; position: absolute; top: -60px; right: -60px; width: 260px; height: 260px; background: #CCFBF1; border-radius: 50%; filter: blur(100px); opacity: 0.4; }
.form-wrapper { position: relative; width: 100%; max-width: 400px; }
.mobile-header { text-align: center; margin-bottom: 1.5rem; }
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
form { display: flex; flex-direction: column; gap: 0.875rem; }
.field { display: flex; flex-direction: column; gap: 0.375rem; }
.field label { font-size: 0.8125rem; font-weight: 600; color: #374151; }
.input-wrap { position: relative; }
.input-icon { position: absolute; left: 13px; top: 50%; transform: translateY(-50%); width: 18px; height: 18px; color: #9ca3af; pointer-events: none; transition: color 0.2s; }
.input-wrap:focus-within .input-icon { color: #0D9488; }
.input-wrap input { width: 100%; height: 46px; padding: 0 14px 0 42px; border: 1px solid #e5e7eb; border-radius: 14px; font-size: 0.875rem; color: #111827; background: #f9fafb; outline: none; transition: all 0.2s ease; }
.input-wrap input::placeholder { color: #c4c8cf; }
.input-wrap input:focus { border-color: #5EEAD4; background: #fff; box-shadow: 0 0 0 3px rgba(13,148,136,0.08); }
.toggle-pw { position: absolute; right: 4px; top: 50%; transform: translateY(-50%); padding: 6px 10px; border-radius: 10px; color: #9ca3af; background: none; border: none; cursor: pointer; transition: all 0.15s; }
.toggle-pw:hover { color: #6b7280; background: #f3f4f6; }
.toggle-pw svg { width: 18px; height: 18px; }
.error-box { display: flex; align-items: center; gap: 8px; padding: 10px 14px; background: #FFF1F2; color: #E11D48; font-size: 0.8125rem; border-radius: 12px; border: 1px solid #FFE4E6; }
.error-box svg { width: 18px; height: 18px; flex-shrink: 0; }
.submit-btn { display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; height: 48px; background: linear-gradient(135deg, #0D9488, #0F766E); color: #fff; font-size: 0.9375rem; font-weight: 600; border: none; border-radius: 14px; cursor: pointer; box-shadow: 0 4px 18px rgba(13,148,136,0.3); transition: all 0.2s ease; }
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
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.shake-enter-active { animation: shakeIn 0.4s ease-out; }
.shake-leave-active { animation: shakeIn 0.3s ease-in reverse; }
@keyframes shakeIn { 0% { opacity: 0; transform: translateX(-8px); } 20% { transform: translateX(6px); } 40% { transform: translateX(-4px); } 60% { transform: translateX(2px); } 100% { opacity: 1; transform: translateX(0); } }
</style>
