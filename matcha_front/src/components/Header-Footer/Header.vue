<template>
    <section>
		<!-- GLOBAL ELEMENT -->
    	<div id="wrapper" @click="open = !open" v-bind:class="{'go-to-right-black' : open, 'go-to-left-no' : !open}"></div>

		<!-- Nav Top -->
		<header id="header" v-bind:class="{'go-to-right' : open, 'go-to-left' : !open}"> 

			<!-- Burger Wraper -->
			<div id="open-nav" @click="open = !open">
				<div id="hamburger" v-bind:class="{ 'open' : open }">
					<span></span>
					<span></span>
					<span></span>
				</div>
			</div>

			<!-- Matcha logo -->
			<router-link to="/" class="logo">
				<img class="logo-nav-matcha bimboom" alt="Matcha Logo" src="../../assets/matcha_logo.png">
			</router-link>


            <!-- IF LOG -->

            <div v-if="userInfos" class="right">
                <!-- Chat -->
                <router-link class="notif" tag="div" to="/chat">
                    <svg data-name="pikomit_private-msg new" style="width: 32px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 398.93"><path d="M215.56,371.27h0l-19.41-38.79A26.68,26.68,0,0,0,146,339.12l-14.77,71.82h0A26.67,26.67,0,0,0,175.65,436h0l.3-.29c.12-.11.25-.22.36-.34l34.21-33h0a26.61,26.61,0,0,0,5-31.07Z" transform="translate(-2.5 -53.03)"></path><path d="M502.5,79.73a26.62,26.62,0,0,0-33.92-25.68v0l-447,113.25v0a26.68,26.68,0,0,0,.32,51.25v0l108.33,30.16a26.47,26.47,0,0,0,19.84-1.45v0L290,183.66a11.94,11.94,0,0,1,4-.86,10,10,0,0,1,9.92,9.68,9,9,0,0,1-4.4,7.68l-91,64.83v0a26.59,26.59,0,0,0-6,37.22l0,0L303.53,440a26.66,26.66,0,0,0,46.09-2.72l0,0L499.81,91.43l0,0A26.44,26.44,0,0,0,502.5,79.73Z" transform="translate(-2.5 -53.03)"></path></svg>                </router-link>
                <!-- Notif -->
                <router-link class="notif" tag="div" to="/notification">
                    <div v-if="this.$store.state.newNotif"></div>
                    <svg id="pikomit_notif" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480.12 500"><path d="M181.51,431.49a71.37,71.37,0,0,0,51.06,68.15h0a71,71,0,0,0,90.94-68.14v-4h-142Z" transform="translate(-12.44 -2.5)"></path><path d="M488.73,364.77h0a30.89,30.89,0,0,0-1.73-2.65l.25-.23-50.83-50.83V186.45l-.05-6.43h-.09A185.65,185.65,0,0,0,399.67,76.2,183.85,183.85,0,0,0,76.08,134.82,184.07,184.07,0,0,0,68.82,180h-.23v131L20.67,359l-2.89,2.92.24.22a30.89,30.89,0,0,0-1.73,2.65A28.64,28.64,0,0,0,37,407.44v.29H468v-.28a28.64,28.64,0,0,0,20.73-42.67Z" transform="translate(-12.44 -2.5)"></path></svg>
                </router-link>
                <!-- User info -->
                <div v-if="userInfos" class="account">
                    <p> {{ userInfos.username }} </p>
                    <img v-bind:src="`http://localhost:3000/${userInfos.profile_pics[0]}`" alt="avatar">
                    <ul>
                        <router-link v-if="$store.state.user" tag="a" :to="{name: 'ProfileComp', params: {id: this.$store.state.user.id}}"><li>Profile</li></router-link>
                        <router-link tag="a" to="/settings"><li>Settings</li></router-link>
                        <a @click="logout()"><li>log out</li></a>
                    </ul>
                </div>
            </div>

            <!-- IF NO LOG -->
            <div v-else class="reg-log">
                <router-link tag="a" to="/login/">login</router-link>
                <router-link tag="a" to="/register">register</router-link>
            </div>

		</header>

		<!-- Left Nav -->
		<nav id="nav" v-bind:class="{'fade-in-left' : open, 'fade-out-left' : !open}">
			<ul class="menu">
				<router-link v-on:click.native="open = !open" tag="a" to="/"><li v-bind:style= "this.$route.path === '/' ? 'color: #01a3a4' : 'color: #fff'">Matcha</li></router-link>
				<router-link v-on:click.native="open = !open" tag="a" to="/notification"><li v-bind:style= "this.$route.path === '/notification' ? 'color: #01a3a4' : 'color: #fff'">Notification</li></router-link>
                <router-link v-on:click.native="open = !open" tag="a" to="/search"><li v-bind:style= "this.$route.path === '/search' ? 'color: #01a3a4' : 'color: #fff'">Search</li></router-link>
				<a @click="open = !open" href="https://twitter.com/intent/tweet?text=Join Matcha 😋" target="_blank"><li>Partager Matcha</li></a>
			</ul>
		</nav>
    </section>
</template>



<script>
export default {
    props: ['userInfos'],
    data(){
        return {
            open: false
        }
    },
    methods:{
        //LOGOUT
        async logout() {
            // Delete store + redirect
            this.$store.commit('SET_USER', null)
            this.$router.push('/login');
            //Logout back
            try {
                const res = await this.$api.get(`/auth/disconnect`, {withCredentials: true});
                //Delete cookie
                this.$cookies.remove('user_token');
            } 
            catch (ex) { console.log(ex) }
        }
	},
	mounted(){
	}
}
</script>



<style type="text/css">

/*****************************************************************
	HEADER
*****************************************************************/
header#header {
    height: 75px;
    background-color: #38455c;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    border-bottom : 6px solid #f27073;
	position: relative;
	color: #fff;
}

/********* HEADER OPEN NAV *********/
header#header div#open-nav {
    display: flex;
    align-items: center;
    padding: 0 30px;
    border-right: 2px solid #ffffff14;
    cursor: pointer;
    z-index: 9;
}
header#header div#open-nav p, nav ul > li {
    letter-spacing: .2px;
    margin: 0 20px;
    font-size: 20px;
    text-transform: uppercase;
	white-space:nowrap;
	color: #fff;
}

/* hamburger */
#hamburger {
    width: 25px;
    height: 18px;
    transform: rotate(0deg);
    transition: .5s ease-in-out;
    cursor: pointer;
    z-index: 10;
}
#hamburger span {
    display: block;
    position: absolute;
    height: 2px;
    width: 100%;
    background: #fff;
    opacity: 1;
    left: 0;
    transform: rotate(0deg);
    transition: .25s ease-in-out;
}
/* if close */
#hamburger span:nth-child(1) {
    top: 0px;
    transform-origin: left center;
}
#hamburger span:nth-child(2) {
    top: 7px;
    transform-origin: left center;
}
#hamburger span:nth-child(3) {
    top: 14px;
    transform-origin: left center;
}
/* else open */
#hamburger.open span:nth-child(1) {
    transform: rotate(45deg);
    top: -3px;
    left: 8px;
}
#hamburger.open span:nth-child(2) {
    width: 0%;
    opacity: 0;
}
#hamburger.open span:nth-child(3) {
    transform: rotate(-45deg);
    top: 15px;
    left: 8px;
}


/********* HEADER LOGO *********/
header a.logo {
    height: 100%;
}
header a.logo img {
	margin-top: 10px;
    height: 55px;
}

/* /// RESPONSIVE //// */
@media only screen and (max-width: 800px) {
  header a.logo {
    display: none;
    }
}

/*****************************************************************
	RIGHT
*****************************************************************/

/* IF NOT LOG */
/********* HEADER LOGIN / REGISTER *********/
header div.reg-log {
    display: flex;
    align-items: center;
    cursor: pointer;
    height: 100%;
}
header div.reg-log a {
	display: flex;
    align-items: center;
    height: 100%;
    padding: 0 calc(2% + 40px);
    font-size: 20px;
    text-transform: capitalize;
    color: #fff;
}
header div.reg-log a:nth-child(2) {
    background-color: #f27073;
}

/* IF LOG */
/********* NOTIF *********/
header div.right {
    display: flex;
    align-items: center;
}
header div.right .notif {
    width: 27px;
    fill: #fff;
    height: 27px;
    cursor: pointer;
}
header div.right .notif:nth-child(1) {
    margin-right: 20px;
}
header div.right .notif > div {
    width: 22px;
    height: 22px;
    background: #ee5659;
    border-radius: 50px;
    position: absolute;
    margin: -5px 0px 0px -6px;
}

/********* HEADER PROFILE *********/
header div.account {
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 0 15px;
    z-index: 9999;
}
header div.account img {
    border-radius: 100%;
	width: 50px;
    height: 50px;
}
header div.account p {
	font-size: 18px;
    text-transform: uppercase;
    font-weight: 400;
    margin-right: 10px;
    color: #fff;;
}

header div.account ul {
    visibility: hidden;
    opacity: 0;

    z-index: 200;
    position: absolute;
    top: 70px;
    right: 50px;
    width: 270px;

    background-color: #fff;;
    box-shadow: 0px 0px 11px 1px #0000000f;
    border-radius: 5px;
    
    transform: translateY(25px);
    transition: all .2s ease-in-out;
}
header div.account ul li:hover {
    background-color: #a7b3b325;
    transition: all .2s ease-in-out;
}
header div.account ul li {
    padding: 1.5em 2em; 
    border-bottom : 2px solid #00000009;
	font-weight: 500;
	font-size: 18px;
}
header div.account ul a:nth-last-child(1) li{
    text-align: right;
    letter-spacing: 2px;
    text-transform: uppercase;
    white-space: nowrap;
	font-weight: 300;
	color: #f27073;
}

header div.account:hover ul, header div.account:active ul, header div.account:focus ul{
    visibility: visible;
    opacity: 1;
    transform: translateY(0);
}

/* /// RESPONSIVE //// */
@media only screen and (max-width: 400px) {
  header div.account p {
    display: none;
    }
}

/*****************************************************************
	NAV
*****************************************************************/

/********* NAV CONTAINER *********/
nav {
    display: flex;
    flex-direction: column;
    position: fixed;
    bottom: 0;
    width: 320px;
    height: 100%;
    background-color: #38455c;
	visibility: hidden;
    z-index: 100;
}
nav ul {
    display: flex;
	flex-direction: column;
}

nav ul .activepage {
    color: #01a3a4;
}
nav ul li {
    padding: 30px 30px; 
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-bottom : 2px solid #ffffff42;
}
nav ul li{
	font-weight: 500;
	color: #fff;
	font-size: 20px;
}
nav ul li:hover {
    background-color: #eea451e3;
    transition: all .2s ease-in-out;
}

/*****************************************************************
	ANIMATION
*****************************************************************/

/********* BLACK IN BLACK *********/
@keyframes go-to-black{
	0% { opacity: 0; }
	100% { opacity: 1; }
}
.go-to-right-black {
	opacity: 0;
	background-color: #000000bf;
	width: 100%;
	height: 100%;
	position: fixed;
	z-index: 1000;
	overflow: hidden;
	animation: go-to-black .7s ease-out 0s 1 normal forwards running, go-to-right .6s ease-out 0s 1 normal forwards running;
}

/********* GOT TO NO *********/
@keyframes go-to-no{
	0% { opacity: 1; }
	100% { opacity: 0; visibility: hidden; }
}
.go-to-left-no {
	opacity: 0;
	background-color: #000000bf;
	width: 100%;
	height: 100%;
	position: fixed;
	z-index: 1000;
	overflow: hidden;
	animation: go-to-no .7s ease-out 0s 1 normal forwards running, go-to-left .6s ease-out 0s 1 normal forwards running;
}


/********* GO TO LEFT *********/
@keyframes go-to-left{
	0% { transform: translate3d(20em, 0, 0); }
	100% { transform: translate3d(0em, 0, 0); }
}
.go-to-left {
	animation: go-to-left .6s ease-out 0s 1 normal forwards running;
	z-index: 2;
}

/********* GO TO RIGHT *********/
@keyframes go-to-right {
	100% { transform: translate3d(20em, 0, 0); }
}
.go-to-right {
	animation: go-to-right .6s ease-out 0s 1 normal forwards running;
	z-index: 2;
}

 
/********* FADE IN LEFT *********/
@keyframes fade-in-left {
0% {
	opacity: 0;
	transform: translate3d(-20em, 0, 0);
}
100% {
	opacity: 1;
	transform: translate3d(0, 0, 0);
}
}
.fade-in-left {
	visibility: visible;
	animation: fade-in-left .6s ease-out 0s 1 normal forwards running;
}

/********* FADE OU LEFT *********/
@keyframes fade-out-left {
	0% { opacity: 1; }
	100% {
		opacity: 0;
		transform: translate3d(-20em, 0, 0);
		visibility: hidden;
	}
}
.fade-out-left {
	visibility: visible;
	animation: fade-out-left .6s ease-out 0s 1 normal forwards running;
}


/********* BIM BOOM *********/
@keyframes bimboom {
	0% { transform: scale3d(1, 1, 1);}  
	30% { transform: scale3d(1.25, 0.75, 1);}  
	40% { transform: scale3d(0.75, 1.25, 1);}  
	50% { transform: scale3d(1.15, 0.85, 1);}  
	65% { transform: scale3d(0.95, 1.05, 1);}  
	75% { transform: scale3d(1.05, 0.95, 1);}  
	100% { transform: scale3d(1, 1, 1);}
}
.bimboom {
	animation: bimboom 2.5s ease-out 0s 1 normal forwards running;
}

</style>
