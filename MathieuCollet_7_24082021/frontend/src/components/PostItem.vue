<template>
  <li class="post">
    <div role="button" class="post__likes" @click="likePost(post.id)"  aria-label="Ajouter/enlever un like">
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
        <span>Publié par </span>{{ post.author.username }}<span> le</span>
        {{ formatDate(post.createdAt) }}
      </div>
      <router-link :to="'/posts/' + post.id">
        <h2 class="post__title">
          {{ post.title }}
        </h2>
      </router-link>
    </div>
    <div
      role="button" 
      class="post__delete"
      v-if="isAuthor || isModerator"
      @click="deletePost(post.id, index)"
      aria-label="Supprimer la publication"
    >
      <i class="fas fa-trash"></i>
    </div>
  </li>
</template>

<script>
import { mapState } from 'vuex'
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
    ...mapState(['user']),
    isAuthor() {
      return this.post.authorId === this.user.id;
    },
    isModerator() {
      return this.user.moderator;
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
  @media (max-width: 730px) {
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
    & span {
      @media (max-width: 730px) {
        display: none;
      }
    }
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
    & i {
      transition: transform 0.2s;
    }
    &:hover i {
      transform: scale(150%);
    }
    &:active i {
      transform: scale(50%);
    }
  }
}

.like {
  color: hotpink;
  cursor: pointer;
  transition: transform 0.2s;
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