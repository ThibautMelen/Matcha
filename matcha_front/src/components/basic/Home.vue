<template>
<div>
    <section id="match">

        <!-- card -->
        <div v-if="cards && cards.length > 0" class="container-swipe">
            <div style="z-index: 3">
                <Vue2InteractDraggable
                    v-if="current && isVisible"
                    @draggedLeft="draggedLeft"
                    @draggedRight="() => draggedRight(current.id)"
                    :interact-out-of-sight-x-coordinate="500"
                    :interact-max-rotation="15"
                    :interact-x-threshold="200"
                    :interact-y-threshold="200"
                    :interact-event-bus-events="interactEventBusEvents"
                    class="card"
                    v-bind:style="{ backgroundImage: `url(http://localhost:3000/${current.profile_pics.split(',')[0]})` }"
                    >
                    <div class="card-info">
                        <p>{{current.username}}</p>
                    </div>
                </Vue2InteractDraggable>
            </div>
            <div
                v-if="next"
                class="card card-next"
                v-bind:style="{ backgroundImage: `url(http://localhost:3000/${next.profile_pics.split(',')[0]})` }"
                style="z-index: 2">
                <div class="card-info">
                    <p>{{next.username}}</p>
                </div>
            </div>

            <!-- buton -->
            <div v-if="current" id="valid" >
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
            cards: [],
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
        async like(id) {
          	try {
                const res = await this.$api.get(`/user/like/${id}`, {withCredentials: true});

                if (res.data.success) {
                    this.$store.commit('SET_USER', {...this.$store.state.user, likes: res.data.likes})
                    console.log(id)

                    console.log(this.$store.state.user.likes.includes(id.toString()))
                }
                else {
                    alert('Server error.')
                }
			} catch (ex) {
                alert('Server error.')
				console.log(ex)
			}  
        },

        draggedLeft() {
            setTimeout(() => this.isVisible = false, 200);
            setTimeout(() => {
                this.index++;
                this.isVisible = true;
            }, 300);
        },

        draggedRight(id) {
            setTimeout(() => this.isVisible = false, 200);
            setTimeout(() => {
                this.index++;
                this.isVisible = true;
            }, 300);

            this.like(id)
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
        },
        async fetchCards() {
            try {
                let res = await this.$api.get('/user/cards', {withCredentials: true});
                console.log(res.data)

                if (res.data.success && res.data.sortedUsers) {
                    this.cards = res.data.sortedUsers
                }
            }
            catch (err) {
                console.error(err)
            }
        }
    },
    created() {
        if (!this.$store.state.user) {
            this.$router.push('/login')
        }
    },
    mounted (){
        this.fetchCards()
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
    height: 360px;
    width: 320px;
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
    width: 320px;
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
