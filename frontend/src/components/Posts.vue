<template>
  <div v-if="!error">
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
  <div v-else>
    <Error :msg="error"/>
  </div>
</template>

<script>
import Error from '../components/Error.vue'


const API_URL = "http://localhost:3000/api/posts";

export default {
  name: "Posts",
  components: {
    Error
  },
  data: () => ({
    error: "",
    posts: []
  }),
  mounted() {
    const bearer = localStorage.getItem("user");
    if (!bearer) {
      this.error = "Not logged in";
      this.$router.push("/login");
    } else {
      fetch(API_URL, {
        headers: {
          'Authorization': 'Bearer ' + bearer,
        }
      })
      .then(response => response.json())
      .then(result => {
        this.posts = result.posts;
      });
    }
  },
  methods: {}
};
</script>