<template>
  <li class="post">
    <div class="post__likes">
      <span>{{ nbLikes }}</span>
      <i
        class="fa-heart like"
        v-bind:class="{ 'like--active': isActive, 'far': !isActive, 'fas': isActive }" @click="likePost(post.id)">
      </i>
    </div>
    <div class="post__link">
      <router-link :to="'/posts/' + post.id">
        <div class="post__author">
          <small>
            Publié par {{post.author.username}} le {{ formatDate(post.createdAt) }}
          </small>
        </div>
        <div>
          <h2>{{post.title}}</h2>
        </div>
      </router-link>
    </div>
    <i class="post__delete fas fa-trash" v-if="isAuthor || isModerator" @click="deletePost(post.id, index)">
    </i>
  </li>
</template>

<script>
import Functions from '../functions/functions';
export default {
  name: 'PostItem',
  props: ['post','index'],
  mixins:[Functions],
  data: function () {
    return {
      loaded: false,
      userLike: "",
      nbLikes: "",
      isActive: false,
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    isAuthor() {
      return this.post.authorId === this.$store.getters.user.id;
    },
    isModerator() {
      return this.$store.getters.user.moderator;
    },
  },
  mounted() {
    if (this.post.likes.some(x => x.id === this.user.id)) {
      this.isActive = true;
    } else {
      this.isActive = false;
    }
    this.nbLikes = this.post.likes.length;
  },
}
</script>

<style lang="scss">

@import '../assets/variables.scss';

.post {
  background: white;
  border-radius: 5px;
  font-size: 0.8em;
  border: 1px solid $primary-color;
  box-shadow: 0px 4px 4px 0px rgba(0,0,0,0.25);
  display: flex;
  overflow: hidden;
  &__likes {
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 15px;
    background: $secondary-color;
    user-select: none;
    margin-right: 10px;
    font-size: 1.2em;
  }
  &__link {
    position: relative;
    flex: auto;
    a {
      outline: none;
      text-decoration: none;
      color: $primary-color;
    }
    a::after {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      content: ' ';
    }
    a:hover {
      color: $primary-color;
    }
    a:active {
      color: $primary-color;
    }
  }
  &__delete {
    background: $primary-color;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2em;
    cursor: pointer;
    width: 70px;
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