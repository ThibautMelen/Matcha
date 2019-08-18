import Vue from 'vue'
import Router from 'vue-router'

import LoginComp from '@/components/auth/Login.vue';
import RegisterComp from '@/components/auth/Register.vue';
import HomeComp from '@/components/basic/Home.vue';
import ProfileComp from '@/components/user/Profile.vue';
import SettingsComp from '@/components/user/Settings.vue';
import store from '../store'

Vue.use(Router)

export default new Router({
  mode: 'history',
  props: ['userInfos'],
  routes: [
    {
      path: '/',
      name: 'HomeComp',
      component: HomeComp
    },
    {
      path: '/login',
      name: 'LoginComp',
      component: LoginComp
    },
    {
      path: '/register',
      name: 'RegisterComp',
      component: RegisterComp
    },
    {
      path: '/profile/:id',
      name: 'ProfileComp',
      component: ProfileComp
    },
    {
      path: '/settings',
      name: 'SettingsComp',
      component: SettingsComp,
      
    }
  ]
})
