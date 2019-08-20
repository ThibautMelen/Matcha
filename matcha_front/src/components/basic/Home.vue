<template>
<div>
    <section id="match">

        <!-- card -->
        <div class="container-swipe">
            <div style="z-index: 3">
                <Vue2InteractDraggable
                    v-if="isVisible"
                    @draggedDown="draggedDown"
                    @draggedLeft="draggedLeft"
                    @draggedRight="draggedRight"
                    @draggedUp="draggedUp"
                    :interact-out-of-sight-x-coordinate="500"
                    :interact-max-rotation="15"
                    :interact-x-threshold="200"
                    :interact-y-threshold="200"
                    :interact-event-bus-events="interactEventBusEvents"
                    class="card"
                    v-bind:style="{ backgroundImage: `url(${current.img})` }"
                    >
                    <div class="card-info">
                        <p>{{current.text}}</p>
                    </div>
                </Vue2InteractDraggable>
            </div>
            <div
                v-if="next"
                class="card card-next"
                v-bind:style="{ backgroundImage: `url(${next.img})` }"
                style="z-index: 2">
                <div class="card-info">
                    <p>{{next.text}}</p>
                </div>
            </div>
            <div
                v-if="index + 2 < cards.length"
                class="card card-next"
                v-bind:style="{ backgroundImage: `url(${current.img})` }"
                style="z-index: 1">
                <div class="flex flex--center" style="height: 100%">
                    <p>{{next.text}}</p>
                </div>
            </div>

            <!-- buton -->
            <div id="valid" >
                <input @click="dragLeft()" type="submit" value="NOP">
                <input @click="dragRight()" type="submit" value="LIKE">
            </div>

        </div>
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
    data () {
        return {
            isVisible: true,
            cards: [
                {
                    text: 'Margot Robbie',
                    img: `/static/margot-robbie.jpg`
                },                {
                    text: 'Emma Watson',
                    img: `/static/emma-watson.jpg`
                },                {
                    text: 'Shrek',
                    img: `/static/shrek.jpg`
                }
            ],
            index: 0,
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
    computed: {
        current() {
            return this.cards[this.index]
        },
        next() {
            return this.cards[this.index + 1]
        }
    },
    methods:{
        draggedDown() {
            setTimeout(() => this.isVisible = false, 200);
            setTimeout(() => {
                this.index++;
                this.isVisible = true;
            }, 300);
        },

        draggedLeft() {
            setTimeout(() => this.isVisible = false, 200);
            setTimeout(() => {
                this.index++;
                this.isVisible = true;
            }, 300);
        },

        draggedRight() {
            setTimeout(() => this.isVisible = false, 200);
            setTimeout(() => {
                this.index++;
                this.isVisible = true;
            }, 300);
        },

        draggedUp() {
            setTimeout(() => this.isVisible = false, 200);
            setTimeout(() => {
                this.index++;
                this.isVisible = true;
            }, 300);
        },

        hideCard() {
          setTimeout(() => {
            this.isVisible = false;
          }, 200);
          setTimeout(() => {
            this.isVisible = true;
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

<style type="text/css" scoped>

/********* MAIN *********/
section#match {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    flex-direction: column;
}



/********* CONTAINER SWIPE *********/
section#match .container-swipe{
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
    display: flex;
    flex-direction: column;
}



/********* MAIN CARD *********/
section#match .container-swipe .card{
    height: 500px;
    width: 440px;
    background: #fff;
    border: 20px solid #fff;
    border-radius: 60px;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    box-shadow: 0px 0px 19px -4px rgba(111, 111, 111, 0.75);
    display: flex;
    align-items: flex-end;
    position: fixed;
    left: 50%;
    top: 45%;
    transform: translate(-50%, -50%);
    cursor: grab;
}

/* next card */
section#match .container-swipe .card-next{
    top: 46%;
    width: 420px;
}

/********* INFO IN CARD *********/
div.card-info {
    display: flex;
    justify-content: center;
    background: #38455ceb;
    height: 70px;
    align-items: center;
    flex-direction: column;
    width: 100%;
    border-radius: 0 0 40px 40px;
}
div.card-info p{
    font-size: 20px;
    color: #fff;
}


/********* BUTTON VALID *********/
div#valid {
    display: flex;
    flex-direction: row;
    justify-content: center;
    position: fixed;
    top: 70%;
}

div#valid input{
    font-size: 20px;
    padding: 15px;
    border-radius: 15px;
    background-color: #ee5253;
    color: #fff;
    margin: 20px 10px;
    cursor: pointer;
}
div#valid input:nth-child(2){
    background-color: #10ac84;
}
div#valid input:nth-child(1):hover{
    background-color: #ce1819;
}
div#valid input:nth-child(2):hover{
    background-color: #098666;
}
</style>
