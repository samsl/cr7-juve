import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { library } from '@fortawesome/fontawesome-svg-core'
import {fas} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Vuex from 'vuex'
import store from './store/index'

library.add(fas)
Vue.use(VueAxios, axios);

Vue.use(require('vue-moment'));
Vue.component('font-awesome-icon', FontAwesomeIcon)
import App from './App'
import router from  './router/index'

new Vue({
  el: '#app',
  store,
  router,
  created(){
  	this.$store.dispatch('getVideos');
  },
  render: h => h(App)
})
