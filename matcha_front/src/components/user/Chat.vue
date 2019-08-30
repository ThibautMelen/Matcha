<template>

    <!-- CHAT -->
    <section id="sectChat">
        <aside>
            <ul id="example-2">
                <li @click="changeFeed" v-for="(item, index) in users" :key="index"> {{ item.name }}</li>
            </ul>
        </aside>
        <div id="chat">
            <h1>Chat</h1>
            <basic-vue-chat :initial-feed="feed" />
        </div>
    </section>

</template>


<script>
import BasicVueChat from 'basic-vue-chat'

export default {
    components : {
        BasicVueChat
    },
    data(){
        return {
            feed: [
                {
                    id: 2,
                    author: 'Person',
                    contents: 'hi there',
                    date: '16:30'
                },
                {
                    id: 0,
                    author: 'Me',
                    contents: 'hi fils de pute',
                    date: '16:30'
                },
                {
                    id: 0,
                    author: 'Mfsafae',
                    contents: 'ta mere tu sais pas faire un composant fuck vue vive react où on peut changer le style',
                    date: '16:30'
                },
            ],
            users: [
                { name: 'Utilisatur 1' },
                { name: 'Utilisateur 2' }
            ]
        }
    },
    methods:{
    },
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
    background: #fff;
    width: 100%;
    margin: 40px 85px;
    border-radius: 25px;
    padding: 50px 0;
}


/* //ASIDE LIST USER */
section#sectChat aside ul {
    display: flex;
    background:#37455c;
    height: 100vh;
    width: 200px;
    flex-direction: column;
    padding: 10px;
}

section#sectChat aside ul li{
    color: #fff;
    padding: 10px;
    font-size: 20px;
    cursor: pointer;
}



</style>