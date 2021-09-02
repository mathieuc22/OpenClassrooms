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
const API_URL = "http://localhost:3000/api/auth/login";
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
      fetch(API_URL, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.login),
        })
        .then(response => response.json())
        .then(result => {
          localStorage.setItem("user", result.token);
          this.$router.push("/");
        });
    }
  }
};
</script>