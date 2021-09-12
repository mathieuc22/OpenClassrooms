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
    async submitPost() {
      // récupère du store le token d'authentification pour la requête
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.getters.user.token;
      // envoie les données du formulaire à l'API
      axios.post('', this.post)
      .then(function (response) {
        console.log(response);
        this.$router.push('/');
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }
};
</script>