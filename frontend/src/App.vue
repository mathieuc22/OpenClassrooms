<template>
  <div id="nav" class="nav">
    <div class="logo">
      <img class="logo__img" src="./assets/logo.png" alt="logo Groupomania" />
      <h1 class="logo__title">Groupomania</h1>
    </div>
    <div class="nav__links">
      <router-link v-if="isAuthenticated" to="/">Accueil</router-link>
      <router-link v-if="isAuthenticated" to="/submit"
        >Publier</router-link
      >
      <router-link v-if="isModerator" to="/admin"
        >Admin</router-link
      >
      <div 
        v-if="isAuthenticated"
        v-bind:class="['menu__summary', {
          'menu__summary--active': isOpen,
        }]"
        @click="openClose">
        <i class="fa fa-user"></i> {{ userName }}
        <ul class="menu__detail" v-if="isOpen">
          <li @click="showModal = true">Supprimer le compte</li>
          <li @click="logoutUser">Se déconnecter</li>
        </ul>
      </div>
      <router-link v-if="!isAuthenticated" to="/login"
        >Se connecter</router-link
      >
    </div>
  </div>
  <div id="top"></div>
  <Modal
    v-if="showModal"
    @close="showModal = false"
    v-on:confirm="deleteUser"
  ></Modal>
  <main class="main">
    <router-view />
  </main>
</template>

<script>
import { authAxios } from "./functions/axios";
import Modal from "@/components/Modal.vue";
export default {
  data: function () {
    return {
      showModal: false,
      isOpen: false
    };
  },
  components: {
    Modal,
  },
  created() {
    document.title = "Groupomania - Accueil";
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
    isModerator() {
      return this.$store.getters.user.moderator;
    },
    userName() {
      return this.$store.getters.user.name;
    },
  },
  methods: {
    logoutUser() {
      this.$store.dispatch("logOut");
      this.$router.push("/login");
    },
    deleteUser() {
      // récupéation du token depuis le store vuex
      authAxios.defaults.headers.common["Authorization"] =
        "Bearer " + this.$store.getters.user.token;
      authAxios
        .delete("users/" + this.$store.getters.user.id)
        .then((response) => {
          console.log(response);
        })
        // si une erreur est retournée, elle est restituée sur la page et on force la déconnexion
        .catch((error) => {
          console.log(error);
        });
      this.showModal = false;
      this.$store.dispatch("logOut");
      this.$router.push("/login");
    },
    openClose() {
      // Toggle between open or closed ( true || false )
      this.isOpen = !this.isOpen
    }
  },
};
</script>

<style lang="scss">
@import "./assets/variables.scss";

html {
  box-sizing: border-box;
  height: -webkit-fill-available;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

body {
  display: flex; 
  flex-direction: column;
  margin: 0;
  min-height: 100vh;
  /* mobile viewport bug fix */
  min-height: -webkit-fill-available;
}

input[type='text'],
input[type='number'],
input[type='email'],
input[type='password'],
textarea {
  font-size: 16px;
}

#app {
  flex: 1;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $primary-color;
  background: $bg-color;
  display: flex;
  flex-direction: column;
}

.main {
  position: relative;
  padding: 20px 0;
  padding-top: 80px;
  @media (max-width: 730px) {
    padding-top: 130px;
  }
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

h1,
h2,
h3 {
  margin: 0;
}

.button {
  display: inline-block;
  padding: 12px 30px;
  text-decoration: none;
  background-color: $primary-color;
  color: white;
  font-size: 1em;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: transform 0.2s;
  font-weight: 700;
  font-size: 1.2em;
  &--secondary {
    background-color: $secondary-color;
  }
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0px 2px 2px 0px rgb(0 0 0 / 30%);
  }
  &:active {
    transform: translateY(2px);
    box-shadow: 0px -2px 2px 0px rgb(0 0 0 / 30%);
  }
}

// Mixin pour la gestion des couleurs texte et fond pour le menu et les liens de la nav
@mixin color-menu {
  background: white;
  color: $primary-color;
  @media (max-width: 730px) {
    background: $primary-color;
    color: white;
  }
}

.nav {
  position: fixed;
  top: 0;
  width: 100%;
  margin: auto;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  z-index: 1;
  padding: 15px;
  background: $primary-color;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 730px) {
    flex-direction: column;
    padding: 0;
  }
  & .logo {
    display: flex;
    user-select: none;
    &__img {
      height: 40px;
      width: 40px;
      margin-right: 10px;
    }
    @media (max-width: 730px) {
      padding: 5px 0;
    }
  }
  &__links {
    display: flex;
    justify-content: space-between;
    align-items: center;
    & > * {
      text-decoration: none;
      color: white;
      width: 110px;
      padding: 5px 0;
      text-align: center;
      &:hover {
        border-radius: 5px;
        font-weight: bold;
        @include color-menu;
      }
    }
    & .router-link-exact-active {
      font-weight: bold;
      @include color-menu;
      border-radius: 5px;
    }
    @media (max-width: 730px) {
      background: white;
      color: $primary-color;
      width: 100%;
      padding: 5px 0;
      & > * {
        color: $primary-color;
      }
      &.router-link-exact-active {
        color: $primary-color;
      }
    }
  }
}

.menu {
  &__summary {
    position: relative;
    user-select: none;
    border-radius: 5px;
    transition: all 0.3s ease-out;
    cursor: pointer;
    &--active {
      @include color-menu;
    }
    &:hover {
      @include color-menu;
    }
    &:focus {
      @include color-menu;
    }
  }
  &__detail {
    position: absolute;
    top: 29px;
    right: 0;
    padding: 6px;
    @include color-menu;
    cursor: pointer;
    text-align: center;
    font-weight: 300;
    font-size: 0.9em;
    border-radius: 5px;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    transition: all 0.3s ease-out;
    & > * {
      margin: 10px 0;
    }
    & > *:hover {
      font-weight: 700;
    }
    & > *:focus {
      font-weight: 700;
    }
  }
}

</style>
