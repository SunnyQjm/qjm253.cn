import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Index from '@/components/Index'
import Chat from '@/components/Chat'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/chat',
      name: 'chat',
      component: Chat
    }, {
      path: '/',
      name: 'index',
      component: Index
    }
  ],
  mode: 'history'

})
