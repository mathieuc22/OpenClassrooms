<template>
  <div>
    <div>
      <h2>{{ post.title }}</h2>
      <h3>Author: {{ post.author.username }}</h3>
      <p>Likes: {{ nbLikes }}</p>
      <p @click="likePost(post.id)">
        {{userLike}}
      </p>
      <small>{{ formatDate(post.createdAt) }}</small>
      <p>{{ post.text }}</p>
      <h3>Comments:</h3>
      <ul v-for="comment in post.comments" :key="comment.id">
        <li>{{ comment.text }} - {{ comment.author.username }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
const API_URL = "http://localhost:3000/api/posts";
export default {
  name: "Post",
  data: function () {
    return {
      userLike: '',
      nbLikes: ''
    }
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    post() {
      return this.$store.getters.post;
    },
    isAuthor() {
      return this.$store.getters.post.author === this.$store.getters.user.id;
    },
    isLike() {
      return this.post.likes.some(x => x.id === this.user.id);
    }
  },
  methods: {
    formatDate(date) {
      return new Intl.DateTimeFormat('fr').format(new Date(date));
    },
    async likePost(id) {
      try {
        await fetch(API_URL + '/' + id + '/like', {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + this.$store.getters.user.token,
          },
        })
        .then(response => response.json())
        .then(result => {
          if (result.like) {
          this.userLike = "Unlike"
          this.nbLikes ++
          } else {
          this.userLike = "Like"
          this.nbLikes --
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  },
  created() {
    this.$store.dispatch('loadPost', this.$route.params.id);
  },
  mounted() {
    if (this.post.likes.some(x => x.id === this.user.id)) {
      this.userLike = 'Unlike';
    } else {
      this.userLike = 'Like';
    }
    this.nbLikes = this.post.likes.length;
  }
};
</script>