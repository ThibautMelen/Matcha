<template>

    <!-- NOTIFICATION -->
    <section v-if="this.$store.state.user" id="sectNotif"> 
        <div id="notif">
            <h1>Notification : {{ this.$store.state.user.username }}</h1>
            <ul>
                <li v-for="(notif, index) in this.$store.state.notifs" v-bind:key="index" @click="delNotif(index)">
                    {{ notif }}
                </li>
            </ul>
        </div>
    </section>
</template>


<script>
export default {
    data(){
        return {
            variable: false
        }
    },
    methods:{
        delNotif(notifIndex) {
            this.$store.commit('REMOVE_NOTIF', notifIndex);
        }
    },
    mounted() {
        this.$store.commit('SET_NEWNOTIF', false);
    },
    destroyed() {
        this.$store.commit('SET_NEWNOTIF', false);
    },
}
</script>



<style type="text/css" scoped>

section#sectNotif{
    display: flex;
    justify-content: center;
}
section#sectNotif div#notif {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    background: #fff;
    width: 100%;
    min-width: 500px;
    height: 100vh;
    margin: 40px 85px;
    border-radius: 25px;
    padding: 50px 0;
}
section#sectNotif div#notif h1{
    font-size: 30px;
    margin-bottom: 15px;
}
section#sectNotif div#notif ul {
    width: 100%;
    text-align: center;
    border-top: 2px solid #a5a5a5;
    display: flex;
    flex-direction: column-reverse;

}
section#sectNotif div#notif ul li{
    font-size: 20px;
    padding: 25px;
    background: #fff7ef;
    border-bottom: 1px solid #a5a5a5;
}
section#sectNotif div#notif ul li:hover{
    background: #ffdfdf;
    cursor: pointer;
}

</style>
