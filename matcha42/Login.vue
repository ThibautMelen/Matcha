<template>
    <section class="flex">
        <section class="form-register-login-container thor w-100 ubuntu-regular flex-center-middle h-100 fixed bottom-0 right-0">
            <form @submit.prevent="onSubmit" class="MedievalSharp form-register-login form-register-login-responsive relative border-radius-12 blanche-bg">
                
                <h2 class="margin-0 fennir x">Bon retour sur Matcha</h2>
                
                <ul>
                    <p @click="fetchUsers">FETCH</p>
                    <li v-for="user in users" :key="user.id">
                        {{ user.name }}
                    </li>
                </ul>
             
                <div class="input-group">      
                    <!-- <input v-model="formdata.username" type="text" class="MedievalSharp" required> -->
                    <input name="username" type="text" class="MedievalSharp" required>

                    <span class="highlight"></span>
                    <span class="bar"></span>
                    <label>Usernme</label>
                </div>
                
                <div class="input-group">      
                    <!-- <input v-model="formdata.password" type="password" class="MedievalSharp" required> -->
                    <input name="password" type="password" class="MedievalSharp" required>
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
import axios from "axios";

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

        //LOGIN FUNCTION
        onSubmit(){
            console.log(this.formdata)
        },
        login() {
            if(this.input.username != "" && this.input.password != "") {
                if(this.input.username == this.$parent.mockAccount.username && this.input.password == this.$parent.mockAccount.password) {
                    this.$emit("authenticated", true);
                    this.$router.replace({ name: "secure" });
                } else {
                    console.log("The username and / or password is incorrect");
                }
            } else {
                console.log("A username and password must be present");
            }
        },

        //TEST FETCH
        fetchUsers () {
            const baseURI = 'https://jsonplaceholder.typicode.com/users'
            axios.get(baseURI, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                }})
            .then((result) => {
                this.users = result.data;
                console.log(result.data);
            })
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