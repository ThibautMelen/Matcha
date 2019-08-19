<template>

    <!-- REGISTER -->
    <section id="sect">
        <form @submit.prevent="register()">
            
            <h1>Join Matcha</h1>

            <div class="input-group">      
                <input v-model="formdata.username" type="text" required>
                <span class="highlight"></span>
                <span class="bar"></span>
                <label>UserName</label>
            </div>
            
            <div class="input-group">      
                <input v-model="formdata.first_name" type="text" required>
                <span class="highlight"></span>
                <span class="bar"></span>
                <label>First Name</label>
            </div>
        
            <div class="input-group">      
                <input v-model="formdata.last_name" type="text" required>
                <span class="highlight"></span>
                <span class="bar"></span>
                <label>Last Name</label>
            </div>

            <div class="input-group">      
                <input v-model="formdata.bio" type="text" required>
                <span class="highlight"></span>
                <span class="bar"></span>
                <label>Bio</label>
            </div>

            <div class="input-group">      
                <input v-model="formdata.email" type="mail" required>
                <span class="highlight"></span>
                <span class="bar"></span>
                <label>Mail Adress</label>
            </div>

            <div class="input-group">      
                <input v-model="formdata.password" type="password" required>
                <span class="highlight"></span>
                <span class="bar"></span>
                <label>Password</label>
            </div>

            <div class="input-group">
                <input v-model="formdata.age" type="number" min="16" required>
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

            <div>
                <vue-upload-multiple-image class="input-group"
                @upload-success="uploadImageSuccess"
                @before-remove="beforeRemove"
                @edit-image="editImage"
                @data-change="dataChange"
                :data-images="images"
                :dragText="'Drag pictures'"
                :browseText="'(or Select)'"
                :primaryText="'Default'"
                :markIsPrimaryText="'Set as default'"
                :dropText="'Drop your file here ...'"
                :popupText="'This image will be displayed as default'"
                :maxImage="5"
                ></vue-upload-multiple-image>
            </div>

            <div class="input-group">
                <input type="submit" value="Join Matcha">
            </div>

        </form>
    </section>

</template>

<script>

import VueTagsInput from '@johmun/vue-tags-input';
import VueUploadMultipleImage from 'vue-upload-multiple-image'

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
                type:'',
                sexual_orientations: [],
                tags: [],
                tag: '',
            },
            tags: [],
            tag: '',
            images: [],
            profile_pics: [],
            autocompleteItems: [],
            uploading_image: false
        }
    },
    components: {
        VueTagsInput,
        VueUploadMultipleImage,
    },
    methods:{
        //REGISTER FORM
        async register () {
            if (this.uploading_image) {
                alert('Please wait, image is uploading')
                return
            }

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
                lat: parseFloat(0),
                profile_pics: this.profile_pics
            }
            console.log(data);
            console.table(data.profile_pics, this.profile_pics);

            // AXIOS BDD
            try {
                const res = await this.$api.post('/auth/register', data);

                console.log(res.data);
                console.log(res.status);

                //Gestion des erreurs 203
                if(res.data.error == "validation_error")
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
        },
        //FETCH INTERESET
        async fetchInterest () {
            try {
                const res = await this.$api.get('/user/interests');
                this.autocompleteItems = res.data.interests;
            } catch (ex) {
                console.log(ex);
            }
        },
        //CHECK IF AUTHORIZED TO ACCESS PAGE
        checkCo(){
            if(this.$store.state.user) {
                this.$router.push('/');
            }
        },
        //UPLOAD IMAGE
        uploadImageSuccess(formData, index, fileList) {
            this.uploading_image = true

            this.$api.post('/user/image', formData)
            .then(res => {
                if (res.data.success) {
                    this.profile_pics.push(res.data.file.path)
                    console.log(res.data)
                }
                else {
                    console.error('Upload failed')
                    console.log(res.data)
                }
                this.uploading_image = false
            })
            .catch(err => {
                console.error(err)
                this.uploading_image = false
            })
        },
        beforeRemove (index, done, fileList) {
            console.log('index', index, fileList)
            var r = confirm("remove image")
            if (r == true) {
                done()
            }
        },
        editImage (formData, index, fileList) {
            console.log('edit data', formData, index, fileList)
        },
        dataChange (data) {
            console.log(data)
        }
    },
    computed: {
        filteredItems() {
            return this.autocompleteItems.filter(i => {
                return i.text.toLowerCase().indexOf(this.formdata.tag.toLowerCase()) !== -1;
            });
        },
    },
    mounted() {
        this.fetchInterest();
        this.checkCo();
    }
}
</script>

<style type="text/css" scoped>
  @import '../../css/reg_log.css';
</style>