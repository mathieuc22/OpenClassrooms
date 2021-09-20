<template>
  <div class="section">
    <form
      class="formulaire"
      @submit.prevent="loginUser"
    >
      <h1>Connexion</h1>
      <div class="formulaire__fieldline">
        <p>
          <label for="email"><i class="fas fa-envelope"></i> Email</label>
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
      <div class="formulaire__fieldline">
        <p>
          <label for="password"><i class="fas fa-lock"></i> Mot de passe</label>
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
        <button class="button" type="submit" aria-label="Se connecter">
          Se connecter
        </button>
      </div>
    </form>
    <small>
      Vous n'avez pas de compte ? Cliquez 
      <router-link to="/register">ici</router-link> pour en créer un.
    </small>
  </div>
  <Error v-if="error.message" :message="error.message" :status="error.status"></Error>
</template>

<script>
import Error from '../components/Error.vue';
export default {
  name: 'Login',
  components: { Error },
  data() {
    return {
      login: {
        email: "",
        password: ""
      },
      error: {
        status: "",
        message: ""
      },
    };
  },
  computed: {
    // si une erreur survient lors de l'authentification elle est restituée
    errorMessage() {
      return this.$store.getters.errorMessage;
    },
    errorStatus() {
      return this.$store.getters.errorStatus;
    },
  },
  methods: {
    loginUser() {
      this.$store.dispatch('authenticate', JSON.stringify(this.login))
        .then((response) => {
          console.log(response)
          this.$router.push('/');
        })
        .catch((error) => {
          console.log(error)
          console.log(this.$store.getters.errorMessage)
          this.error.message = this.$store.getters.errorMessage;
          this.error.status = this.$store.getters.errorStatus;
        })
      }
  },
};
</script>

<style lang="scss">

@import '../assets/variables.scss';

.section {
    margin: auto;
    width: 400px;
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    background-color: white;
    margin-top: 20px;
    @media (max-width: 599px) {
        width: unset;
        border-radius: 0px;
    }
}

.formulaire {
  margin: auto;
  &__fieldline {
    display: flex;
    flex: auto;
    align-items: center;
    margin: 10px 0 10px 0;
    &--center {
      justify-content: center;
    }
    p {
      display: flex;
      width: 100%;
      justify-content: space-between;
      flex-direction: column;
    }
  }
  &__input {
    width: 100%;
    height: 30px;
    padding: 2px;
    border: 1px solid darken($color: $primary-color, $amount: 10%);
    border-radius: 2px;
    @media (max-width: 599px) {
      width: 100%;
    }
    &--multiple {
      height: 90px;
    }
    &--margin-right {
      margin-right: 25px;
    }
  }
}

</style>