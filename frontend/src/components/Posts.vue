<template>
  <div v-if="errorMessage">
    {{errorMessage}}
  </div>
  <div v-else-if="!loaded">
    <p>Posts are loading...</p>
  </div>
  <div v-else>
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
    // si une erreur est retournée, elle est restituée sur la page et on force la déconnexion
    .catch(error => {
      if (error.response) {
        this.errorMessage = error.response.data.message || error.response.data.error;
      } else {
        this.errorMessage = error;
      }
      this.$store.dispatch('logOut');
    })
  },
}
</script>