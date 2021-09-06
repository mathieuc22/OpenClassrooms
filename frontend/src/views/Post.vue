<template>
  <div>
      <div>
        <h2>{{post.title}}</h2>
        <p>Author: {{author}}</p>
        <p>User: {{user.id}}</p>
        <p>Likes: {{post.likes.length}}</p>
        <p>Likes: {{post.likes}}</p>
        <h3>User: {{post.author.username}}</h3>
        <small>{{post.createdAt}}</small>
        <p>{{post.text}}</p>
        <h3>Comments:</h3>
        <ul v-for="comment in post.comments" :key="comment.id">
          <li>{{comment.text}} - {{comment.author.username}}
          </li>
        </ul>
      </div>
  </div>
</template>

<script>
export default {
  name: "Post",
  computed: {
      user() {
          return this.$store.getters.user;
        },
      post() {
          return this.$store.getters.post;
        },
      author() {
          return this.$store.getters.post.author.username === this.$store.getters.user.id;
        },
    },
  mounted() {
    this.$store.dispatch('loadPost', this.$route.params.id);
  }
};
</script>