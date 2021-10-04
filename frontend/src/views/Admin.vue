<template>
  <div class="section">
    <Error v-if="errorMessage" :message="errorMessage" :status="errorStatus"></Error>
    <div v-else-if="!loaded">
      <p>Page is loading...</p>
    </div>
    <div v-else class="admin">
    <h2>Administration des utilisateurs</h2>
      <ul class="users">
        <UserItem
          v-for="(user, index) in users"
          v-bind:key="user.id"
          v-bind:userObject="user"
          v-bind:index="index"
          v-on:deleteThisUser="removeUserItem"
        ></UserItem>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
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
    ...mapState(['user']),
    isModerator() {
      return this.user.moderator;
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
      "Bearer " + this.user.token;
    // fetch de la liste des users
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

.section {
  width: 80%;
  @media (max-width: 730px) {
    width: 100%;
  }
}

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
  margin-bottom: 20px;
}

</style>