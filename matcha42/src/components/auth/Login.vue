<template>
    <section class="flex">
        <section class="form-register-login-container thor w-100 ubuntu-regular flex-center-middle h-100 fixed bottom-0 right-0">
            <form  @submit.prevent="onSubmit" class="MedievalSharp form-register-login form-register-login-responsive relative border-radius-12 blanche-bg">
                
                <h2 class="margin-0 fennir x">Bon retour sur Matcha</h2>
                
                <div class="input-group">      
                    <input v-model="formdata.username" type="text" class="MedievalSharp" required>
                    <span class="highlight"></span>
                    <span class="bar"></span>
                    <label>Usernme</label>
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
    data(){
        return {
            formdata:{
                username:'',
                password:''
            }
        }
    },
    methods:{
        onSubmit(){
            console.log(this.formdata)
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