<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
  <div>
    <div v-for="post in posts" v-bind:key="post.id">
      <h2>{{ post.title }}</h2>
      <p>{{ post.text }}</p>
    </div>
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