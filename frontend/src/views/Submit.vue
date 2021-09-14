<template>
  <div class="section">
    <form class="formulaire" @submit.prevent="submitPost">
      <h1>Créer une publication</h1>
      <div class="formulaire__fieldline">
        <p>
          <label for="title">Titre</label>
          <input
            type="text"
            id="title"
            placeholder="Titre"
            class="formulaire__input"
            v-model="post.title"
            required
          />
        </p>
      </div>
      <div class="formulaire__fieldline">
        <p>
          <label for="title">Texte</label>
          <textarea
            id="text"
            placeholder="Text (facultatif)"
            class="formulaire__input formulaire__input--multiple"
            v-model="post.text"
          />
        </p>
      </div>
      <div class="formulaire__fieldline formulaire__fieldline--center">
        <!-- Post button -->
        <button class="button" type="submit">Publier</button>
      </div>
    </form>
  </div>
  <div v-if="errorMessage">
    {{ errorMessage }}
  </div>
</template>

<script>
import { postAxios } from "../functions/axios";
export default {
  name: "Submit",
  data() {
    return {
      post: {
        title: "",
        text: "",
      },
    };
  },
  methods: {
    // création d'un nouveau post avec l'API
    submitPost() {
      // récupère du store le token d'authentification pour la requête
      postAxios.defaults.headers.common["Authorization"] =
        "Bearer " + this.$store.getters.user.token;
      // envoie les données du formulaire à l'API
      postAxios
        .post("", this.post)
        .then((response) => {
          console.log(response);
          this.$router.push("/");
        })
        // si une erreur est retournée, elle est restituée sur la page et on force la déconnexion
        .catch((error) => {
          if (error.response) {
            this.errorMessage = error.response.data.message;
          } else {
            this.errorMessage = error;
          }
          this.$store.dispatch("logOut");
        });
    },
  },
};
</script>