<template>
  <router-link :to="'/posts/' + post.id">
    <div>
      <h2>{{post.title}}</h2>
      <h3>{{post.author.username}}</h3>
      <small>{{ formatDate(post.createdAt) }}</small>
    </div>
  </router-link>
  <p>Likes: {{ nbLikes }}</p>
  <p @click="likePost(post.id)">
    {{ userLike }}
  </p>
</template>

<script>
import axios from "axios";
export default {
  name: 'PostItem',
  props: ['post'],
  data: function () {
    return {
      loaded: false,
      userLike: "",
      nbLikes: "",
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
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
  mounted() {
    if (this.post.likes.some(x => x.id === this.user.id)) {
      this.userLike = 'Unlike';
    } else {
      this.userLike = 'Like';
    }
    this.nbLikes = this.post.likes.length;
  },
}
</script>