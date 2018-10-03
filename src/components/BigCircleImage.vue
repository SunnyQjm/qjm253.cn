<template>
  <div :style="divStyle">
    <img :src="imgSrc" :style="imgStyle">
  </div>
</template>

<script>
export default {
  name: 'BigCircleImage',
  props: {
    imgSrc: String,
    size: {
      type: Number,
      default: 100
    },
    padding: {
      type: Number,
      default: 0
    },
    backgroundColor: {
      type: String,
      default: 'grey'
    }
  },
  data () {
    return {
      imgStyle: {},
      divStyle: {
        width: '20px'
      }
    }
  },
  methods: {
    fitImg: function () {
      const img = new Image()
      img.src = this.imgSrc
      const that = this
      img.onload = function () {
        let width = img.width
        let height = img.height
        let abs = Math.abs(width - height)
        if (width > height) {
          let ratio = abs / (2 * height)
          that.imgStyle = {
            marginLeft: `-${ratio * 100}%`
          }
        } else {
          let ratio = abs / (2 * width)
          that.imgStyle = {
            marginTop: `-${ratio * 100}%`
          }
        }
      }
    }
  },
  beforeMount () {
    this.divStyle = {
      width: `${this.size}px`,
      height: `${this.size}px`,
      padding: `${this.padding}px`,
      backgroundColor: this.backgroundColor
    }
    this.fitImg()
  }
}
</script>

<style scoped>
  img {
    width: auto;
    height: 100%;
    margin: 0 auto;
  }

  div {
    display: inline-block;
    position: relative;
    width: 100px;
    height: 100px;
    overflow: hidden;
    border-radius: 50%;
  }
</style>
