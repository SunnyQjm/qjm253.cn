<template>
  <div id="chat-body" class="animated bounceIn">
    <h1>简易聊天室</h1>
    <el-card class="box-card animated" v-show="!identified">
      <el-input v-model="chat_flag_name" placeholder="nickname"></el-input>
      <el-input v-model="chat_flag_room" placeholder="room number" style="margin-top: 20px"></el-input>
      <el-button type="primary" style="margin-top: 20px" @click="onInputUserInfo">确定</el-button>
    </el-card>
    <div id="chat-body-chat" v-show="identified" class="clearfix animated bounceIn">
      <div id="chat-body-chat-content">
        <ul id="chat-body-chat-content-messages">
          <li class="animated fadeInRight" v-for="message in messages" :key="message.time">
            <ChatItem :content="message.msg" :nick-name="message.nickname" :avatar-background-color="message.color"
                      v-show="message.isChatMessage"/>
            <p id="chat-body-chat-content-system-info" v-show="!message.isChatMessage">
              {{message.content}}
            </p>
          </li>
        </ul>
      </div>
      <div id="chat-body-chat-send-body">
        <form action="" @submit.prevent="onSubmit">
          <el-input id="chat-body-chat-send-input" autocomplete="off" v-model="sendMsg"/>
          <el-button id="chat-body-chat-send-button" @click="onSubmit">发送</el-button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import ChatItem from '@/components/ChatItem'
import io from 'socket.io-client'

function getHashCode (str) {
  let hash = 0
  let i
  let chr
  if (str.length === 0) return hash
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + chr
    hash |= 0 // Convert to 32bit integer
  }
  return hash
}

const socket = io('https://qjm253.cn', {
  path: '/api/chat/socket.io'
})

const vue = {
  name: 'Chat',
  data: function () {
    return {
      messages: [],
      sendMsg: '',
      chatBodyStyle: {},
      chat_flag_name: 'Anonymous',
      chat_flag_room: 'World',
      identified: false,
      colors: [
        '#B3DBD3',
        '#7DDAE8',
        '#82B6D3',
        '#FED5CF',
        '#E7A5F7',
        '#B8D397',
        '#20A57A',
        '#85FC8B',
        '#D600D7',
        '#DA3561',
        '#FF9E60',
        '#FBB2A4',
        '#FF8585',
        '#E4002F'
      ]
    }
  },
  components: {
    ChatItem
  },
  methods: {
    addMsg: function (msg) {
      this.messages.push(msg)
    },
    onSubmit: function (e) {
      socket.emit('CHAT_MSG', {
        content: this.sendMsg,
        nickname: this.chat_flag_name,
        room: this.chat_flag_room
      })
      this.sendMsg = ''
      return false
    },
    _isMobile: function () {
      return navigator.userAgent
        .match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
    },
    onInputUserInfo: function () {
      if (!!this.chat_flag_name && !!this.chat_flag_room) {
        this.identified = true
        socket.emit('JOIN_ROOM', {
          room_num: this.chat_flag_room,
          nickname: this.chat_flag_name
        })
      } else {
        this.$message.warning('请输入昵称和房间号~')
      }
    },
    getColor: function (nickname) {
      let mod = getHashCode(nickname) % this.colors.length
      while (mod < 0) {
        mod += this.colors.length
      }
      return this.colors[mod]
    }
  },
  watch: {
    messages: function () {
      this.$nextTick(() => {
        const div = document.getElementById('chat-body-chat-content-messages')
        div.scrollTop = div.scrollHeight - 10
      })
    }
  },
  mounted: function () {
    const that = this
    socket.on('CHAT_MSG', function (msg) {
      console.log('receive: ' + msg)
      that.addMsg({
        msg: msg.content,
        nickname: msg.nickname,
        time: msg.time,
        color: that.getColor(msg.nickname),
        isChatMessage: true
      })
    })
    // 新节点加入
    socket.on('PEER_CONNECTED', function (msg) {
      that.addMsg({
        ...msg,
        time: Date.now(),
        content: `Welcome ${msg.nickname} join this room~~`,
        isChatMessage: false
      })
    })
    // 节点退出
    socket.on('PEER_DISCONNECTED', function (msg) {
      that.addMsg({
        ...msg,
        time: Date.now(),
        content: `${msg.nickname} leave this room~~`,
        isChatMessage: false
      })
    })
    // 进入房间的欢迎信息
    socket.on('HELLO_MSG', function (msg) {
      that.addMsg({
        time: Date.now(),
        content: `Welcome to this room, there are ${msg.count} people in this room~`
      })
    })
    if (this._isMobile()) {
      this.chatBodyStyle = {
        width: '100%'
      }
    } else {
      this.chatBodyStyle = {
        width: '500px'
      }
    }
  }
}

export default vue
</script>

<style scoped>
  #chat-body {
    width: 100%;
    color: white;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  #chat-body h1 {
    padding: 10px;
    margin: 0;
    flex-grow: 0;
  }

  #chat-body-chat {
    background-color: white;
    display: flex;
    flex-direction: column;
  }

  #chat-body-chat-content ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    text-align: left;
  }

  #chat-body-chat-content ul li {
    padding: 5px 10px;
  }

  #chat-body-chat-content-system-info {
    text-align: center;
    color: #B3DBD3;
  }

  p {
    margin: 0;
    padding: 0;
  }

  #chat-body-chat-send-body {
    width: 100%;
    flex-grow: 0;
  }

  #chat-body-chat-send-body form {
    width: 100%;
    height: 100%;
    display: flex;
  }

  #chat-body-chat-send-input {
    height: 100%;
    border: 0;
    padding: 10px;
    flex-grow: 1;
  }

  #chat-body-chat-send-button {
    flex-grow: 0;
    font-size: 1.2em;
    padding: 10px 20px;
    background-color: cornflowerblue;
    color: white;
  }

  /**
   * 手机
   */
  @media only screen and (max-width: 500px) {
    #chat-body h1 {
      background: #7DDAE8;
      color: gray;
      width: 100%;
    }
    #chat-body-chat {
      height: 0;
      max-height: 100vh;
      flex-grow: 1;
    }
    #chat-body-chat-content {
      background-color: grey;
      height: 0;
      flex-grow: 1;
    }
  }

  /*电脑*/
  @media only screen and (min-width: 501px) {

    #chat-body-chat {
      background-color: white;
      width: 500px;
      height: 80vh;
      border-radius: 5px;
    }

    #chat-body-chat-content {
      background-color: grey;
      height: 90%;
      flex-grow: 1;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
    }
  }

</style>
