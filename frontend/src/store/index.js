import { createStore } from "vuex";
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/api/posts';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
const AUTH_URL = "http://localhost:3000/api/auth/login";

const store = createStore({
  state: {
    user: JSON.parse(localStorage.getItem('user')) || '',
    posts: [],
    post: {},
    loading: 0
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
    startLoading(state) {
      state.loading += 1;
    },
    stopLoading(state) {
      state.loading -= 1;
    },
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
        const response = await axios.post(AUTH_URL, user);
        const data = response.data;
        const userInfo = { id: data.userId, name: data.userName, token: data.token };
        localStorage.setItem("user", JSON.stringify(userInfo));
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.token;
        commit("AUTH_SUCCESS", userInfo);
      } catch (error) {
        console.log(error);
      }
    },
    async loadPosts({ commit, state }) {
      try {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + state.user.token;
        const response = await axios.get();
        commit("SET_ITEMS", response.data.posts);
      } catch (error) {
        console.log(error);
      }
    },
    async loadPost({ commit, state }, id) {
      try {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + state.user.token;
        const response = await axios.get('/' + id);
        commit('SET_ITEM', response.data.post);
        return response.data.post;
      } catch (error) {
        console.log(error);
      }
    },
    logOut({ commit }) {
      localStorage.removeItem("user");
      axios.defaults.headers.common['Authorization'] = '';
      commit("AUTH_LOGOUT");
    },
  },
});

export default store;
