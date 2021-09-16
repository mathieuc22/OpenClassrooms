<template>
  <Error v-if="errorMessage" :message="errorMessage" :status="errorStatus"></Error>
  <div v-else-if="!loaded">
    Merci de patienter, les publications arrivent...
  </div>
  <div v-else-if="posts.length == 0">
    Aucune publication pour le moment,
    <router-link :to="'/submit'">
    soyez le premier
    </router-link> !
  </div>
  <ul v-else class="posts">
    <PostItem
      v-for="(post, index) in posts"
      v-bind:key="post.id"
      v-bind:post="post"
      v-bind:index="index"
      v-on:deleteThisPost="removePostItem"
    ></PostItem>
  </ul>
</template>

<script>
import { postAxios } from '../functions/axios'
import PostItem from '@/components/PostItem.vue'
import Error from '@/components/Error.vue'
export default {
  data: function () {
    return {
      loaded: false,
      posts: "",
      errorMessage: ""
    };
  },
  components: {
    PostItem,
    Error,
  },
  methods: {
    // permet de supprimer le post renvoyé par le composant enfant
    removePostItem (index) {
      this.posts.splice(index, 1)
    }
  },
  mounted() {
    // récupéation du token depuis le store vuex
    postAxios.defaults.headers.common["Authorization"] = 'Bearer ' + this.$store.getters.user.token;
    postAxios.get()
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