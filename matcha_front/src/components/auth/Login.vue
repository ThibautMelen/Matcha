<template>
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
    name: "Login",
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

                if (res.data.success === 'OK') {
                    this.$cookies.set('user_token', res.data.token);
                    this.$store.commit('SET_USER', res.data.userInfos);
                    this.$router.push('/');
                }

                //Gestion des erreurs 203
                // if(res.data.error == "joi_error")
                //     alert(res.data.message);
                // else if(res.data.error == "user_no")
                //     alert(res.data.message);
                // else if(res.data.error == "pass_no")
                //     alert(res.data.message);
                // else if(res.data.success == "OK")
                //     this.$router.push('/');
            } catch (ex) {
                console.log(ex);
            }
        },

        // FETCH ALL USER
        // async fetchUsers () {
        //     console.log(`mdrrr`);
        //     const baseURI = '/user/all?salut=coucou';
            
        //     try {
        //         const res = await this.$api.get(baseURI, { salut: 'coucou' });
        //         this.users = res.data;
        //     } catch (ex) {
        //         console.log(ex);
        //     }
        // }

        // // FETCH ONE SINGLE USER
        // async fetchUsers () {
        //     console.log(`mdrrr`);
        //     const baseURI = '/user/2'
            
        //     try {
        //         const res = await this.$api.get(baseURI);
        //         console.log(res.data)
        //         this.users = [ res.data ];
        //     } catch (ex) {
        //         console.log(ex)
        //     }
        // }
    }
}
</script>

<style type="text/css" scoped>
  @import '../../css/reg_log.css';
</style>