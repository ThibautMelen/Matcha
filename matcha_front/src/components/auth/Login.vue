<template>
    <section class="flex">
        <section class="form-register-login-container thor w-100 ubuntu-regular flex-center-middle h-100 fixed bottom-0 right-0">

            <form @submit.prevent="login()" class="MedievalSharp form-register-login form-register-login-responsive relative border-radius-12 blanche-bg">
                
                <h2 class="margin-0 fennir x">Bon retour sur Matcha</h2>
                
                <ul>
                    <p @click="fetchUsers">FEDSDTCH</p>
                    <li v-for="user in users" :key="user.id">
                        {{ user.pseudo }}
                    </li>
                </ul>
             
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
                    <input type="submit" class="MedievalSharp w-100 rhaegal-bg blanche cursor-pointer hvr-up-min border-radius-14" value="Se connecter">
                </div>

            </form>

        </section>
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
                const res = await this.$api.post(baseURI, { username : data.username, password : data.password });
                this.users = res.data;
            } catch (ex) {
                console.log(ex);
            }
        },

        // FETCH ALL USER
        async fetchUsers () {
            console.log(`mdrrr`);
            const baseURI = '/user/all?salut=coucou';
            
            try {
                const res = await this.$api.get(baseURI, { salut: 'coucou' });
                this.users = res.data;
            } catch (ex) {
                console.log(ex);
            }
        }

        // FETCH ONE SINGLE USER
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

<style type="text/css">
    .form-register-login-container {
        background-color: #ffce8d;
    }

    .form-register-login h2 {
        margin-bottom: -10px;
        font-size: 30px;
    }
    .form-register-login {
        width: 350px;
        box-shadow: 0 0 5px 0 #d6d6d6;
        padding: 80px;
        margin-top: 55px;
    }
</style>