import { createRouter, createWebHistory } from 'vue-router';
import Login from './pages/auth/Login.vue';
import Register from './pages/auth/Register.vue';
import Dashboard from './pages/Dashboard.vue';
import CheckIn from './pages/attendance/CheckIn.vue';
import MyAttendance from './pages/attendance/MyAttendance.vue';
import AttendanceRecords from './pages/attendance/AttendanceRecords.vue';
import MyLeaveRequests from './pages/leave/MyLeaveRequests.vue';
import LeaveManagement from './pages/leave/LeaveManagement.vue';
import AppLayout from './components/AppLayout.vue';

const routes = [
    { path: '/login', name: 'Login', component: Login, meta: { guest: true } },
    { path: '/register', name: 'Register', component: Register, meta: { guest: true } },
    {
        path: '/',
        component: AppLayout,
        meta: { auth: true },
        children: [
            { path: '', name: 'Dashboard', component: Dashboard },
            { path: 'check-in', name: 'CheckIn', component: CheckIn },
            { path: 'my-attendance', name: 'MyAttendance', component: MyAttendance },
            { path: 'attendance', name: 'AttendanceRecords', component: AttendanceRecords },
            { path: 'leave-requests', name: 'MyLeaveRequests', component: MyLeaveRequests },
            { path: 'leave-management', name: 'LeaveManagement', component: LeaveManagement },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token');

    if (to.meta.auth && !token) {
        next('/login');
    } else if (to.meta.guest && token) {
        next('/');
    } else {
        next();
    }
});

export default router;
