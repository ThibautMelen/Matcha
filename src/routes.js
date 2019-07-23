import LoginComp from './components/auth/Login.vue';
import RegisterComp from './components/auth/Register.vue';

export const routes = [
    {
        path: '/login',
        component: LoginComp
    },
    {
        path: '/register',
        component: RegisterComp
    }
]