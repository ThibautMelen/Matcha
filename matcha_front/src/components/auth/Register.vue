<template>
    <section class="flex">
        <section class="form-register-login-container thor w-100 ubuntu-regular flex-center-middle h-100 fixed bottom-0 right-0">
            <form @submit.prevent="register()" class="MedievalSharp form-register-login form-register-login-responsive relative border-radius-12 blanche-bg">
                
                <h2 class="margin-0 fennir x">Rejoins Matcha</h2>
                
                <div class="input-group">      
                    <input v-model="formdata.first_name" type="text" class="MedievalSharp" required>
                    <span class="highlight"></span>
                    <span class="bar"></span>
                    <label>First Name</label>
                </div>
            
                <div class="input-group">      
                    <input v-model="formdata.last_name" type="text" class="MedievalSharp" required>
                    <span class="highlight"></span>
                    <span class="bar"></span>
                    <label>Last Name</label>
                </div>

                <div class="input-group">      
                    <input v-model="formdata.username" type="text" class="MedievalSharp" required>
                    <span class="highlight"></span>
                    <span class="bar"></span>
                    <label>UserName</label>
                </div>

                <div class="input-group">      
                    <input v-model="formdata.email" type="mail" class="MedievalSharp" required>
                    <span class="highlight"></span>
                    <span class="bar"></span>
                    <label>Mail Adress</label>
                </div>

                <div class="input-group">      
                    <input v-model="formdata.password" type="password" class="MedievalSharp" required>
                    <span class="highlight"></span>
                    <span class="bar"></span>
                    <label>Password</label>
                </div>

                <div class="input-group">
                    <input type="submit" class="MedievalSharp w-100 rhaegal-bg blanche cursor-pointer hvr-up-min border-radius-14" value="Join Matcha">
                </div>


            </form>
        </section>
    </section>
</template>

<script>

export default {
    name: "Register",
    data(){
        return {
            formdata:{
                username:'Ragnar',
                password:'revoervre',
                email:'ragnar@vikings.com',
                first_name:'Ragnar',
                last_name:'Lothbrok'
            },
            users: []
        }
    },
    methods:{
        async register () {
            console.log(`tamere`);
            let data = {    
                username: this.formdata.username,    
                password: this.formdata.password,
                email: this.formdata.email,
                first_name: this.formdata.first_name,
                last_name: this.formdata.last_name
            }
            console.log(data);
            const baseURI = '/auth/register';
            try {
                console.log(`tamere2`);

                const res = await this.$api.post(baseURI, {
                    username : data.username,
                    password : data.password,
                    email : data.email,
                    first_name : data.first_name,
                    last_name : data.last_name 
                });
                console.log(data);
                console.log(`tamere32`);
                console.log(res.data);
            } catch (ex) {
                console.log(ex);
            }
        }
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