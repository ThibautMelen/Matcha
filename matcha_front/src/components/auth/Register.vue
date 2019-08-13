<template>
    

    <!-- REGISTER 
    <section id="sect">
        <h1>Register<span> for Matcha 💙</span></h1>

        <form method="POST" action="">
            <input id="register_pseudo" name="register_pseudo" value="<?php if (isset($register_pseudo)) { echo $register_pseudo; } ?>" type="text" placeholder="pseudo" required="required" maxlength="255" >
            <input id="register_email" name="register_email" value="<?php if (isset($register_email)) { echo $register_email; } ?>" type="email" placeholder="E-mail" required="required" maxlength="255">
            <input id="register_password" name="register_password" type="password" placeholder="Password" required="required" minlength="8">
            <div class="g-recaptcha" data-sitekey="6LcmcJUUAAAAAErxBXWYChbpIKnzikjM6OGyyQIv"></div>
            <input id="register_submit" name="register_submit" type="submit" value="create my account">
        </form>


    </section>
    -->

    <section id="sect">
        <form @submit.prevent="register()">
            
            <h1>Join Matcha</h1>

            <div class="input-group">      
                <input v-model="formdata.username" type="text" class="MedievalSharp" required>
                <span class="highlight"></span>
                <span class="bar"></span>
                <label>UserName</label>
            </div>
            
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
                <input v-model="formdata.bio" type="text" class="MedievalSharp" required>
                <span class="highlight"></span>
                <span class="bar"></span>
                <label>Bio</label>
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
                <input v-model="formdata.age" type="number" class="MedievalSharp" min="16" required>
                <span class="highlight"></span>
                <span class="bar"></span>
                <label>Age</label>
            </div>

            <div class="input-group">      
                <select v-model="formdata.type" required>
                    <option disabled>Choose a specie</option>
                    <option>Male</option>
                    <option>Woman</option>
                    <option>Alien</option>
                    <option>Cyborg</option>
                    <option>Giant</option>
                    <option>Minks</option>
                    <option>Elve</option>
                    <option>Troll</option>
                </select>
            </div>              

            <div class="input-group">
                <input type="submit" class="MedievalSharp w-100 rhaegal-bg blanche cursor-pointer hvr-up-min border-radius-14" value="Join Matcha">
            </div>


        </form>
    </section>




</template>

<script>
export default {
    name: "Register",
    data(){
        return {
            formdata:{
                username:'',
                password:'',
                email:'',
                first_name:'',
                last_name:'',
                bio:'',
                age: '',
                type:''
            },
            users: []
        }
    },
    methods:{
        async register () {
            let data = {
                username: this.formdata.username,
                password: this.formdata.password,
                email: this.formdata.email,
                first_name: this.formdata.first_name,
                last_name: this.formdata.last_name,
                bio: this.formdata.bio,
                age: this.formdata.age,
                type: this.formdata.type
            }
            const baseURI = '/auth/register';
            try {
                const res = await this.$api.post(baseURI, {
                    username : data.username,
                    password : data.password,
                    email : data.email,
                    first_name : data.first_name,
                    last_name : data.last_name,
                    bio : data.bio,
                    age : data.age, 
                    type : data.type 
                });
                
                // console.log(res);
                console.log(res);
                console.log(`HA!`);

                //Gestion des erreurs 203
                if(res.data.error == "joi_error")
                    alert(res.data.message);
                else if(res.data.error == "user_already_use")
                    alert(res.data.message);
                else if(res.data.error == "email_already_use")
                    alert(res.data.message);
                else if(res.data.success == "OK")
                    this.$router.push('/login');
            } catch (ex) {
                console.log(ex);
            }
        }
    }
}
</script>

<style type="text/css" scoped>
  @import '../../css/reg_log.css';
</style>