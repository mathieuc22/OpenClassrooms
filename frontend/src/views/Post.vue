<template>
  <div>
      <div>
        <h2>{{post.title}}</h2>
        <p>Likes: {{likes.length}}</p>
        <h3>User: {{author.username}}</h3>
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
const API_URL = "http://localhost:3000/api/posts";

export default {
  name: "Post",
  data: () => ({
    error: "",
    author: "",
    post: [],
    likes: []
  }),
  mounted() {
    const bearer = localStorage.getItem("user");
    fetch(API_URL + "/" + this.$route.params.id, {
      headers: {
        'Authorization': 'Bearer ' + bearer,
      }
    })
      .then(response => response.json())
      .then(result => {
        this.post = result.post;
        this.author = result.post.author;
        this.likes = result.post.likes;
      });
  }
};
</script>