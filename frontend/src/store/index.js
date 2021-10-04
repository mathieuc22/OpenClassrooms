import { createStore } from "vuex";
import { postAxios, authAxios } from '../functions/axios'

const store = createStore({
  state: {
    // Définition des états
    user: JSON.parse(localStorage.getItem('user')) || '',
    errorMessage: '',
    errorStatus: ''
  },
  getters: {
    // Création de getters pour utiliser les états dans les composants
    isAuthenticated: state => !!state.user,
  },
  mutations: {
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
    logOut({ commit }) {
      localStorage.removeItem("user");
      postAxios.defaults.headers.common['Authorization'] = '';
      authAxios.defaults.headers.common['Authorization'] = '';
      commit("AUTH_LOGOUT");
    },
  },
});

export default store;
