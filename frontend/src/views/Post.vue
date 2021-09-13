<template>
  <div class="postView">
    <div v-if="errorMessage">
      {{errorMessage}}
    </div>
    <div v-else-if="!loaded">
      <p>Post is loading...</p>
    </div>
    <div v-else class="postDetail">
      <div class="postDetail__post">
        <h2>{{ post.title }}</h2>
        <div class="postDetail__author">
          <small>Publié par {{post.author.username}} le {{ formatDate(post.createdAt) }}</small>
        </div>
        <div class="postDetail__likes">
          <span>{{ nbLikes }}</span>
          <i
            class="fa-heart like"
            v-bind:class="{ 'like--active': isActive, 'far': !isActive, 'fas': isActive }"
            @click="likePost(post.id)">
          </i>
        </div>
        <p>{{ post.text }}</p>
        <i class="postDetail__delete fas fa-trash" v-if="isAuthor" @click="deletePost(post.id)"></i> 
      </div>
      <CommentItem
        v-bind:comments="post.comments"
      ></CommentItem>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Functions from '../functions/functions';
import CommentItem from '@/components/CommentItem.vue'
export default {
  name: "Post",
  mixins:[Functions],
  data: function () {
    return {
      loaded: false,
      post: '',
      userLike: ' ',
      nbLikes: '',
      errorMessage: '',
      isActive: false,
    };
  },
  components: {
    CommentItem
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    isAuthor() {
      return this.post.authorId === this.$store.getters.user.id;
    },
  },
  mounted() {
    // récupéation du token depuis le store vuex
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.getters.user.token;
    axios.get("/" + this.$route.params.id)
    .then(response => {
      this.post = response.data.post;
      this.loaded = true;
      if (this.post.likes.some(x => x.id === this.user.id)) {
        this.isActive = true;
      } else {
        this.isActive = false;
      }
      this.nbLikes = this.post.likes.length;
    })
    // si une erreur est retournée, elle est restituée sur la page et on force la déconnexion
    .catch(error => {
      if (error.response) {
        this.errorMessage = error.response.data.message;
      } else {
        this.errorMessage = error;
      }
      this.$store.dispatch('logOut');
    })
  },
};
</script>

<style lang="scss">

@import '../assets/variables.scss';

.postView {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.postDetail {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
  & > * {
    width: 100%;
    max-width: 800px;
    display: flex;
    flex-direction: column;
    background: white;
    border-radius: 5px;
    font-size: 0.8em;
    border: 1px solid $primary-color;
    box-shadow: 0px 4px 4px 0px rgba(0,0,0,0.25);
    overflow: hidden;
    padding: 20px;
  }
  &__delete {
    color: $secondary-color;
    cursor: pointer;
  }
}

.like {
  color: $primary-color;
  cursor: pointer;
}

.like--active {
  color: hotpink;
}

</style>