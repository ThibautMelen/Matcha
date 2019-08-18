<template>

    <!-- REGISTER -->
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
                    <option selected>Male</option>
                    <option>Woman</option>
                    <option>Alien</option>
                    <option>Cyborg</option>
                    <option>Giant</option>
                    <option>Minks</option>
                    <option>Elve</option>
                    <option>Troll</option>
                </select>
            </div>

            <div id="checkbox">
                <p>You here for :</p>
                <input type="checkbox" id="male" value="Male" v-model="formdata.sexual_orientations">
                <label for="male">Male</label>
                <input type="checkbox" id="woman" value="Woman" v-model="formdata.sexual_orientations">
                <label for="woman">Woman</label>
                <input type="checkbox" id="alien" value="Alien" v-model="formdata.sexual_orientations">
                <label for="alien">Alien</label>
                <input type="checkbox" id="cyborg" value="Cyborg" v-model="formdata.sexual_orientations">
                <label for="cyborg">Cyborg</label>
                <input type="checkbox" id="giant" value="Giant" v-model="formdata.sexual_orientations">
                <label for="giant">Giant</label>
                <input type="checkbox" id="minks" value="Minks" v-model="formdata.sexual_orientations">
                <label for="minks">Minks</label>
                <input type="checkbox" id="elve" value="Elve" v-model="formdata.sexual_orientations">
                <label for="elve">Elve</label>
                <input type="checkbox" id="troll" value="Troll" v-model="formdata.sexual_orientations">
                <label for="troll">Troll</label>
            </div>

            <div class="input-group">
                <vue-tags-input
                v-model="formdata.tag"
                :tags="formdata.tags"
                :autocomplete-items="filteredItems"
                @tags-changed="newTags => tags = newTags"
                />
            </div>

            <div class="input-group">
                <input type="submit" class="MedievalSharp w-100 rhaegal-bg blanche cursor-pointer hvr-up-min border-radius-14" value="Join Matcha">
            </div>


        </form>
    </section>




</template>

<script>

import VueTagsInput from '@johmun/vue-tags-input';

export default {
    name: "Register",
    data(){
        return {
            autocompleteItems: [{
                text: 'Spain',
            }, {
                text: 'France',
            }, {
                text: 'USA',
            }, {
                text: 'Germany',
            }, {
                text: 'China',
            }],
            formdata:{
                username:'KingRagnar',
                password:'Lothbrok',
                email:'ragner@vikings.com',
                first_name:'Ragnar',
                last_name:'Lothbrok',
                bio:'King of Vikings civilisation.',
                age: '78',
                type:'male',
                tag: '',
                tags: [],
                sexual_orientations: []
            },
            users: []
        }
    },
    components: {
        VueTagsInput,
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
                age: parseInt(this.formdata.age),
                type: this.formdata.type,
                interests: this.tags.map(v => ({text: v.text})),
                sexual_orientations: this.formdata.sexual_orientations,
                lng: parseFloat(0),
                lat: parseFloat(0)
            }
            console.log(data);
            console.table(data.interests);
            // AXIOS BDD
            const baseURI = '/auth/register';
            try {
                const res = await this.$api.post(baseURI, data);

                console.log(res.data);
                console.log(res.status);

                //Gestion des erreurs 203
                // if(res.data.error == "joi_error")
                //     alert(res.data.message);
                // else if(res.data.error == "user_already_use")
                //     alert(res.data.message);
                // else if(res.data.error == "email_already_use")
                //     alert(res.data.message);
                // else if(res.data.success == "OK")
                //     this.$router.push('/login');
            } catch (ex) {
                console.log(ex);
            }
        },
    },
    computed: {
        filteredItems() {
            return this.autocompleteItems.filter(i => {
            return i.text.toLowerCase().indexOf(this.formdata.tag.toLowerCase()) !== -1;
            a
        });
    },
    },
}
</script>

<style type="text/css" scoped>
  @import '../../css/reg_log.css';
   .vue-tags-input .ti-input {
    padding: 40px 10px!important;
    transition: border-bottom 200ms ease;
  }
</style>