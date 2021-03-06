import Vue from 'vue'
import Router from 'vue-router'

import LoginComp from '@/components/auth/Login.vue';
import RegisterComp from '@/components/auth/Register.vue';
import Resetpass from '@/components/auth/Resetpass.vue';
import Resetpass2 from '@/components/auth/Resetpass2.vue';
import HomeComp from '@/components/basic/Home.vue';
import ProfileComp from '@/components/user/Profile.vue';
import NotifComp from '@/components/user/Notif.vue';
import SettingsComp from '@/components/user/Settings.vue';
import SearchComp from '@/components/basic/Search.vue';
import ChatComp from '@/components/user/Chat.vue';
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
      path: '/resetpass',
      name: 'Resetpass',
      component: Resetpass,
      
    },
    {
      path: '/resetpass2',
      name: 'Resetpass2',
      component: Resetpass2,
      
    },
    {
      path: '/profile/:id',
      name: 'ProfileComp',
      component: ProfileComp
    },
    {
      path: '/notification',
      name: 'NotifComp',
      component: NotifComp,
      
    },
    {
      path: '/settings',
      name: 'SettingsComp',
      component: SettingsComp,
      
    },
    {
      path: '/chat',
      name: 'ChatComp',
      component: ChatComp,
      
    },
    {
      path: '/search',
      name: 'SearchComp',
      component: SearchComp,
      
    }
  ]
})
