import Vue from 'vue'
import axios from 'axios'

export default{
	state:{
		trophies: [] 
	},
	getters:{
		trophies: state => state.trophies
	},
	mutations:{
		updateTrophies(state, trophies){
			state.trophies = trophies;
		}	
	},	
	actions:{
		getTrophies({commit}) {
			axios.get("/api/trophies").then(response=>{
                commit('updateTrophies', response.data);                
            }).catch(error=>{
                console.log(error);
            });
		}
	}
}