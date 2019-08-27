<template>

    <!-- LOGIN -->
    <section id="sect">
        <form @submit.prevent="login()">
            <h1>Welcom back on Matcha !</h1>
            
            <!-- <ul>
                <p @click="fetchUsers">FEDSDTCH</p>
                <li v-for="user in users" :key="user.id">
                    {{ user.pseudo }}
                </li>
            </ul> -->
            
            <div class="input-group">      
                <input v-model="formdata.username" type="text" class="MedievalSharp" required>

                <span class="highlight"></span>
                <span class="bar"></span>
                <label>Username</label>
            </div>
            
            <div class="input-group">      
                <input v-model="formdata.password" type="password" class="MedievalSharp" required>
                <span class="highlight"></span>
                <span c lass="bar"></span>
                <label>Password</label>
            </div>

            <div class="input-group">
                <input type="submit" value="Se connecter">
            </div>


        </form>
    </section>

</template>

<script>

export default {
    data(){
        return {
            formdata:{
                username:'',
                password:''
            },
            users: []
        }
    },
    methods:{
        //LOGIN FORM
        async login () {
            let data = {    
                username: this.formdata.username,    
                password: this.formdata.password    
            }
            const baseURI = '/auth/login';
            try {
                const res = await this.$api.post(baseURI, {
                    username : data.username,
                    password : data.password
                });
                
                if(res.data.success == "OK")
                {
                    this.$cookies.set('user_token', res.data.token);
                    this.$store.commit('SET_USER', res.data.userInfos);
                    this.$store.state.socket.emit('set_sid', res.data.token)
                    this.$router.push('/');
                }
                else {
                    alert(res.data.message);
                }
            } catch (ex) {
                console.log(ex);
            }
        },
        //CHECK IF AUTHORIZED TO ACCESS PAGE
        checkCo(){
            if(this.$store.state.user) {
                this.$router.push('/');
            }
        }
    },
    mounted() {
        this.checkCo();
    }
}
</script>

<style type="text/css" scoped>
  @import '../../css/reg_log.css';
</style>