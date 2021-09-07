<template>
  <div>
    <ul v-for="post in posts" :key="post.id">
      <li>
        <router-link :to="'/posts/' + post.id">
          <div>
            <h2>{{post.title}}</h2>
            <h3>{{post.author.username}}</h3>
            <small>{{ formatDate(post.createdAt) }}</small>
          </div>
        </router-link>
        <p @click="likePost(post.id)">Like</p>
        <p>Likes: {{post.likes.length}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
const API_URL = "http://localhost:3000/api/posts";
export default {
  computed: {
      posts() {
        return this.$store.getters.posts;
      },
    },
  beforeCreate() {
    this.$store.dispatch('loadPosts');
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
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>