import { createStore } from "vuex";

const API_URL = "http://localhost:3000/api/posts";
const AUTH_URL = "http://localhost:3000/api/auth/login";

const store = createStore({
  state: {
    user: JSON.parse(localStorage.getItem('user')) || '',
    posts: [],
    post: '',
  },
  getters: {
    user: (state) => state.user,
    posts: (state) => {
      return state.posts;
    },
    post: (state) => {
      return state.post;
    },
    isAuthenticated: state => !!state.user,
  },
  mutations: {
    SET_ITEMS(state, posts) {
      state.posts = posts;
    },
    SET_ITEM(state, post) {
      state.post = post;
    },
    AUTH_SUCCESS(state, userInfo) {
      state.user = userInfo
    },
    AUTH_LOGOUT(state) {
      state.user = ''
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
        const data = await response.json();
        const userInfo = { id: data.userId, name: data.userName, token: data.token };
        localStorage.setItem("user", JSON.stringify(userInfo));
        commit("AUTH_SUCCESS", userInfo);
      } catch (error) {
        console.log(error);
      }
    },
    async loadPosts({ commit, state }) {
      try {
        const response = await fetch(API_URL, {
          headers: {
            'Authorization': 'Bearer ' + state.user.token,
          }})
        const data = await response.json()
        commit("SET_ITEMS", data.posts);
      } catch (error) {
        console.log(error);
      }
    },
    async loadPost({ commit, state }, id) {
      try {
        const response = await fetch(API_URL + '/' + id, {
          headers: {
            'Authorization': 'Bearer ' + state.user.token,
          }})
        const data = await response.json()
        commit("SET_ITEM", data.post);
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
