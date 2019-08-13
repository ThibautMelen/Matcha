<template>
<div>

    <section id="match">

<vue-swing
  @throwout="throwout"
  @throwin="throwin"
  :config="config"
>
  <div class="box">Toss me! Don't tell the elf!</div>
</vue-swing>


        <div id="presentation">
            <div class="buddy">
                <div class="avatar" style="display: block; background-image: url(http://static.stylemagazin.hu/medias/29280/Nem-ehezik-a-Women-of-the-Year-legjobb-modell-dijara-eselyes-szepseg_32fc7c86954a8847610499a0fc7261e2.jpg)"></div>
                <!-- <img src="https://s3.eu-west-3.amazonaws.com/pikomit/users/5b93235366cf193a01a12957/8E3vAF7dYUOnYlqH0itKjPhNlH4QPQ1565128107465_400px.jpg" alt=""> -->
                <!-- <h1>La Home MGL {{ famille }}</h1> -->
            </div>

            <div class="buddy">
                <div class="avatar" style="display: block; background-image: url(http://w1nd.cc/promo/347.jpg)"></div>
            </div>


        </div>
        <!-- <div id="valid">
            <input type="submit" value="NOP">
            <input type="submit" value="LIKE">
        </div> -->
    </section>

</div>
</template>



<script>
import Vue from 'vue'
import VueSwing from 'vue-swing';

Vue.component('vue-swing', VueSwing);
export default {
    name: "Home",
    data(){
        return {
            config: {
                minThrowOutDistance: 100,
                // Determine the rotation of the element
                maxRotation: 80
            },
            home: true,
            aaa: "aa"
        }
    },
    methods:{

    },
    mounted(){

    }
}

</script>

<script>
    console.log(`Salut`)
</script>



<style type="text/css">
.box {
  border: 2px solid;
  border-radius: 25px;
  color: purple;
  width: 120px;
}
/* @import '../../css/swaptinder.css'; */

section#match {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    flex-direction: column;
}

/********* PRESENTATION *********/
div#presentation {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
}

/********* BUDY SWIPE *********/
div#presentation div.buddy{
    /* width: 470px; */
    padding: 35px;
    margin-top: 30px;
    background: white;
    border-radius: 25px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 0 10px rgba(0,0,0,0.2);
    position: absolute;
    cursor: grab;
}
div#presentation div.buddy .avatar {
    background: #222;
    width: 350px;
    height: 350px;
    display: block;
    background-size: auto 160% !important;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 20px;
}

/********* VALID *********/
div#valid {
    display: flex;
    flex-direction: row;
    justify-content: center;
}

div#valid input{
    font-size: 20px;
    padding: 15px;
    border-radius: 15px;
    background-color: #10ac84;
    color: #fff;
    margin: 20px 10px;
    cursor: pointer;
}
div#valid input:nth-child(2){
    background-color: #ee5253;
}
div#valid input:nth-child(1):hover{
    background-color: #098666;
}
div#valid input:nth-child(2):hover{
    background-color: #ce1819;
}
</style>
