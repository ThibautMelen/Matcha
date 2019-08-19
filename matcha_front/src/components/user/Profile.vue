<template>
    <section id="profil">

        <div v-if="userinfo" id="left">
			<img v-if="userinfo.profile_pics" v-bind:src="`http://localhost:3000/${userinfo.profile_pics[0]}`" alt="avatar">
            <button v-if="profilelike == 0" @click="like()" style="background-color: #ed5673">Like</button>
            <button v-if="profilelike == 1" @click="likeback()" style="background-color: #f368e0">Like back</button>
            <button v-if="profilelike == 2" @click="likemove()" style="background-color: #10ac84">Remove Like</button>
        </div>

        <div v-if="userinfo" id="info">
            <h1>{{ userinfo.first_name }} {{ userinfo.last_name }}</h1>
            <h3 v-if="userinfo.online"><i>{{ userinfo.username }} · <span>Online</span></i></h3>
            <h3 v-else><i>{{ userinfo.username }} · {{userinfo.last_co}}</i></h3>
            <h2>{{ userinfo.type }} - {{ userinfo.age }} <b>years old</b></h2>
            <h4>{{ userinfo.first_name }} search
                <div v-if="userinfo.sexual_orientations">
                    <span v-for="(item, index) in userinfo.sexual_orientations" :key="item">
                        {{ item }}<span v-if="(index + 2) < userinfo.sexual_orientations.length">, </span><span v-if="(index + 2) == userinfo.sexual_orientations.length"> {{`&`}} </span>
                    </span>.
                </div>
            </h4>
            <h4>{{ userinfo.first_name }} like
                <div v-if="userinfo.interests" >
                    <span v-for="(item, index) in userinfo.interests" :key="item">
                        {{ item }}<span v-if="(index + 2) < userinfo.interests.length">, </span><span v-if="(index + 2) == userinfo.interests.length"> {{`&`}} </span>
                    </span>.
                </div>
            </h4>
            <p>{{ userinfo.bio }}</p>
        </div>

    </section>
</template>


<script>
export default {
    data(){
        return {
            userinfo: false,
            profilelike: 0 //like = 0 | likeback = 1 | likemove = 2
        }
    },
    methods:{
		async fetchSglUsers(userid) {
			try {
                const res = await this.$api.get(`/user/${userid}`);
                this.userinfo = res.data;
                console.log(this.userinfo)
               
                if (this.userinfo.liked)
                    this.profilelike = 1;
			} catch (ex) {
				console.log(ex)
			}
        },
        async like() {
          	try {
                console.log(`Like this profile`);
                this.profilelike = 2;
			} catch (ex) {
				console.log(ex)
			}  
        },
        async likeback() {
          	try {
                console.log(`Like back this profile`);
                this.profilelike = 2;
			} catch (ex) {
				console.log(ex)
			}  
        },
        async likemove() {
          	try {
                console.log(`Like back this profile`);
                if(this.userinfo.liked)
                    this.profilelike = 1;
                else
                    this.profilelike = 0;
			} catch (ex) {
				console.log(ex)
			}  
        }
    },
	mounted(){
		this.fetchSglUsers(this.$route.params.id);
	}
}
</script>



<style type="text/css">
/*****************************************************************
	SECTION PROFILE
*****************************************************************/
section#profil {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 5%;
}

/*****************************************************************
	LEFT
*****************************************************************/
section#profil div#left {
    padding: 25px;
    background: #fff;
    border-radius: 40px;
    margin: 7px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
}

section#profil div#left img {
    width: 200px;
    height: 200px;
    border-radius: 70px;
}

section#profil div#left button {
    padding: 10px;
    color: #fff;
    font-size: 18px;
    border-radius: 15px;
    margin-top: 15px;
    cursor: pointer;
}

/*****************************************************************
	INFO
*****************************************************************/
section#profil div#info {
    width: 600px;
    background-color: #fff;
    border-radius: 40px;
    padding: 30px;
    margin: 7px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
}

section#profil div#info * {
    width: 100%;
    white-space: normal;
}

/* first_name + last_name */
section#profil div#info h1 {
    font-size: 25px;
    text-transform: uppercase;
    font-weight: 600;
    color: #ed5773;
}

/* Username + Offline / Online*/
section#profil div#info h3 {
    font-size: 18px;
    text-transform: uppercase;
    color: #d2d2d2;
}
section#profil div#info h3 span{
    font-size: 18px;
    color:#00b894;
}

/* Type + age */
section#profil div#info h2 {
    text-transform: capitalize;
    margin-top: 10px;
    font-size: 22px;
    color: #f58469;
}

/* Orienstion */
section#profil div#info h4 {
    text-transform: capitalize;
    margin-top: 10px;
    font-size: 21px;
    color: #5287e4;
}

section#profil div#info h4 div {
    display: inline;
}

section#profil div#info h4:last-child {
    color: #6b84b1;
}

/* Bio */
section#profil div#info p {
    text-transform: capitalize;
    margin-top: 10px;
    font-size: 20px;
    color: #8993a2;
}


</style>
