// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from "axios";
import VueCookies from 'vue-cookies'
import store from './store'
import io from 'socket.io-client';
import Toasted from 'vue-toasted';

Vue.use(VueCookies)

//Toasted Notif
Vue.use(Toasted, {
  iconPack: 'material'// set your iconPack, defaults to material. material|fontawesome|custom-class
})

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
  components: {
    App
  },
  template: '<App/>',
  mounted() {
    if (token) {
      axios.get('http://localhost:3000/auth/verify', {withCredentials: true})
      .then(res => {
        if (res.data.userInfos) {
          console.log(res)
          store.commit('SET_USER', res.data.userInfos)
          store.commit('SET_MATCHES', res.data.matches)
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

    socket.on('notification', (notif) => {
      store.commit('ADD_NOTIF', notif)

      Vue.toasted.show(notif, { 
        theme: "bubble",
        position: "top-right", 
        duration : 5000
     })
    })

    socket.on('message', (message) => {
      store.commit('ADD_MESSAGE', message)
    })

    store.commit('SET_SOCKET', socket)
  },
})
