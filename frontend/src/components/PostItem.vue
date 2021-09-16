<template>
  <li class="post">
    <div class="post__likes" @click="likePost(post.id)">
      <span>{{ nbLikes }}</span>
      <i
        class="fa-heart like"
        v-bind:class="{
          'like--active': isActive,
          far: !isActive,
          fas: isActive,
        }"
      >
      </i>
    </div>
    <div class="post__link">
      <div class="post__author">
        Publié par {{ post.author.username }} le
        {{ formatDate(post.createdAt) }}
      </div>
      <h2 class="post__title">
        {{ post.title }}
      </h2>
      <router-link :to="'/posts/' + post.id">
        <span hidden>Lien vers le post</span>
      </router-link>
    </div>
    <div
      class="post__delete"
      v-if="isAuthor || isModerator"
      @click="deletePost(post.id, index)"
    >
      <i class="fas fa-trash"></i>
    </div>
  </li>
</template>

<script>
import Functions from "../functions/functions";
export default {
  name: "PostItem",
  props: ["post", "index"],
  mixins: [Functions],
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
    if (this.post.likes.some((x) => x.id === this.user.id)) {
      this.isActive = true;
    } else {
      this.isActive = false;
    }
    this.nbLikes = this.post.likes.length;
  },
};
</script>

<style lang="scss">
@import "../assets/variables.scss";

.post {
  background: white;
  border-radius: 5px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  overflow: hidden;
  &:hover {
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.50);
  }
  @media (max-width: 599px) {
    border-radius: unset;
    border: unset;
  }
  &__likes {
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px 0;
    background: $primary-color;
    font-weight: 700;
    color: white;
    user-select: none;
    cursor: pointer;
    font-size: 1.2em;
    width: 15%;
    min-width: 40px;
    max-width: 70px;
  }
  &__link {
    overflow: hidden;
    position: relative;
    flex: auto;
    padding: 5px;
    width: 640px;
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
      content: " ";
    }
    a:hover {
      color: $primary-color;
    }
    a:active {
      color: $primary-color;
    }
  }
  &__author {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 0.9em;
  }
  &__title {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  &__delete {
    background: $secondary-color;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2em;
    cursor: pointer;
    width: 15%;
    min-width: 40px;
    max-width: 70px;
    & i:hover {
      transform: scale(150%);
    }
    & i:active {
      transform: scale(50%);
    }
  }
}

.like {
  color: hotpink;
  cursor: pointer;
  &:hover {
    transform: scale(150%);
  }
  &:active {
    transform: scale(50%);
  }
}

.like--active {
  color: hotpink;
}
</style>