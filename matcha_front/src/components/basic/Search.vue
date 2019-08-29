<template>

    <!-- SEARCH -->
    <section v-if="this.$store.state.user" id="search">
        <!-- AGE RANGE -->
        <div class="range">
            <p>Search people betwen {{ageRange1}} and {{ageRange2 === 200 ? `200+` : ageRange2}} years old</p>
            <input type="range" min="16" max="200" step="1" :value="ageRange1" class="slider" @change="(e) => {
                if (parseInt(e.target.value) < parseInt(this.ageRange2)) {
                    this.ageRange1 = parseInt(e.target.value)
                }
                else {
                    this.ageRange1 = parseInt(this.ageRange2) - 1
                }
                this.search()
                }">
            <input type="range" min="16" max="200" step="1" :value="ageRange2" class="slider" @change="(e) => {
                if (parseInt(e.target.value) > parseInt(this.ageRange1)) {
                    this.ageRange2 = parseInt(e.target.value)
                }
                else {
                    this.ageRange2 = parseInt(this.ageRange1) + 1
                }
                this.search()
                }">
        </div>
        <!-- FAME RANGE -->
        <div class="range">
            <p>Search people with popularity betwen {{popRange1}} and {{popRange2 === 1000 ? `1000+` : popRange2}}</p>
            <input type="range" min="1" max="1000" step="1" :value="popRange1" class="slider" @change="(e) => {
                if (parseInt(e.target.value) < parseInt(this.popRange2)) {
                    this.popRange1 = parseInt(e.target.value)
                }
                else {
                    this.popRange1 = parseInt(this.popRange2) - 1
                }
                this.search()
                }">
            <input type="range" min="1" max="1000" step="1" :value="popRange2" class="slider" @change="(e) => {
                if (parseInt(e.target.value) > parseInt(this.popRange1)) {
                    this.popRange2 = parseInt(e.target.value)
                }
                else {
                    this.popRange2 = parseInt(this.popRange1) + 1
                }
                this.search()
                }">
        </div>
        <!-- KM RANGE -->
        <div class="range">
            <p>Distance {{kmRange === 100 ? `100+` : kmRange}}km</p>
            <input type="range" min="1" max="100" step="1" :value="kmRange" class="slider" @change="(e) => {
                this.kmRange = parseInt(e.target.value)
                this.search()
            }">
        </div>
        <div class="range">
            <vue-tags-input
            v-model="tag"
            :tags="tags"
            :autocomplete-items="filteredItems"
            @tags-changed="newTags => {
                tags = newTags
                this.search()
            }"
            />
        </div>
        <input :value="searchValue" type="text"  maxlength="15" placeholder="Search..." class="searchbar" @change="(e) => {
                this.searchValue = e.target.value
                this.search()
                }">
        <div id="listUser">
            <div v-for="(item, index) in items" :key="index">
                <router-link :to="{ name: 'ProfileComp', params: { id: item.id}}">
                    <img v-bind:src="`http://localhost:3000/${item.profile_pics[0]}`" alt="avatar">
                    <p>{{ item.username }} {{index}}</p>
                </router-link>

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
            ],
             // INTEREST LIST
            tags: [],
            tag: '',
            autocompleteItems: [],
            //FILTER RANGE
            ageRange1 : 16,
            ageRange2 : 200,
            popRange1 : 0,
            popRange2 : 1000,
            kmRange: 100,
            searchValue: ''
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
        async search () {
            try {
                const body = {
                    ageRange1 : this.ageRange1,
                    ageRange2 : this.ageRange2,
                    popRange1 : this.popRange1,
                    popRange2 : this.popRange2,
                    kmRange: this.kmRange,
                    interests: this.tags,
                    search: this.searchValue
                }
                console.log(body.ageRange1)
                const res = await this.$api.post(`/user/search`, body, {withCredentials: true});

                if (res.data.success) {
                    console.log('Found')
                    this.items = res.data.users
                }
            } catch (ex) {
                console.log(ex);
            }
        }
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
        this.search()
    },
    updated() {
        console.log('Updated')
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

div#listUser div a > img{
    width: 220px;
    height: 220px;
    border-radius: 60px;
}
div#listUser div a > p{
    font-size: 20px;
    color: #424242;
    text-align: center;
    margin-top: 20px;
}

</style>
