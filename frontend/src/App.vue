<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <span v-if="isAuthenticated"><router-link to="/submit">New post</router-link> | </span>
      <span v-if="isAuthenticated">{{userName}} | </span>
      <span v-if="!isAuthenticated"><router-link to="/login">Login</router-link> | </span>
      <span v-else><button @click="logoutUser">Logout</button> | </span>
      <router-link to="/about">About</router-link>
    </div>
    <h1>Groupomania</h1>
    <router-view/>
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
