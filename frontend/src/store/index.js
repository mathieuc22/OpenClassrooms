import { createStore } from "vuex";
import { postAxios, authAxios } from '../functions/axios'

const store = createStore({
  state: {
    user: JSON.parse(localStorage.getItem('user')) || '',
    posts: [],
    post: {},
    errorMessage: '',
    errorStatus: '',
    loading: 0
  },
  getters: {
    user: (state) => state.user,
    errorMessage: (state) => state.errorMessage,
    errorStatus: (state) => state.errorStatus,
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
      state.user = userInfo,
      state.errorMessage = '',
      state.errorStatus = ''
    },
    AUTH_ERROR(state, errorInfo) {
      state.errorMessage = errorInfo.message,
      state.errorStatus = errorInfo.status
    },
    AUTH_LOGOUT(state) {
      state.user = ''
    },
  },
  actions: {
    async authenticate({ commit }, user) {
      try {
        const response = await authAxios.post('login', user);
        const data = response.data;
        const userInfo = { id: data.userId, name: data.userName, moderator: data.moderator, token: data.token };
        localStorage.setItem("user", JSON.stringify(userInfo));
        commit("AUTH_SUCCESS", userInfo);
        return 'AUTH_SUCCESS';
      } catch (error) {
        // récupération d'un message d'erreur personnalisé ou du message brut
        if (error.response) {
          const errorInfo = { message: error.response.data.message || error.response.data.error, status: error.response.status };
          commit("AUTH_ERROR", errorInfo);
        } else {
          commit("AUTH_ERROR", error);
        }
        throw 'AUTH_ERROR ';
      }
    },
    async loadPosts({ commit, state }) {
      try {
        postAxios.defaults.headers.common['Authorization'] = 'Bearer ' + state.user.token;
        const response = await postAxios.get();
        commit("SET_ITEMS", response.data.posts);
      } catch (error) {
        console.log(error);
      }
    },
    async loadPost({ commit, state }, id) {
      try {
        postAxios.defaults.headers.common['Authorization'] = 'Bearer ' + state.user.token;
        const response = await postAxios.get('/' + id);
        commit('SET_ITEM', response.data.post);
        return response.data.post;
      } catch (error) {
        console.log(error);
      }
    },
    logOut({ commit }) {
      localStorage.removeItem("user");
      postAxios.defaults.headers.common['Authorization'] = '';
      authAxios.defaults.headers.common['Authorization'] = '';
      commit("AUTH_LOGOUT");
    },
  },
});

export default store;
