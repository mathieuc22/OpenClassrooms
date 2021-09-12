<template>
  <div v-if="errorMessage">
    {{errorMessage}}
  </div>
  <div v-else-if="!loaded">
    <p>Post is loading...</p>
  </div>
  <div v-else>
    <h2>{{ post.title }}</h2>
    <h3>Author: {{ post.author.username }}</h3>
    <p>Likes: {{ nbLikes }}</p>
    <p @click="likePost(post.id)">
      {{ userLike }}
    </p>
    <small>{{ formatDate(post.createdAt) }}</small>
    <p>{{ post.text }}</p>
    <h3>Comments:</h3>
    <ul v-for="comment in post.comments" :key="comment.id">
      <li>{{ comment.text }} - {{ comment.author.username }}</li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
import Functions from '../functions/functions';
export default {
  name: "Post",
  mixins:[Functions],
  data: function () {
    return {
      loaded: false,
      post: '',
      userLike: ' ',
      nbLikes: '',
      errorMessage: '',
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    // post() {
    //   return this.$store.getters.post || '';
    // },
    isAuthor() {
      return this.post.authorId === this.$store.getters.user.id;
    },
  },
  created() {
    // this.$store.dispatch('loadPost', this.$route.params.id);
  },
  mounted() {
    // récupéation du token depuis le store vuex
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.getters.user.token;
    axios.get("/" + this.$route.params.id)
    .then(response => {
      this.post = response.data.post;
      this.loaded = true;
      if (this.post.likes.some(x => x.id === this.user.id)) {
        this.userLike = 'Unlike';
      } else {
        this.userLike = 'Like';
      }
      this.nbLikes = this.post.likes.length;
    })
    // si une erreur est retournée, elle est restituée sur la page et on force la déconnexion
    .catch(error => {
      if (error.response) {
        this.errorMessage = error.response.data.message;
      } else {
        this.errorMessage = error;
      }
      this.$store.dispatch('logOut');
    })
  },
};
</script>