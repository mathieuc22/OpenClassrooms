<template>
  <div v-if="errorMessage">
    {{errorMessage}}
  </div>
  <div v-else-if="!loaded">
    <p>Posts are loading...</p>
  </div>
  <ul v-else class="posts">
    <PostItem
      v-for="post in posts"
      v-bind:key="post.id"
      v-bind:post="post"
    ></PostItem>
  </ul>
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

<style lang="scss">

.home {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}

ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.posts {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 800px;
    width: 100%;
}

</style>