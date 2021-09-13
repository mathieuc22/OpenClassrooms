<template>
  <div class="postDetail__comments">
    <h3>Commentaires</h3>
    <form
      @submit.prevent="submitComment"
    >
      <input
        type="text"
        id="text"
        placeholder="Text"
        v-model="comment.text"
      />
      <!-- Post button -->
      <button type="submit">
        Submit
      </button>
    </form>
    <ul>
    <li
      v-for="comment in allComments"
      v-bind:key="comment.id"
    >
      <small><i class="fas fa-user"></i> {{ comment.author.username }} - {{ formatDate(comment.createdAt) }}</small>
      <p>{{ comment.text }}</p>
    </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
import Functions from '../functions/functions';
export default {
  name: 'CommentItem',
  props: ['comments'],
  mixins:[Functions],
  data: function () {
    return {
      loaded: false,
      userLike: "",
      nbLikes: "",
      isActive: false,
      comment: {
        text: ""
      },
      allComments: this.comments
    };
  },
  computed: {
  },
  mounted() {
  },
  methods: {
    // création d'un nouveau post avec l'API
    submitComment() {
      // récupère du store le token d'authentification pour la requête
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.getters.user.token;
      // envoie les données du formulaire à l'API
      console.log(this.comment)
      axios.post("/" + this.$route.params.id, this.comment)
      .then(response => {
        console.log(response);
        // ajoute le nouvel élément à la liste des commentaires
        let newComment = response.data.comment;
        console.log(newComment);
        newComment.author = {username: this.$store.getters.user.name};
        console.log(newComment);
        this.allComments.unshift(newComment);
        this.comment.text = ''
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
}
</script>

<style lang="scss">
</style>