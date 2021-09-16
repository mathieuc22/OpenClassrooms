<template>
  <div class="section">
    <form class="formulaire" @submit.prevent="registerUser">
      <h1>Créer un compte</h1>
      <div class="formulaire__fieldline">
        <p>
          <label for="username">Nom d'utilisateur</label>
          <input
            type="text"
            id="username"
            placeholder="Jean"
            class="formulaire__input"
            v-model="login.username"
            required
          />
        </p>
      </div>
      <div class="formulaire__fieldline">
        <p>
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="jean@groupomania.fr"
            class="formulaire__input"
            v-model="login.email"
            required
          />
        </p>
      </div>
      <div class="formulaire__fieldline formulaire__fieldline--center">
        <p>
          <label for="password">Mot de passe</label>
          <!-- Password -->
          <input
            type="password"
            id="password"
            placeholder="Mot de passe"
            class="formulaire__input"
            v-model="login.password"
            required
          />
        </p>
      </div>
      <div class="formulaire__fieldline formulaire__fieldline--center">
        <!-- Sign in button -->
        <button class="button button--secondary" type="submit" aria-label="Créer un compte">
          Créer un compte
        </button>
      </div>
    </form>
    <small>
      Vous avez déjà un compte? Cliquez
      <router-link to="/login">ici</router-link> pour vous connecter
    </small>
  </div>
  <Error v-if="errorMessage" :message="errorMessage" :status="errorStatus"></Error>
</template>

<script>
import Error from '../components/Error.vue';
import { authAxios } from "../functions/axios";
export default {
  name: "Register",
  components: { Error },
  data() {
    return {
      errorMessage: "",
      login: {
        username: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async registerUser() {
      try {
        await authAxios
          .post("/signup", JSON.stringify(this.login))
          .then((response) => {
            console.log(response);
          });
        await this.$store.dispatch("authenticate", JSON.stringify(this.login));
        this.$router.push("/");
      } catch (error) {
        if (error.response) {
          this.errorMessage = error.response.data.error.errors[0].message;
        } else {
          this.errorMessage = error;
        }
      }
    },
  },
};
</script>