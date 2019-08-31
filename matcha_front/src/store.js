import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//VUE X
const store = new Vuex.Store({
    state: {
        user: null,
        loading: true,
        socket: null,
        notifs: [],
        newNotif: false,
        matches: []
    },
    mutations: {
        SET_USER (state, user) {
            state.user = user
        },
        SET_MATCHES (state, matches) {
            state.matches = matches
        },
        SET_LOADING (state, loading) {
            state.loading = loading
        },
        SET_SOCKET (state, socket) {
            state.socket = socket
        },
        ADD_NOTIF (state, notif) {
            state.notifs.push(notif)
            state.newNotif = true
        },
        SET_NEWNOTIF (state, newNotif) {
            state.newNotif = newNotif
        },
        REMOVE_NOTIF (state, index) {
            state.notifs.splice(index, 1)
        },
        ADD_MESSAGE (state, message) {
            let matchIndex = state.matches.findIndex(v => v.id === message.id)

            if (matchIndex >= 0) {
                state.matches[matchIndex].feed.push(message)
            }
        }
    }
})

export default store