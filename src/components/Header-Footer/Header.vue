<template>
    <section>
        <header>

            <nav class="navbar-login-register text-align-center blanche blackpearl-bg">
                <img class="logo-nav-matcha" alt="Matcha Logo" src="../../assets/matcha_logo.png">

            </nav>
            


            <!-- <nav v-if="$route.name === 'home'" class="navbar-login-register text-align-center ubuntu-bold blanche yodhal">
                <nuxt-link @click.native="$scrollToTop" :to="{name: 'main_search'}">
                    <img alt="Vue logo" src="./assets/matcha_logo.png">
                </nuxt-link>
                <div class="navbar-float-menu-rigth register-login h-inherit absolute inline-flex right-0 top-0">
                    <nuxt-link @click.native="$scrollToTop" to="/login" tag="div" class="flex-center-middle blanche h-100"><p>{{ $t("auth.login") }}</p></nuxt-link>
                    <nuxt-link @click.native="$scrollToTop" to="/register" tag="div" class="flex-center-middle rhaegal-bg blanche h-100"><p>{{ $t("auth.register") }}</p></nuxt-link>
                </div>
            </nav> -->

            
        </header>
    </section>
</template>

<style type="text/css">

/*****************************************************************
	NAVBAR
*****************************************************************/

nav{
	width: 100vw;
	height: 75px;
	position: fixed;
	top: 0px;
	right: 0px;
	left: 0px;
	padding-left: 295px;
	bottom: 0px;
	z-index: 42;
	box-sizing: border-box;
}

.navbar-div-black{
	position: fixed;
	top: 0px;
	left: 0px;
	width: 100vw;
	height: 56px;
	z-index: 41;
	background-color: #0000001a;
}

.icon-notif {
	width: auto;
	padding: 2px 8px;
	border-radius: 15px;
	font-size: 12px;
	top: -6px;
	right: -20px;
	z-index: 22;
	border: 2px solid #38455c;
}

.icon-notif-responsive {
	left: 15px;
	top: 3px;
}

/**** MENU-LEFT ****/
.navbar-float-menu-left .navbar-action{
	height: 100%;
	border-left: 0.1em solid #3f4b60;
	box-sizing: content-box;
	width: 100px;
}

.navbar-float-menu-left .navbar-action:hover{
	background: -o-linear-gradient(top, rgba(0,0,0,0) 0%, rgba(8,139,140,0.2) 100%);
	background: -ms-linear-gradient(top, rgba(0,0,0,0) 0%, rgba(8,139,140,0.2) 100%);
	background: linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(8,139,140,0.2) 100%);
}

.navbar-float-menu-left .router-link-active svg{
	color: #fff;
	fill: #fff;
}

.navbar-float-menu-left a:nth-child(1) svg{width: 22px;}
.navbar-float-menu-left a:nth-child(2) svg{width: 19px;}
.navbar-float-menu-left a:nth-child(3) svg {width: 22px;}
.navbar-float-menu-left a:nth-child(4) svg {width: 22px;}

.navbar-float-menu-left svg {
	z-index: 2;
	fill: #94a0b0;
	padding: 0;
	margin: 0;
	margin-top: 7px;
}

.navbar-search {
    border-right: 1.5px solid #3f4b60;
}

/* BAR BOTTOM */
.bar-bottom-navbar{
	height: 6px;
	bottom: 0px;
	transition: all 272ms ease-in-out;
	-webkit-transition: all 272ms ease-in-out;
	-moz-transition: all 272ms ease-in-out;
}

/**** MENU RIGHT ****/
.navbar-float-menu-rigth button{
	margin-right: 15px;
}

.navbar-avatar{
	width: 36px;
	height: 36px;
	margin: 0px 7.5px;
}

/*****************************************************************
	LOGIN-REGISTER
*****************************************************************/

.navbar-login-register{
	font-size: 12.35px;
	word-spacing: 1px;
	letter-spacing: -0.5px;
	width: 100vw;
	padding-left: 0px;
}

/**** LOGO ****/
.logo-nav-matcha {
    margin-top: 16px;
    width: 140px;
}

/**** MENU-RIGHT ****/
.register-login div{
	cursor: pointer;
	min-width: 150px;
}

.register-login p{
	font-size: 11.5px;
	letter-spacing: 0.15px;
	word-spacing: .5px;
	transition: .2s;
	margin: 0 30px;
}

/*****************************************************************
	WHITE
*****************************************************************/

.navbar-white{
	padding: 0px;
	height: 70px;
	border-bottom: 2px solid #eef1f7;
}

.navbar-white svg{
	width: 95px;
}

/*****************************************************************
	DIV CLICK AVATAR
*****************************************************************/

.dropdown-menu-navbar{
	top: 64px;
	right: 115px;
	min-width: 190px
}

.dropdown-menu-navbar .username{
	padding: 15px 15px 10px 15px;
}

.dropdown-menu-navbar h1{
	margin-right: 10px;
	font-size: 18px;
}

.dropdown-menu-navbar img{
	width: 20px;
}

.dropdown-menu-navbar hr{
	border : 0;
	height: 2px;
	background-image: linear-gradient(to right, rgba(39, 48, 63, 0.55), #27303f, rgba(39, 48, 63, 0.55));
}

.dropdown-menu-navbar ul li{
	padding: 7px 16px;
}

.dropdown-menu-navbar ul li:nth-child(1){
	margin-top: -2px;
}

.dropdown-menu-navbar ul li:nth-last-child(1){
	margin-bottom: 8px;
}

.dropdown-menu-navbar ul li:hover{
	background-color: #088b8c;
}

.dropdown-menu-navbar p{
  font-size: 16px;
}

/*****************************************************************
	RESPONSIVE
*****************************************************************/

.navbar-float-menu-left-burger {
	margin-left: 15px;
	display: none;
}

.navbar-float-menu-left-burger svg {
	width: 30px;
	height: auto;
}

.navbar-float-menu-left-burger-outside {
	display: none;
	background-color: rgba(36,47,66,0.7098);
	z-index: 42;
}

@media (min-width: 0px) and (max-width: 900px) {
	nav {
		padding-left: 0px;
	}

	.navbar-float-menu-left {
		margin-left: 60px;
	}

	.navbar-float-menu-left .navbar-action{
		    width: 60px;
	}

	.navbar-float-menu-left-burger {
		display: flex;
	}

	.logo-pikomit-pantheon {
		position: absolute;
		left: 25px;
	}
	
	.navbar-avatar{
		margin-right: 15px;
	}

	.navbar-float-menu-rigth button{
		display: none;
	}

	.bar-bottom-navbar{
		display: none;
	}
	
	.dropdown-menu-navbar{
		right: 10px;
	}
}

@media (min-width: 0px) and (max-width: 600px) {
	.register-login-mobile{
		position: fixed;
		top: unset;
		bottom: 0px;
		width: 100%;
		border-top: 2px solid #00000047;
	}
	.register-login-mobile div{
		width: 50%;
	}
}

</style>
