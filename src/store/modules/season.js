import Vue from 'vue'
import axios from 'axios'

export default {
	state: {
		seasons: [],
		current: ''
	},
	getters: {
		seasons: state => state.seasons,
		current: state => state.current
	},
	mutations: {
		updateSeasons(state, seasons) {
			state.seasons = seasons;
		},
		updateCurrent(state, current) {
			state.current = current;
		}
	},
	actions: {
		getSeasons({ commit }) {
			axios.get("/api/seasons").then(response => {
				commit('updateSeasons', response.data);			
				let currentSeason = response.data.filter(s =>
					s.current === true
				)[0];		
				console.log("store: " + currentSeason['_id'])		
				commit('updateCurrent', currentSeason['_id']);
			}).catch(error => {
				console.log(error);
			});
		}
	}
}