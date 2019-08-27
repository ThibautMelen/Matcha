<template>
    <section id="profil">

        <div v-if="userinfo" id="left">
			<img v-if="userinfo.profile_pics" v-bind:src="`http://localhost:3000/${userinfo.profile_pics[imgNb]}`" @click="nextImg()" alt="avatar">
            <div v-if="this.$store.state.user && this.$store.state.user.id !== userinfo.id" class="button-profile">
                <!-- Like user -->
                <button v-if="this.$store.state.user.likes && this.$store.state.user.likes.includes(userinfo.id.toString())" @click="likeRemove(userinfo.id)" style="background-color: #ed5673">Remove Like</button>
                <button v-else-if="!userinfo.likes || !userinfo.likes.includes(this.$store.state.user.id)" @click="like(userinfo.id)" style="background-color: #10ac84">Like</button>
                <button v-else-if="userinfo.likes && userinfo.likes.includes(this.$store.state.user.id)" @click="like(userinfo.id)" style="background-color: #f368e0">Like back</button>
                <!-- Block user -->
                <button v-if="true" @click="blockUser(userinfo.id)" style="background-color: #FD7272">Block User</button>
                <!-- Report user -->
                <button v-if="true" @click="reportUser(userinfo.id)" style="background-color: #FD7272">Report User</button>
            </div>
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
            imgNb: 0
        }
    },
    methods:{
        //GET USER PAGE INFO
		async fetchSglUsers(userid) {
			try {
                const res = await this.$api.get(`/user/${userid}`);
                this.userinfo = res.data;
			} catch (ex) {
				console.log(ex)
            }

            if (this.$store.state.user) {
                try {
                    const res = await this.$api.get(`user/visit/${userid}`, {withCredentials: true});
                } catch (ex) {
                    console.log(ex)
                }
            }
        },
        //LIKE USER
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
        async likeRemove(id) {
          	try {
                const res = await this.$api.get(`/user/unlike/${id}`, {withCredentials: true});

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
        //NEXT IMG PROFILE
        nextImg(){
            if((this.imgNb + 1) < this.userinfo.profile_pics.length)
                this.imgNb += 1;
            else
                this.imgNb = 0;
            console.log(this.imgNb);
        },
        //BLOCK USER
        async blockUser(id) {
            console.log('blockuser()', id);

            // try {
            //     const res = await this.$api.get(`/user/like/${id}`, {withCredentials: true});

            //     if (res.data.success) {
            //         this.$store.commit('SET_USER', {...this.$store.state.user, likes: res.data.likes})
            //         console.log(id)

            //         console.log(this.$store.state.user.likes.includes(id.toString()))
            //     }
            //     else {
            //         alert('Server error.')
            //     }
            // } catch (ex) {
            //     alert('Server error.')
            //     console.log(ex)
            // }  
        },
        //REPORT USER
        async reportUser(id) {
            console.log('reportuser()', id);

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
    },
	mounted(){
        this.fetchSglUsers(this.$route.params.id);
    },
    updated(){
        if (this.userinfo.id !== this.$route.params.id) {
            this.fetchSglUsers(this.$route.params.id);
        }
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
}

section#profil div#left img {
    width: 200px;
    height: 200px;
    border-radius: 70px;
    cursor: pointer;
}

section#profil div#left div.button-profile {
    display: flex;
    flex-direction: column;
    justify-content: center;
}
section#profil div#left button {
    padding: 10px;
    color: #fff;
    font-size: 18px;
    border-radius: 15px;
    margin-top: 15px;
    cursor: pointer;
    width: 100%;
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
