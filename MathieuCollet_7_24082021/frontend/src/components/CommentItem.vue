<template>
  <li class="comment">
    <small><i class="fas fa-user"></i> {{ comment.author.username }} - {{ formatDate(comment.createdAt) }}</small>
    <div class="comment__text">{{ comment.text }}</div>
    <i class="postDetail__delete fas fa-trash"  v-if="isAuthor || isModerator " @click="deleteComment(comment.id, index)"  role="button" aria-label="Supprimer un commentaire">
    </i>
  </li>
</template>

<script>
import { mapState } from 'vuex'
import { postAxios } from '../functions/axios'
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
    ...mapState(['user']),
    isAuthor() {
      return this.comment.authorId === this.user.id;
    },
    isModerator() {
      return this.user.moderator;
    },
  },
  methods: {
    // fonction de suppression d'un post
    deleteComment(id, index) {
      console.log('id: ' + id + ', index: ' +index)
      try {
        postAxios.delete("/comment/" + id)
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
@import "../assets/variables.scss";

  .comment {
    margin: 10px 0;
    background: $bg-color;
    padding: 10px;
    border-radius: 5px;
    &__text {
      margin: 5px 0;
      white-space: pre;
    }
  }
</style>