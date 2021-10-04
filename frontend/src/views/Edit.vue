<template>
  <div v-if="isAuthor || isModerator" class="section">
    <form class="formulaire" @submit.prevent="updatePost">
      <h1>Edition</h1>
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
          <label for="text">Texte</label>
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
        <button class="button" type="submit" aria-label="Publier">Publier</button>
      </div>
    </form>
  </div>
  <Error v-else :message="'Modification non autorisée'" :status="'403'"></Error>
  <Error v-if="errorMessage" :message="errorMessage" :status="errorStatus"></Error>
</template>

<script>
import { mapState } from 'vuex'
import Error from '../components/Error.vue';
import { postAxios } from "../functions/axios";
export default {
  components: { Error },
  name: "PostForm",
  data() {
    return {
      post: {
        title: "",
        text: "",
      },
      errorMessage: "",
      errorStatus: "",
    };
  },
  computed: {
    ...mapState(['user']),
    isAuthor() {
      return this.post.authorId === this.user.id;
    },
    isModerator() {
      return this.user.moderator;
    },
  },
  mounted() {
    // récupéation du token depuis le store vuex
    postAxios.defaults.headers.common["Authorization"] =
      "Bearer " + this.user.token;
    postAxios
      .get("/" + this.$route.params.id)
      .then((response) => {
        this.post = response.data.post;
        this.loaded = true;
      })
      // si une erreur est retournée, elle est restituée sur la page et on force la déconnexion
      .catch((error) => {
        if (error.response) {
          this.errorStatus = error.response.status;
          this.errorMessage = error.response.data.message;
        } else {
          this.errorMessage = error;
        }
      });
  },
  methods: {
    // création d'un nouveau post avec l'API
    updatePost() {
      // récupère du store le token d'authentification pour la requête
      postAxios.defaults.headers.common["Authorization"] =
        "Bearer " + this.user.token;
      // envoie les données du formulaire à l'API
      postAxios
        .put("/" + this.post.id, this.post)
        .then((response) => {
          console.log(response);
          this.$router.push("/posts/"+this.post.id);
        })
        // si une erreur est retournée, elle est restituée sur la page et on force la déconnexion
        .catch((error) => {
          if (error.response) {
            this.errorStatus = error.response.status;
            this.errorMessage = error.response.data.message;
          } else {
            this.errorMessage = error;
          }
        });
    },
  },
};
</script>