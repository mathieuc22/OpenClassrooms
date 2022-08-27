<template>
  <li class="user">
    <div class="user__detail">
      <div class="user__index">
        {{index+1}}
      </div>
      <div class="user__name">
        {{ userObject.username }}
      </div>
      <div v-if="userObject.moderator" class="user__moderator">
        Moderator
      </div>
    </div>
    <div
      role="button" 
      class="post__delete"
      v-if="isModerator"
      @click="deleteUser(userObject.id, index)"
      aria-label="Supprimer l'utilisateur"
    >
      <i class="fas fa-trash"></i>
    </div>
  </li>
</template>

<script>
import { mapState } from 'vuex'
import Functions from "../functions/functions";
export default {
  name: "UserItem",
  props: ["userObject", "index"],
  mixins: [Functions],
  data: function () {
    return {
      loaded: false,
    };
  },
  computed: {
    ...mapState(['user']),
    isModerator() {
      return this.user.moderator;
    },
  },
};
</script>

<style lang="scss">
@import "../assets/variables.scss";

.user {
  background: $bg-color;
  border-radius: 5px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  overflow: hidden;
  @media (max-width: 730px) {
    border-radius: unset;
    border: unset;
  }
  &__detail {
    flex: auto;
    display: flex;
    & > * {
      padding: 10px;
    }
  }
  &__index {
    width: 30px;
    background: $primary-color;
    font-weight: 700;
    color: white;
  }
  &__title {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  &__moderator {
    font-weight: 700;
    color: darken($secondary-color, 14%);
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