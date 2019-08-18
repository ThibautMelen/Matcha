// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from "axios";
import VueCookies from 'vue-cookies'
import Chat from 'vue-beautiful-chat'
import Vuex from 'vuex';

Vue.use(VueCookies)
Vue.use(Vuex)
Vue.use(Chat)

Vue.config.productionTip = false

//AXIOS
Vue.use({
    install (Vue) {
    Vue.prototype.$api = axios.create({
      baseURL: 'http://localhost:3000/'
    })
  }
})

//VUE X
const store = new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    SET_USER (state, user) {
      state.user = user
    }
  }
})

const token = VueCookies.get('user_token')

console.log(token)

if (token) {
  axios.get('http://localhost:3000/auth/verify', {withCredentials: true})
  .then(res => {
    if (res.data.userInfos) {
      console.log(res.data.userInfos)
      store.commit('SET_USER', res.data.userInfos)
    }
    else {
      store.commit('SET_USER', null)
      VueCookies.remove('user_token')
    }
  })
  .catch(err => {
    console.error(err)
    store.commit('SET_USER', null)
    VueCookies.remove('user_token')
  })
}
else {
  store.commit('SET_USER', null)
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
