<template>
  <div id="app">

    <comp-header/>
    <router-view/>
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
  @import './css/colors.css';
  @import './css/font.css';
  @import './css/global.css';
</style>
