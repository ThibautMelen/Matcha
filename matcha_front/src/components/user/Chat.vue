<template>

    <!-- CHAT -->
    <section id="sectChat">
        <aside>
            <ul v-if="$store.state.matches && $store.state.matches.length > 0" id="example-2">
                <li  v-for="(item, index) in $store.state.matches" :key="index"> {{ item.username }}</li>
            </ul>
            <span v-else>Vous n'avez pas d'amis.</span>
        </aside>
        <div v-if="Boolean(selectedUser)" id="chat">
            <h1>Chat</h1>
            <basic-vue-chat />
        </div>
    </section>

</template>


<script>
import BasicVueChat from '../basic-vue-chat/BasicVueChat.vue'

export default {
    components : {
        BasicVueChat
    },
    data(){
        return {
            selectedUser: null
        }
    },
    methods:{
    },
    mounted () {
        console.log(this.$store.state.matches)
    }
}
</script>



<style type="text/css" global>
section#sectChat{
    display: flex;
    justify-content: center;
    width: 100%;
}
section#sectChat div#chat {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    width: 100%;
    border-radius: 25px;
    padding: 50px 0;
}
section#sectChat div#chat h1{
    margin-bottom: 10px;
}


/* //ASIDE LIST USER */
section#sectChat {
    display: flex;
    flex-direction: column-reverse;
    flex-wrap: wrap;
    align-items: center;
}

section#sectChat aside {
    display: flex;
    flex-direction: row;
    padding: 10px;
    border-radius: 20px;
    background:#37455c;
    margin-top: 30px;
    color: #fff;
}

section#sectChat aside ul li{
    color: #fff;
    padding: 10px;
    font-size: 15px;
    cursor: pointer;
}



</style>