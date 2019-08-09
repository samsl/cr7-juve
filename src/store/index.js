import Vuex from 'vuex'
import Vue from 'vue'
import video from './modules/video'
import auth from './modules/auth'
import trophy from './modules/trophy'
import season from './modules/season'

Vue.use(Vuex)
export default new Vuex.Store({
	modules:{
		video,
		auth,
		trophy,
		season
	}
})