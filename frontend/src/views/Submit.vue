<template>
  <form
    @submit.prevent="submitPost"
  >
    <input
      type="text"
      id="title"
      placeholder="Title"
      v-model="post.title"
    />
    <input
      type="text"
      id="text"
      placeholder="Text"
      v-model="post.text"
    />
    <!-- Post button -->
    <button type="submit">
      Submit
    </button>
  </form>
  <div v-if="errorMessage">
    {{errorMessage}}
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: 'Submit',
  data() {
    return {
      post: {
        title: "",
        text: ""
      }
    };
  },
  methods: {
    // création d'un nouveau post avec l'API
    submitPost() {
      // récupère du store le token d'authentification pour la requête
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.getters.user.token;
      // envoie les données du formulaire à l'API
      axios.post('', this.post)
      .then(response => {
        console.log(response);
        this.$router.push('/');
      })
      // si une erreur est retournée, elle est restituée sur la page et on force la déconnexion
      .catch(error => {
        if (error.response) {
          this.errorMessage = error.response.data.message;
        } else {
          this.errorMessage = error;
        }
        this.$store.dispatch('logOut');
      });
    }
  }
};
</script>