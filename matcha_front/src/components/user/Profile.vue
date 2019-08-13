<template>
    <section id="profil">
        <div id="img">
			<img v-bind:src="avatar" alt="avatar">
        </div>
        <div id="info">
            <h1>{{ userinfo.first_name }} {{ userinfo.last_name }}</h1>
            <h3>{{ userinfo.username }}</h3>
            <p>{{ userinfo.type }} - {{ userinfo.age }} years old</p>
            <p>{{ userinfo.bio }}</p>
        </div>
    </section>
</template>



<script>
export default {
    name: "Home",
    data(){
        return {
			userinfo: {},
			avatar:'https://s3.eu-west-3.amazonaws.com/pikomit/users/5b93235366cf193a01a12957/8E3vAF7dYUOnYlqH0itKjPhNlH4QPQ1565128107465_400px.jpg'
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
		}
	},
	mounted(){
		this.fetchSglUsers();
	}
}
</script>



<style type="text/css">
/*****************************************************************
	SECTION
*****************************************************************/
section#profil {
    padding: 4% 20%;
    display: flex;
}

section#profil h1 {
    font-size: 25px;
    text-transform: uppercase;
    white-space:nowrap;
    font-weight: 600;
    margin-bottom: 10px;
}

/********* IMG *********/
section#profil div#img img {
    margin-right: 50px;
}
section#profil div#img img {
    width: 200px;
    height: 200px;
    border-radius: 80px;
}

/********* INFO *********/
section#profil div#info {
    width: 600px;
}

section#profil div#info p {
    margin-top: 10px;
    font-size: 20px;
}

</style>
