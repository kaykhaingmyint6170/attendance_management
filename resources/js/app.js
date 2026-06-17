import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import '../css/app.css';
import './mock'; // Mock API for demo — remove when connecting to real backend

const app = createApp(App);
app.use(router);
app.mount('#app');
