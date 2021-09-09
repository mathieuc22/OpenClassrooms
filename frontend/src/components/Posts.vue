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
        <p :id="`likeMessage-${post.id}`" @click="likePost(post.id)">Like</p>
        <p>Likes: <span :id="`likeNumber-${post.id}`">{{post.likes.length}}</span></p>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
export default {
  computed: {
      posts() {
        return this.$store.getters.posts;
      },
    },
  mounted() {
    this.$store.dispatch('loadPosts');
  },
  methods: {
    formatDate(date) {
      return new Intl.DateTimeFormat('fr').format(new Date(date));
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
    }
  }
}
</script>