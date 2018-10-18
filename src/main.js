// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {
  Button, Input, Card
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'animate.css'
import VueParticles from 'vue-particles'

Vue.config.productionTip = false
Vue.use(Button)
Vue.use(Input)
Vue.use(Card)
Vue.use(VueParticles)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  mounted: function () {
    try {
      document.body.removeChild(document.getElementById('appLoading'))
    } catch (e) {
    }
  }
})
