import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'
import video from './modules/video'
import auth from './modules/auth'

Vue.use(Vuex)
export default new Vuex.Store({
	modules:{
		video,
		auth
	}
})