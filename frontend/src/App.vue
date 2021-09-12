<template>
  <div id="app">
    <div id="nav">
      <div class="logo">
        <img class="logo__img" src="./assets/logo.png" alt="logo Groupomania" />
        <h1 class="logo__title">Groupomania</h1>
      </div>
      <div class="nav__links">
        <router-link to="/">Home</router-link> |
        <span v-if="isAuthenticated"><router-link to="/submit">New post</router-link> | </span>
        <span v-if="isAuthenticated">{{userName}} | </span>
        <span v-if="!isAuthenticated"><router-link to="/login">Login</router-link> | </span>
        <span v-else><button @click="logoutUser">Logout</button></span>
      </div>
    </div>
    <main class="main">
      <router-view/>
    </main>
  </div>
</template>

<script>
export default {
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

$primary-color: #091f43;
$secondary-color: #d1515a;
$bg-color: #d8d8d8;

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $primary-color;
  background: #d8d8d8;
}

h1 {
  margin: 0;
}

#nav {
  padding: 20px;
  background: $primary-color;
  color: white;
  display: flex;
  justify-content: space-between;
  .logo {
    display: flex;
    &__img {
        height: 40px;
        width: 40px;
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
}

</style>
