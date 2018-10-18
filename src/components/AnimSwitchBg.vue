<template>
    <img class="anim-switch-bg-body animated fadeIn" :src="imgs[currentImgIndex]" :key='currentImgIndex'/>
</template>

<script>
export default {
  name: 'AnimSwitchBg',
  props: {
    currentImgIndex: {
      type: Number,
      default: 0
    },
    imgs: {
      type: Array,
      default: function () {
        return ['https://desk-fd.zol-img.com.cn/t_s960x600c5/g5/M00/02/03/ChMkJ1bKxmyIKUHDAATEC3RxgxAAALHlAEV3FUABMQj318.jpg',
          'http://img1.3lian.com/2015/w7/90/d/3.jpg'
        ]
      }
    },
    changeTime: {
      type: Number,
      default: 5000
    }
  },
  data () {
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
    }, this.changeTime)
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
    object-fit: cover;
  }
</style>
