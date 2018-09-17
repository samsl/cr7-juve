import Vue from 'vue'
import axios from 'axios'

export default{
	state:{
		videos: [] 
	},
	getters:{
		videos: state => state.videos
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
}