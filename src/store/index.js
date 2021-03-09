import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import axios from 'axios'
import router from '../router/index'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    auth: "",
    user: "",
    error: ""
  },
  mutations: {
    auth(state, payload) {
      state.auth = payload;
    },
    user(state, payload) {
      state.user = payload;
    },
    logout(state, payload) {
      state.auth = payload;
    },
    error(state, payload) {
      state.error = payload;
    }
  },
  actions: {
    async login({ commit }, { email, password }) {
      const responseLogin = await axios.post(
        process.env.VUE_APP_SKATE_MAPS_API + "/api/login",
        {
          email: email,
          password: password
        }
      )
      console.log(responseLogin);
      commit("error", responseLogin.data.message);
      const responseUser = await axios.get(
        process.env.VUE_APP_SKATE_MAPS_API + "/api/user",
        {
          params: {
            email: email
          }
        }
      )
      console.log(responseUser.data.data[0]);
      commit("auth", responseLogin.data.auth);
      commit("user", responseUser.data.data[0]);
      router.replace("/mymap/" + this.state.user.id);
    },
    logout({ commit }) {
      axios
        .post(process.env.VUE_APP_SKATE_MAPS_API + "/api/logout", {
          auth: this.state.auth
        })
        .then((response) => {
          console.log(response);
          commit("logout", response.data.auth);
          router.replace("/");
        })
        .catch((error) => {
          console.log(error);
        })
    },
    async updateUserData({ commit }, { email }) {
      const responseUser = await axios.get(
        process.env.VUE_APP_SKATE_MAPS_API + "/api/user", {
          params: {
            email: email
          }
        }
      )
      console.log(responseUser.data.data[0]);
      commit("user", responseUser.data.data[0]);
      router.replace("/mymap/" + this.state.user.id);
    },
    clear({commit}) {
      commit("error", '');
    }
  },
  modules: {
  }
})
