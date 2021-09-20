<template>
  <div id="nav">
    <div class="logo">
      <img class="logo__img" src="./assets/logo.png" alt="logo Groupomania" />
      <h1 class="logo__title">Groupomania</h1>
    </div>
    <div class="nav__links">
      <router-link v-if="isAuthenticated" to="/">Accueil</router-link>
      <router-link v-if="isAuthenticated" to="/submit"
        >Créer un post</router-link
      >
      <div v-if="isAuthenticated" class="menu__summary" @click="openClose">
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
      console.log(this.isOpen)
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

#top {
  padding-top: 80px;
}

#nav {
  // overflow: hidden;
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
  .logo {
    display: flex;
    user-select: none;
    &__img {
      height: 40px;
      width: 40px;
      margin-right: 10px;
    }
    @media (max-width: 599px) {
      padding: 5px 0;
    }
  }
  a {
    font-weight: bold;
    color: white;
    &.router-link-exact-active {
      color: $secondary-color;
    }
  }
  @media (max-width: 599px) {
    flex-direction: column;
    padding: 0;
    a {
      font-weight: bold;
      color: white;
      &.router-link-exact-active {
        color: $primary-color;
      }
    }
  }
}

.nav__links {
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 599px) {
    background: $secondary-color;
    width: 100%;
    padding: 5px 0;
  }
}

.nav__links > * {
  width: 110px;
  padding: 5px 0;
  text-align: center;
}

.menu__summary {
  position: relative;
  user-select: none;
  border-radius: 5px;
  transition: all 0.3s ease-out;
}

.menu__detail {
  position: absolute;
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

.menu__summary:focus {
  background: $secondary-color;
}

.menu__summary:focus .menu__detail {
  visibility: visible;
  opacity: 1;
}

.menu__detail > *:focus {
  font-weight: 700;
}
</style>
