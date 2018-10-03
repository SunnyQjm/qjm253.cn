<template>
  <transition name="custom-classes-transition"
              enter-active-class="animated fadeInLeft"
              leave-active-class="animated fadeOutRight"
              mode="out-in">
    <img class="anim-switch-bg-body" :src="imgs[currentImgIndex]" :key="currentImgIndex"/>
  </transition>
</template>

<script>
export default {
  name: 'AnimSwitchBg',
  data () {
    return {
      imgs: ['https://desk-fd.zol-img.com.cn/t_s960x600c5/g5/M00/02/03/ChMkJ1bKxmyIKUHDAATEC3RxgxAAALHlAEV3FUABMQj318.jpg',
        'http://img1.3lian.com/2015/w7/90/d/3.jpg'],
      currentImgIndex: 0
    }
  },
  computed: {},
  methods: {
    nextBg: function () {
      this.currentImgIndex = (this.currentImgIndex + 1) % this.imgs.length
    }
  },
  mounted: function () {
    setInterval(() => {
      this.nextBg()
    }, 5000)
  }
}
</script>

<style scoped>
  .anim-switch-bg-body {
    width: 100%;
    height: 100vh;
  }

  img {
    height: 100vh;
  }
</style>
