<template>
  <div v-if="!loaded">
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
export default {
  name: "Post",
  data: function () {
    return {
      loaded: false,
      post: '',
      userLike: "",
      nbLikes: "",
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
  methods: {
    // fonction de formattage de la date récupérée de l'API
    formatDate(date) {
      return new Intl.DateTimeFormat("fr").format(new Date(date));
    },
    async likePost(id) {
      try {
        axios.post("/" + id + "/like")
          .then((result) => {
            if (result.data.like) {
              this.userLike = "Unlike";
              this.nbLikes++;
            } else {
              this.userLike = "Like";
              this.nbLikes--;
            }
          });
      } catch (error) {
        console.log(error);
      }
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
  },
};
</script>