<template>
  <form
    @submit.prevent="registerUser"
  >
    <input
      type="text"
      id="username"
      placeholder="Nom d'utilisateur"
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
      placeholder="Mot de passe"
      v-model="login.password"
    />
    <p>
      Vous avez déjà un compte? Cliquez 
      <router-link to="/login">ici</router-link> pour vous connecter
    </p>
    <!-- Sign in button -->
    <button type="submit">
      Créer un compte
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