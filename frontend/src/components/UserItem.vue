<template>
  <li class="user">
    <div class="user__detail">
      {{index+1}} - User: {{ user.username }} <span v-if="user.moderator">Moderator</span>
    </div>
    <div
      role="button" 
      class="post__delete"
      v-if="isModerator"
      @click="deleteUser(user.id, index)"
      aria-label="Supprimer l'utilisateur"
    >
      <i class="fas fa-trash"></i>
    </div>
  </li>
</template>

<script>
import Functions from "../functions/functions";
export default {
  name: "UserItem",
  props: ["user", "index"],
  mixins: [Functions],
  data: function () {
    return {
      loaded: false,
    };
  },
  computed: {
    isModerator() {
      return this.$store.getters.user.moderator;
    },
  },
};
</script>

<style lang="scss">
@import "../assets/variables.scss";


.user {
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


</style>