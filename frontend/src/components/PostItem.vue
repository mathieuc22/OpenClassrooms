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
import Functions from '../functions/functions';
export default {
  name: 'PostItem',
  props: ['post'],
  mixins:[Functions],
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