<template>
  <div id="demo-index">
    <!--<div id="bg">-->
    <!--<AnimSwitchBg></AnimSwitchBg>-->
    <!--</div>-->
    <div id="demo-index-content">
      <BigCircleImage :img-src="require('../assets/logo.png')" :size="120" :padding="30" background-color="white"/>
      <h1 id="demo-index-name" class="animated zoomIn">MingJ | 阙建明</h1>
      <span id="demo-index-description" class="animated fadeIn" >每一个不曾起舞的日子都是对生命的辜负~</span>
      <p id="friend-links" class="animated fadeIn">
        <a href="https://github.com/SunnyQjm" >
          <BigCircleImage :img-src="require('../assets/github.png')" :size="30" :padding="10" background-color="white"/>
        </a>
        <a href="https://blog.qjm253.cn">
          <BigCircleImage :img-src="require('../assets/wordpress.png')" :size="30" :padding="10"
                          background-color="white"/>
        </a>
        <a href="https://www.jianshu.com/u/d8e0ad691736">
          <BigCircleImage :img-src="require('../assets/jian_shu.png')" :size="30" :padding="10"
                          background-color="white"/>
        </a>
        <a href="https://blog.csdn.net/qq_33215972">
          <BigCircleImage :img-src="require('../assets/csdn.png')" :size="30" :padding="10" background-color="white"/>
        </a>
        <a href="https://sunnyqjm.github.io/">
          <BigCircleImage :img-src="require('../assets/hexo.png')" :size="30" :padding="10" background-color="white"/>
        </a>
        <router-link to="/chat">
          <BigCircleImage :img-src="require('../assets/chat.png')" :size="30" :padding="10" background-color="white"/>
        </router-link>
      </p>
    </div>
  </div>
</template>

<script>
import AnimSwitchBg from '@/components/AnimSwitchBg'
import BigCircleImage from '@/components/BigCircleImage'
import vueCanvasNest from 'vue-canvas-nest'

export default {
  name: 'Index',
  components: {
    BigCircleImage,
    AnimSwitchBg,
    vueCanvasNest
  },
  mounted: function () {
  }
}
</script>

<style scoped>
  #demo-index {
    width: 100%;
    height: 100vh;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #bg {
    position: fixed;
    z-index: -1;
    opacity: 0.2;
    width: 100%;
    height: 100%;
    background-color: darkgray;
  }

  #friend-links {
    margin-top: 30px;
  }

  #friend-links a {
    margin: 10px;
  }

  #demo-index-content {
    z-index: 10;
  }

  #demo-index-description {
  }

</style>
