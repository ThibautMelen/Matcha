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
				<p>menu</p>
			</div>

			<!-- Matcha logo -->
			<router-link to="/" class="logo">
				<img class="logo-nav-matcha bimboom" alt="Matcha Logo" src="../../assets/matcha_logo.png">
			</router-link>

			<!-- IF LOG -->
			<div v-if="islog" class="account">
			<p> {{ userinfo.first_name }} </p>
			<img v-bind:src="avatar" alt="avatar">
			<ul>
				<a href=""><li>Profile</li></a>
				<a href=""><li>Settings</li></a>
				<a href=""><li>log out</li></a>
			</ul>
			</div>
			<!-- IF NO LOG -->
			<div  v-else class="reg-log">
				<router-link tag="a" to="/login">login</router-link>
				<router-link tag="a" to="/register">register</router-link>
			</div>

		</header>

		<!-- Left Nav -->
		<nav id="nav" v-bind:class="{'fade-in-left' : open, 'fade-out-left' : !open}">
			<ul class="menu">
				<router-link v-on:click.native="open = !open" tag="a" to="/"><li v-bind:style= "this.$route.path === '/' ? 'color: #01a3a4' : 'color: #fff'">Home</li></router-link>
				<router-link v-on:click.native="open = !open" tag="a" to="/login"><li v-bind:style= "this.$route.path === '/x' ? 'color: #01a3a4' : 'color: #fff'">Autre page</li></router-link>
				<a @click="open = !open" href="https://twitter.com/intent/tweet?text=Join Camagru 😋" target="_blank"><li>Partager</li></a>
			</ul>
		</nav>
    </section>
</template>



<script>
export default {
    name: "Header",
    data(){
        return {
			userinfo: {},
			oklm: '',
			avatar:'https://s3.eu-west-3.amazonaws.com/pikomit/users/5b93235366cf193a01a12957/8E3vAF7dYUOnYlqH0itKjPhNlH4QPQ1565128107465_400px.jpg',
			islog: true,
			open: false
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
    padding: 0 2em;
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

/* IF NOT LOG */
/********* HEADER LOGIN / REGISTER *********/
header div.reg-log {
    display: flex;
    align-items: center;
    cursor: pointer;
}
header div.reg-log a {
	display: flex;
    align-items: center;
    height: 100%;
    padding: 0 calc(2vw + 40px);
    font-size: 20px;
    text-transform: capitalize;
    color: #fff;
}
header div.reg-log a:nth-child(2) {
    background-color: #f27073;
}

/* IF NOT LOG */
/********* HEADER PROFILE *********/
header div.account {
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 0 calc(2vw + 10px);
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
    margin: 20px;
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
    height: 100vh;
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
	width: 100vw;
	height: 100vh;
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
	width: 100vw;
	height: 100vh;
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
