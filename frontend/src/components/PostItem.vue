<template>
  <li class="post">
    <router-link class="post__link" :to="'/posts/' + post.id">
      <div class="post__author">
        <small>Publié par {{post.author.username}} le {{ formatDate(post.createdAt) }}</small>
      </div>
      <div>
        <h2>{{post.title}}</h2>
      </div>
    </router-link>
    <div>Likes: {{ nbLikes }}
      <span class="button__like" @click="likePost(post.id)">
        {{ userLike }}
      </span>
    </div>
  </li>
</template>

<script>
import Functions from '../functions/functions';
export default {
  name: 'PostItem',
  props: ['post'],
  mixins:[Functions],
  data: function () {
    return {
      loaded: false,
      userLike: "",
      nbLikes: "",
    };
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
    if (this.post.likes.some(x => x.id === this.user.id)) {
      this.userLike = 'Unlike';
    } else {
      this.userLike = 'Like';
    }
    this.nbLikes = this.post.likes.length;
  },
}
</script>

<style lang="scss">

.post {
  background: white;
  border-radius: 10px;
  font-size: 0.8em;
  border: 1px solid white;
  -webkit-box-shadow: 0px 4px 4px 0px rgba(0,0,0,0.25); 
  box-shadow: 0px 4px 4px 0px rgba(0,0,0,0.25);
  &__link {
    outline: none;
    text-decoration: none;
    color: blue;
  }
  &__link:hover {
    color: blue;
  }
  &__link:active {
    color: blue;
  }
}

.button__like {
  cursor: pointer;
}

</style>