<template>
  <div id="app">
    <div id="particle-effect">
      <vue-particles>
      </vue-particles>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    width: 100%;
    height: 500px;
  }
  #particle-effect{
    position: absolute;
    /*z-index: -1;*/
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: #272727;
  }
</style>
