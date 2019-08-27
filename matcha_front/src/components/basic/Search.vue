<template>

    <!-- SEARCH -->
    <section v-if="this.$store.state.user" id="search">
        <div class="range">
            <p>Search people betwen {{ageRange1}} and {{ageRange2}} years old</p>
            <input type="range" min="16" max="700" step="1" value="25" class="slider" v-model="ageRange1">
            <input type="range" min="16" max="700" step="1" value="450" class="slider" v-model="ageRange2">
        </div>
        <div class="range">
            <p>Search people with popularity betwen {{popRange1}} and {{popRange2}}</p>
            <input type="range" min="0" max="100" step="1" value="35" class="slider" v-model="popRange1">
            <input type="range" min="0" max="100" step="1" value="75" class="slider" v-model="popRange2">
        </div>
        <div class="range">
            <vue-tags-input
            v-model="tag"
            :tags="tags"
            :autocomplete-items="filteredItems"
            @tags-changed="newTags => tags = newTags"
            />
        </div>
        <input type="text" maxlength= "12" placeholder="Search..." class="searchbar">
        <div id="listUser">
            <div v-for="(item, index) in items" :key="index">
                <img src="http://localhost:3000/public/bf00cbe9f7808ec597efb2e00f2cbf6e.jpg" alt="avatar">
                <p>{{ item.username }} {{index}}</p>
            </div>
        </div>
    </section>
</template>


<script>

import VueTagsInput from '@johmun/vue-tags-input';

export default {
    data(){
        console.log()
        return {
            items: [
                { username: 'Emilia Clark' },
                { username: 'Pénélope Cruz' },
                { username: 'Gigi Hadid' },
                { username: 'Janelle Monae' },
                { username: 'Marion Cotillard' },
                { username: 'Rihanna' },
                { username: 'Margot Robbie' },
                { username: 'Emily Ratajkowski' },
                { username: 'Angelina Jolie' },
                { username: 'Pénélope Cruz' },
                { username: 'Gigi Hadid' },
                { username: 'Janelle Monae' },
                { username: 'Marion Cotillard' },
                { username: 'Rihanna' },
                { username: 'Margot Robbie' },
                { username: 'Emily Ratajkowski' },
                { username: 'Angelina Jolie' },
            ],
             // INTEREST LIST
            tags: this.$store.state.user ? this.$store.state.user.interests : [],
            tag: '',
            autocompleteItems: [],
            //FILTER RANGE
            ageRange1 : 135,
            ageRange2 : 450,
            popRange1 : 35,
            popRange2 : 75
        }
    },
    components: {
        VueTagsInput,
    },
    methods:{
        //FETCH INTERESET
        async fetchInterest () {
            try {
                const res = await this.$api.get('/user/interests');
                this.autocompleteItems = res.data.interests;
            } catch (ex) {
                console.log(ex);
            }
        },

    },
    computed: {
        filteredItems() {
            return this.autocompleteItems.filter(i => {
                return i.text.toLowerCase().indexOf(this.tag.toLowerCase()) !== -1;
            });
        },
    },
    mounted() {
        console.log(`mounted`);
        this.fetchInterest();
    },

}
</script>



<style type="text/css" scoped>

/*****************************************************************
	SECTION MAIN SEARCH
*****************************************************************/
section#search {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: start;
    align-items: center;
    margin-top: 5%;
}

/*****************************************************************
	RANGE OPTION
*****************************************************************/
section#search div.range{
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: start;
    align-items: center;
    width: 80%;
    margin-bottom: 50px;
}
section#search div.range p{
    font-size: 20px;
}

 .vue-tags-input {
    max-width: none;
    color: #424242;
  }

/*****************************************************************
	RANGE SLIDER
*****************************************************************/
.slider {
    width: 100%;
    height: 25px;
    background: #ffffff;
    border-radius: 20px;
    margin-top: 10px;
}

.slider:hover {
  opacity: 1;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 25px;
  height: 25px;
  border-radius: 100px;
  background: #f27074;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 25px;
  height: 25px;
  border-radius: 100px;
  background: #f27074;
  cursor: pointer;
}

/*****************************************************************
	INPUT SEARCH
*****************************************************************/
section#search input.searchbar {
    font-size: 22px;
    height: 20px;
    outline: none;
    border-radius: 40px;
    box-shadow: 10px 10px 45px -30px #0000003e;
    padding: 25px;
    transition: all .2s;
    transition-delay: .1s;
    width: 80%;
    margin-bottom: 20px;
}

/*****************************************************************
	CARD
*****************************************************************/
div#listUser {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    width: 80%;
}

div#listUser div{
    padding: 20px 30px;
    background: #fff;
    border-radius: 40px;
    margin: 7px;
    cursor: pointer;
}

div#listUser div > img{
    width: 220px;
    height: 220px;
    border-radius: 60px;
}
div#listUser div > p{
    font-size: 20px;
    color: #424242;
    text-align: center;
    margin-top: 20px;
}

</style>
