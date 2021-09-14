<template>
  <div id="app">
    <div id="nav">
      <div class="logo">
        <img class="logo__img" src="./assets/logo.png" alt="logo Groupomania" />
        <h1 class="logo__title">Groupomania</h1>
      </div>
      <div class="nav__links">
        <router-link to="/">Accueil</router-link>
        <router-link v-if="isAuthenticated" to="/submit">Créer un post</router-link>
        <div v-if="isAuthenticated" class="menu__summary">{{userName}}
          <ul class="menu__detail">
            <li @click="showModal = true">Supprimer le compte</li>
            <li @click="logoutUser">Se déconnecter</li>
          </ul>
        </div>
        <router-link v-if="!isAuthenticated" to="/login">Se connecter</router-link>
      </div>
    </div>
    <div id="top"></div>
    <Modal 
      v-if="showModal"
      @close="showModal = false"
      v-on:confirm="deleteUser"
    ></Modal>
    <main class="main">
      <router-view/>
    </main>
  </div>
</template>

<script>
import { authAxios } from './functions/axios'
import Modal from '@/components/Modal.vue'
export default {
  data: function() {
    return {
      showModal: false
    }
  },
  components: {
    Modal
  },
  created(){
      document.title = "Groupomania - Accueil"
  },
  computed: {
    isAuthenticated() {
        return this.$store.getters.isAuthenticated;
      },
    userName() {
        return this.$store.getters.user.name;
      },
  },
  methods: {
    logoutUser() {
      this.$store.dispatch('logOut')
      this.$router.push("/login");
    },
    deleteUser() {
      // récupéation du token depuis le store vuex
      authAxios.defaults.headers.common["Authorization"] = 'Bearer ' + this.$store.getters.user.token;
      authAxios.delete('users/' + this.$store.getters.user.id)
      .then(response => {
        console.log(response)
      })
      // si une erreur est retournée, elle est restituée sur la page et on force la déconnexion
      .catch(error => {
        console.log(error)
      })
      this.showModal = false;
      this.$store.dispatch('logOut');
      this.$router.push("/login");
    }
  }
}
</script>

<style lang="scss">

@import './assets/variables.scss';

html {
  box-sizing: border-box;
}

*, *:before, *:after {
  box-sizing: inherit;
}

body {
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $primary-color;
  background: $bg-color;
}

button,
input,
optgroup,
select,
textarea {
  border: none;
  background-color: transparent;
  font-family: inherit;
  padding: 0;
}

h1, h2, h3 {
  margin: 0;
}

.button {
  display: inline-block;
  padding: 12px 30px;
  width: 60%;
  text-decoration: none;
  background-color: $primary-color;
  color: white;
  font-size: 1em;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &--secondary {
    background-color: $secondary-color;
  }
}

#top {
  padding-top: 80px;
}

#nav {
  // overflow: hidden;
  position: fixed;
  top: 0;
  width: 100%;
  margin:auto;
  box-shadow: 0px 4px 4px 0px rgba(0,0,0,0.25);
  z-index: 1;
  padding: 20px;
  background: $primary-color;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .logo {
    display: flex;
    user-select: none;
    &__img {
        height: 40px;
        width: 40px;
        margin-right: 10px;
    }
  }
  a {
    font-weight: bold;
    color: white;

    &.router-link-exact-active {
      color: $secondary-color;
    }
  }
}

.nav__links {
  display: flex;
  justify-content: space-between;
}

.nav__links > * {
  width: 110px;
  text-align: center;
}

.menu__summary {
  position: relative;
  user-select: none;
  border-radius: 5px 5px 0 0;
  transition: all 0.3s ease-out;
}

.menu__detail {
  position: absolute;
  visibility: hidden;
  opacity: 0;
  right: 0;
  padding: 5px;
  background: $secondary-color;
  cursor: pointer;
  text-align: center;
  font-weight: 300;
  font-size: 0.9em;
  border-radius: 0 0 5px 5px;
  transition: all 0.3s ease-out;
}

.menu__detail > * {
  margin: 10px 0;
}

.menu__summary:hover {
  background: $secondary-color;
}

.menu__summary:hover .menu__detail {
  visibility: visible;
  opacity: 1;
}

.menu__detail > *:hover {
  font-weight: 700;
}

.main {
  position: relative;
  margin:auto;
  min-height: 100vh;
  padding: 20px 0;
}

</style>
