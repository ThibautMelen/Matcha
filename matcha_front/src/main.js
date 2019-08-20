// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from "axios";
import VueCookies from 'vue-cookies'
import store from './store'
import io from 'socket.io-client';


Vue.use(VueCookies)

Vue.config.productionTip = false

//AXIOS
Vue.use({
    install (Vue) {
    Vue.prototype.$api = axios.create({
      baseURL: 'http://localhost:3000/'
    })
  }
})

const token = VueCookies.get('user_token')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>',
  mounted() {
    if (token) {
      axios.get('http://localhost:3000/auth/verify', {withCredentials: true})
      .then(res => {
        if (res.data.userInfos) {
          store.commit('SET_USER', res.data.userInfos)
          store.commit('SET_LOADING', false)
        }
        else {
          store.commit('SET_USER', null)
          store.commit('SET_LOADING', false)
          VueCookies.remove('user_token')
        }
      })
      .catch(err => {
        console.error(err)
        store.commit('SET_USER', null)
        store.commit('SET_LOADING', false)
        VueCookies.remove('user_token')
      })
    }
    else {
      store.commit('SET_USER', null)
      store.commit('SET_LOADING', false)
    }

    let socket = io('http://localhost:3000')

    socket.on('connect', () => {
      console.log('connect')
    });
    // socket.on('event', function(data){});
    socket.on('disconnect', () => {
      console.log('disconnect')


    });
  },
})
