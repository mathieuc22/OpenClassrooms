<template>
  <div id="app">
    <div id="nav">
      <div class="logo">
        <img class="logo__img" src="./assets/logo.png" alt="logo Groupomania" />
        <h1 class="logo__title">Groupomania</h1>
      </div>
      <div class="nav__links">
        <router-link to="/">Accueil</router-link> |
        <span v-if="isAuthenticated"><router-link to="/submit">Créer un post</router-link> | </span>
        <span v-if="isAuthenticated">{{userName}} | </span>
        <span v-if="!isAuthenticated"><router-link to="/login">Se connecter</router-link> | </span>
        <span v-else><button @click="logoutUser">Se déconnecter</button></span>
      </div>
    </div>
    <div id="top"></div>
    <main class="main">
      <router-view/>
    </main>
  </div>
</template>

<script>
export default {
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

h1, h2, h3 {
  margin: 0;
}

#top {
    padding-top: 80px;
}

#nav {
  overflow: hidden;
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

.main {
  position: relative;
  margin:auto;
  min-height: 100vh;
  padding: 20px 0;
}

</style>
