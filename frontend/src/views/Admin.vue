<template>
  <h2>Administration des utilisateurs</h2>
  <div class="admin">
    <Error v-if="errorMessage" :message="errorMessage" :status="errorStatus"></Error>
    <div v-else-if="!loaded">
      <p>Page is loading...</p>
    </div>
    <ul v-else class="users">
      <UserItem
        v-for="(user, index) in users"
        v-bind:key="user.id"
        v-bind:user="user"
        v-bind:index="index"
        v-on:deleteThisUser="removeUserItem"
      ></UserItem>
    </ul>
  </div>
</template>

<script>
import { authAxios } from "../functions/axios";
import UserItem from '@/components/UserItem.vue'
import Error from '../components/Error.vue';
export default {
  name: "Admin",
  data: function () {
    return {
      loaded: false,
      users: "",
      errorMessage: "",
      errorStatus: "",
    };
  },
  components: {
    UserItem,
    Error,
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    isModerator() {
      return this.$store.getters.user.moderator;
    },
  },
  methods: {
    // permet de supprimer le post renvoyé par le composant enfant
    removeUserItem (index) {
      this.users.splice(index, 1)
    }
  },
  mounted() {
    // récupéation du token depuis le store vuex
    authAxios.defaults.headers.common["Authorization"] =
      "Bearer " + this.$store.getters.user.token;
    authAxios
      .get("/users")
      .then((response) => {
        this.loaded = true;
        this.users = response.data.users;
      })
      // si une erreur est retournée, elle est restituée sur la page et on force la déconnexion
      .catch((error) => {
        if (error.response) {
          this.errorStatus = error.response.status;
          this.errorMessage = error.response.data.message;
        } else {
          this.errorMessage = error;
        }
      });
  },
};
</script>

<style lang="scss" scoped>

.admin {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}

.users {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 800px;
    width: 100%;
}

h2 {
  text-align: center;
  margin: 20px;
}

</style>