<template>
<div>
    <section id="match">
        
        <div class="container-swipe">
            <Vue2InteractDraggable
                @draggedDown="draggedDown"
                @draggedLeft="draggedLeft"
                @draggedRight="draggedRight"
                @draggedUp="draggedUp"
                :interact-max-rotation="15"
                :interact-out-of-sight-x-coordinate="500"
                :interact-x-threshold="200"
                :interact-event-bus-events="interactEventBusEvents"
                v-if="isShowing"
                class="card isCurrent"
                v-bind:style="{ backgroundImage: 'url(/static/margot-robbie.jpg)' }"
                >
                
    
            </Vue2InteractDraggable>
        
        </div>

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
import { Vue2InteractDraggable, InteractEventBus } from "vue2-interact";

const INTERACT_DRAGGED_DOWN = "INTERACT_DRAGGED_DOWN";
const INTERACT_DRAGGED_LEFT = "INTERACT_DRAGGED_LEFT";
const INTERACT_DRAGGED_RIGHT = "INTERACT_DRAGGED_RIGHT";
const INTERACT_DRAGGED_UP = "INTERACT_DRAGGED_UP";

export default {
    name: "Home",
    data () {
        return {
            isShowing: true,
            interactEventBusEvents: {
                draggedDown: INTERACT_DRAGGED_DOWN,
                draggedLeft: INTERACT_DRAGGED_LEFT,
                draggedRight: INTERACT_DRAGGED_RIGHT,
                draggedUp: INTERACT_DRAGGED_UP
            }
        }
    },
    components: {
        Vue2InteractDraggable,
    },

    methods:{
        draggedDown() {
          console.log("dragged down!");
          this.hideCard();
        },

        draggedLeft() {
          console.log("dragged left!");
          this.hideCard();
        },

        draggedRight() {
          console.log("dragged right!");
          this.hideCard();
        },

        draggedUp() {
          console.log("dragged up!");
          this.hideCard();
        },

        hideCard() {
          setTimeout(() => {
            this.isShowing = false;
          }, 200);
          setTimeout(() => {
            this.isShowing = true;
          }, 1000);
        },

        dragDown() {
          InteractEventBus.$emit(INTERACT_DRAGGED_DOWN);
        },

        dragLeft() {
          InteractEventBus.$emit(INTERACT_DRAGGED_LEFT);
        },

        dragRight() {
          InteractEventBus.$emit(INTERACT_DRAGGED_RIGHT);
        },

        dragUp() {
          InteractEventBus.$emit(INTERACT_DRAGGED_UP);
        }
    },
    mounted(){

    }
}

</script>

<style type="text/css">

.container-swipe{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.container-swipe .card{
    height: 480px;
    width: 462px;
    background: #fff;
    border: 20px solid #fff;
    border-radius: 10px;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    box-shadow: 0px 0px 19px -4px rgba(111, 111, 111, 0.75);
}

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
