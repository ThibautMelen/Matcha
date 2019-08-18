<template>
  <div id="app">

    <comp-header v-if="!this.$store.state.loading" :userInfos="this.$store.state.user"/>
    <router-view v-if="!this.$store.state.loading" :userInfos="this.$store.state.user"/>
    <!-- <comp-footer/> -->

  </div>
  
</template>

<script>
import compHeader from  './components/Header-Footer/Header'
import compFooter from  './components/Header-Footer/Footer'

export default {
  components:{
    compHeader,
    compFooter
  }
}

</script>

<style>
  /* @import './css/colors.css'; */
  @import './css/global.css';
</style>
