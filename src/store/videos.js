import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'

Vue.use(Vuex)
export default new Vuex.Store({
	state:{
		videos: [] 
	},
	mutations:{
		updateVideos(state, videos){
			state.videos = videos;
		}	
	},	
	actions:{
		getVideos({commit}) {
			axios.get("/api/videos").then(response=>{
                commit('updateVideos', response.data);                
            }).catch(error=>{
                console.log(error);
            });
		}
	}
})