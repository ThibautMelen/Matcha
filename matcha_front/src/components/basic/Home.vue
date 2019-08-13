<template>
<div>

    <section id="match">

<Vue2InteractDraggable
  @draggedLeft="draggedLeft"
  :interact-event-bus-events="interactEventBusEvents"
  v-if="isShowing"
  class="card isCurrent"
>
  <div>
    <h3 class="cardTitle">Drag me!</h3>
  </div>
</Vue2InteractDraggable>


        <!-- <div id="presentation">
            <div class="buddy">
                <div class="avatar" style="display: block; background-image: url(http://static.stylemagazin.hu/medias/29280/Nem-ehezik-a-Women-of-the-Year-legjobb-modell-dijara-eselyes-szepseg_32fc7c86954a8847610499a0fc7261e2.jpg)"></div>
            </div>
        </div> -->
        <!-- <div id="valid">
            <input type="submit" value="NOP">
            <input type="submit" value="LIKE">
        </div> -->
    </section>

</div>
</template>



<script>
import Vue from 'vue'
import { Vue2InteractDraggable, InteractEventBus } from 'vue2-interact'
 
const INTERACT_DRAGGED_LEFT = 'INTERACT_DRAGGED_LEFT';

export default {
    name: "Home",
    data(){
        return {
            home: true,
            isShowing: true,
            interactEventBusEvents: {
                draggedLeft: INTERACT_DRAGGED_LEFT,
            },
        }
    },
    components: {
        Vue2InteractDraggable
    },
    methods:{
        dragLeft() {
            InteractEventBus.$emit(INTERACT_DRAGGED_LEFT);
        },
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
