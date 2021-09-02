<template>
  <form
    @submit.prevent="registerUser"
  >
    <input
      type="text"
      id="username"
      placeholder="Username"
      v-model="login.username"
    />
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
      Do have an account? Click
      <router-link to="/login"> here </router-link> to log in
    </p>
    <!-- Sign in button -->
    <button type="submit">
      Sign up
    </button>
  </form>
</template>

<script>
const API_URL = "http://localhost:3000/api/auth";
export default {
  name: 'Register',
  data() {
    return {
      login: {
        username: "",
        email: "",
        password: ""
      }
    };
  },
  methods: {
    async registerUser() {
      fetch(API_URL + '/signup', {
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
          this.loginUser();
        });
    },
    async loginUser() {
      fetch(API_URL + '/login', {
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