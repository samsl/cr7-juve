import Vue from 'vue'
import axios from 'axios'

export default {
  state: {
    auth: null,
    error:'',
  },
  mutations: {
    login(state, data) {
      state.auth = data.username;
    },
    authError(state, data){
    	state.error = data;
    },
    logout(state) {
      state.auth = null;
    }
  },
  getters: {
    authUser: state => state.auth,
    error: state => state.error
  },
  actions: {
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        axios.post("/api/auth", user).then(response => {
          commit('login', response.data);
          resolve(response);
        }).catch(error => {
          console.log(error);
          commit('authError', error.response.data);
          reject(error);
        });

      })

    }
  }
}
