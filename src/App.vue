<template>
  <div id="app">
    <Header/>
    <Footer/>
  </div>
</template>

<script>
// b1: import vào

import Header from './components/ComHeader.vue'

import Footer from './components/ComFooter.vue'
export default {
  name: 'App',
  components: {

    Header,
    Footer,
 
  }
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    width: 100%;
    box-sizing: border-box;
}



</style>
