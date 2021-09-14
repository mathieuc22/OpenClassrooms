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
import { authAxios } from '../functions/axios'
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
      try {
        await authAxios.post('/signup', JSON.stringify(this.login))
        .then(response => {
          console.log(response)
        });
        await this.$store.dispatch('authenticate', JSON.stringify(this.login));
        this.$router.push('/');
      } catch (error) {
        console.log(error);
      }
    },
  }
};
</script>