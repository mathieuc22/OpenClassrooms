<template>
  <div v-if="!loaded">
    <p>Posts are loading...</p>
  </div>
  <div v-if="errorMessage">
    {{errorMessage}}
  </div>
  <div>
    <ul>
      <PostItem
        v-for="post in posts"
        v-bind:key="post.id"
        v-bind:post="post"
      ></PostItem>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
import PostItem from '@/components/PostItem.vue'
export default {
  data: function () {
    return {
      loaded: false,
      posts: "",
      errorMessage: ""
    };
  },
  components: {
    PostItem
  },
  mounted() {
    // récupéation du token depuis le store vuex
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.getters.user.token;
    axios.get()
    .then(response => {
      this.posts = response.data.posts;
      this.loaded = true;
    })
    .catch(error => {
      this.errorMessage = error.response.data.message;
      this.$store.dispatch('logOut');
    })
  },
}
</script>