import Vue from 'vue'
import Router from 'vue-router'

import LoginComp from '@/components/auth/Login.vue';
import RegisterComp from '@/components/auth/Register.vue';

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'LoginComp',
      component: LoginComp
    },
    {
      path: '/register',
      name: 'RegisterComp',
      component: RegisterComp
    }
    ]
})
