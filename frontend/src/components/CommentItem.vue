<template>
  <li>
    <small><i class="fas fa-user"></i> {{ comment.author.username }} - {{ formatDate(comment.createdAt) }}</small>
    <p>{{ comment.text }}</p>
    <div class="post__delete" v-if="isAuthor" @click="deleteComment(comment.id, index)">
      Supprimer le commentaire
    </div>
  </li>
</template>

<script>
import axios from "axios";
import Functions from '../functions/functions';
export default {
  name: 'CommentItem',
  props: ['comment','index'],
  mixins:[Functions],
  data: function () {
    return {
      loaded: false,
      userLike: "",
      nbLikes: "",
      isActive: false,
    };
  },
  computed: {
    isAuthor() {
      return this.comment.authorId === this.$store.getters.user.id;
    },
  },
  methods: {
    // fonction de suppression d'un post
    deleteComment(id, index) {
      console.log('id: ' + id + ', index: ' +index)
      try {
        axios.delete("/comment/" + id)
          .then((result) => {
            console.log(result);
            // si on supprime depuis la page d'accueil on renvoie l'index du post à supprimer, sinon on renvoie sur Home
            this.$emit('deleteThisComment', index)
          });
      } catch (error) {
        console.log(error);
      }
    },
  },
}
</script>

<style lang="scss">
</style>