<template>
  <form
    @submit.prevent="loginUser"
  >
    <input
      type="text"
      id="email"
      placeholder="Email"
      v-model="login.email"
    />
    <!-- Password -->
    <input
      type="password"
      id="password"
      placeholder="Password"
      v-model="login.password"
    />
    <p>
      Dont have an account? Click
      <router-link to="/register"> here </router-link> to sign up
    </p>
    <!-- Sign in button -->
    <button type="submit">
      Sign in
    </button>
  </form>
</template>

<script>
// const API_URL = "http://localhost:3000/api/auth/login";
export default {
  name: 'Login',
  data() {
    return {
      login: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    async loginUser() {
      await this.$store.dispatch('authenticate', JSON.stringify(this.login));
      this.$router.push('/');
    }
  }
};
</script>