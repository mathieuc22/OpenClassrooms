<template>
  <div>
    <ul v-for="post in posts" :key="post.id">
      <li>
        <router-link :to="'/posts/' + post.id">
          <div>
            <h2>{{post.title}}</h2>
            <h3>{{post.author.username}}</h3>
            <small>{{post.createdAt}}</small>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
      posts() {
          return this.$store.getters.posts;
        },
    },
  created() {
    this.$store.dispatch('loadPosts');
  },
}
</script>