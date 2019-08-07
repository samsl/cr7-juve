import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'
import video from './modules/video'
import auth from './modules/auth'
import season from './modules/season'

Vue.use(Vuex)
export default new Vuex.Store({
	modules:{
		video,
		auth,
		season
	}
})