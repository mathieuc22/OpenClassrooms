import { createStore } from "vuex";

const API_URL = "http://localhost:3000/api/posts";
const AUTH_URL = "http://localhost:3000/api/auth/login";

const store = createStore({
  state: {
    posts: [],
    token: localStorage.getItem('user') || '',
    status: '',
  },
  getters: {
    posts: (state) => {
      return state.posts;
    },
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status,
  },
  mutations: {
    SET_ITEMS(state, posts) {
      state.posts = posts;
    },
    AUTH_SUCCESS(state, token) {
      state.status = 'success'
      state.token = token
    },
    AUTH_LOGOUT(state) {
      state.status = 'logged out'
      state.token = ''
    },
  },
  actions: {
    async authenticate({ commit }, user) {
      try {
        const response = await fetch(AUTH_URL, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: user,
        })
        const data = await response.json()
        const token = data.token
        localStorage.setItem("user", token);
        commit("AUTH_SUCCESS", token);
      } catch (error) {
        console.log(error);
      }
    },
    async loadPosts({ commit }) {
      try {
        const bearer = localStorage.getItem("user");
        const response = await fetch(API_URL, {
          headers: {
            'Authorization': 'Bearer ' + bearer,
          }})
        const data = await response.json()
        commit("SET_ITEMS", data.posts);
      } catch (error) {
        console.log(error);
      }
    },
    logOut({ commit }) {
      localStorage.removeItem("user");
      commit("AUTH_LOGOUT");
    },
  },
});

export default store;
