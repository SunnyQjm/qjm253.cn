<template>
  <div id="chat-item-body" >
    <div id="chat-item-user-info">
      <BigCircleImage id="chat-item-user-info-avatar" :img-src="avatar" :size="30" :padding="10"
                      :background-color="avatarBackgroundColor"/>
      <span id="chat-item-user-info-nickname" :style="nickNameStyle">{{nickName}}</span>
    </div>
    <div id="chat-item-message-content">
      {{content}}
    </div>
  </div>
</template>

<script>
import BigCircleImage from '@/components/BigCircleImage'

export default {
  name: 'ChatItem',
  props: {
    /**
       * 头像背景
       */
    avatarBackgroundColor: {
      type: String,
      default: 'blue'
    },
    /**
       * 头像
       */
    avatar: {
      type: String,
      default: require('../assets/logo.png')
    },
    /**
       * 用户名
       */
    nickName: {
      type: String,
      default: 'Anonymous'
    },
    /**
       * 消息内容
       */
    content: {
      type: String,
      default: ''
    }
  },
  components: {
    BigCircleImage
  },
  data: function () {
    return {
      avatarStyle: {},
      nickNameStyle: {}
    }
  },
  mounted: function () {
    this.avatarStyle = {
      backgroundColor: this.avatarBackgroundColor
    }
    this.nickNameStyle = {
      color: this.avatarBackgroundColor
    }
  }
}
</script>

<style scoped>
  #chat-item-body {
    width: 100%;
    padding: 5px 10px;
  }
  #chat-item-user-info {
    display: flex;
    align-items: center;
  }
  #chat-item-user-info #chat-item-user-info-nickname {
    margin-left: 10px;
    font-size: 1.6em;
    font-weight: bold;
  }
  #chat-item-message-content {
    padding-top: 5px;
    padding-left: 60px;
    margin-right: 20px;
    color: white;
    word-break: break-all;
    word-wrap: normal;
  }
</style>
