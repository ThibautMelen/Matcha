<template>
    <section id="profil">


        <div v-if="userinfo" id="left">
                {{ userinfo }}
			<img v-bind:src="userinfo.avatar[1]" alt="avatar">
            <button v-if="profilelike.status == 0" @click="like()">Like</button>
            <button v-if="profilelike.status == 1" @click="likeback()">Like back</button>
        </div>

        <div id="info">
            <h1>{{ userinfo.first_name }} {{ userinfo.last_name }}</h1>
            <h3 v-if="userinfo.online"><i>{{ userinfo.username }} · <span>Online</span></i></h3>
            <h3 v-else><i>{{ userinfo.username }} · {{userinfo.last_co}}</i></h3>
            <h2>{{ userinfo.type }} - {{ userinfo.age }} <b>years old</b></h2>
            <h4>{{ userinfo.first_name }} search
                <span v-for="(item, index) in userinfo.orientation" :key="item">
                    {{ item }}<span v-if="(index + 2) < userinfo.orientation.length">, </span><span v-if="(index + 2) == userinfo.orientation.length"> & </span>
                </span>.
            </h4>
            <h4>{{ userinfo.first_name }} like
                <span v-for="(item, index) in userinfo.interest" :key="item">
                    {{ item }}<span v-if="(index + 2) < userinfo.interest.length">, </span><span v-if="(index + 2) == userinfo.interest.length"> & </span>
                </span>.
            </h4>
            <p>{{ userinfo.bio }}</p>
        </div>

    </section>
</template>


<script>
export default {
    name: "Profile",
    data(){
        return {
			userinfo: {
                username: `maggot`,
                first_name: `Margot`,
                last_name: `Robbie`,
                bio: `Margot Elise Robbie is an Australian actress and film producer. She has received nominations.`,
                type: `female`,
                age: `29`,
                online: false,
                last_co: `15/08/2019`,
                orientation: [`mdrr`, `male`, `female`],
                interest: [`cinema`, `fashion`, `pikomit`, `comedy`, `marvel`, `coca cola`], 
                avatar: [`https://us.hola.com/imagenes/health-and-beauty/2019080826791/margot-robbie-lash-treatment-mascara-sharon-tate/0-196-115/Margot-Robbie-Lashes-m.jpg?filter=w400`, `https://s1.r29static.com//bin/entry/cd4/720x864,85/2188557/the-touching-way-margot-robbie-2188557.webp`]
            },
            profilelike: {
                status: 0
            }
        }
    },
    methods:{
		async fetchSglUsers() {
			try {
				const res = await this.$api.get('/user/all/1');
				this.userinfo = res.data;
			} catch (ex) {
				console.log(ex)
			}
        },
        async like() {
          	try {
                alert(`Like this profile`);
                profilelike.status = 1;
			} catch (ex) {
				console.log(ex)
			}  
        },
        async likeback() {
          	try {
				alert(`Like this profile`);
			} catch (ex) {
				console.log(ex)
			}  
        }
	},
	mounted(){
		this.fetchSglUsers();
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
    background: #ed5673;
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
