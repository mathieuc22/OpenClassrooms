<template>
  <div class="postView">
    <Error v-if="errorMessage" :message="errorMessage" :status="errorStatus"></Error>
    <div v-else-if="!loaded">
      <p>Post is loading...</p>
    </div>
    <div v-else class="postDetail">
      <div class="postDetail__post">
        <div class="postDetail__author">
          <small
            >Publié par {{ post.author.username }} le
            {{ formatDate(post.createdAt) }}
          </small>
        </div>
        <div class="postDetail__likes" @click="likePost(post.id)"  aria-label="Ajouter/supprimer un like">
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
        <h2>{{ post.title }}</h2>
        <div class="postDetail__text">
          {{ post.text }}
        </div>
        <div v-if="isAuthor || isModerator" class="postDetail__admin">
          <router-link
            class="postDetail__update"
            :to="'/posts/' + post.id + '/edit'"
          >
            <i class="fas fa-pen"></i>
            Modifer la publication
          </router-link>
          <div
            class="postDetail__delete"
            @click="deletePost(post.id)"
            aria-label="Supprimer une publication"
          >
            <i class="fas fa-trash"></i>
            Supprimer le post ?
          </div>
        </div>
      </div>

      <div class="postDetail__comments">
        <h2>Commentaires</h2>
        <div>
          <form class="formulaire" @submit.prevent="submitComment">
            <div class="formulaire__fieldline">
              <p>
                <label for="text"
                  >Commenter en tant que <strong>{{ user.name }}</strong></label
                >
                <textarea
                  type="text"
                  id="text"
                  placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
                  class="formulaire__input formulaire__input--multiple"
                  v-model="commentForm.text"
                  required
                />
              </p>
            </div>
            <div class="formulaire__fieldline formulaire__fieldline--center">
              <!-- Post button -->
              <button class="button" type="submit">Commenter</button>
            </div>
          </form>
        </div>
        <ul>
          <CommentItem
            v-for="(comment, index) in comments"
            v-bind:key="comment.id"
            v-bind:comment="comment"
            v-bind:index="index"
            v-on:deleteThisComment="removeCommentItem"
          ></CommentItem>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { postAxios } from "../functions/axios";
import Functions from "../functions/functions";
import Error from '../components/Error.vue';
import CommentItem from "@/components/CommentItem.vue";
export default {
  name: "Post",
  mixins: [Functions],
  data: function () {
    return {
      loaded: false,
      post: "",
      userLike: " ",
      nbLikes: "",
      errorMessage: "",
      errorStatus: "",
      isActive: false,
      comments: "",
      commentForm: {
        text: "",
      },
    };
  },
  components: {
    CommentItem,
    Error,
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
  methods: {
    // création d'un nouveau post avec l'API
    submitComment() {
      // récupère du store le token d'authentification pour la requête
      postAxios.defaults.headers.common["Authorization"] =
        "Bearer " + this.$store.getters.user.token;
      // envoie les données du formulaire à l'API
      postAxios
        .post("/" + this.$route.params.id, this.commentForm)
        .then((response) => {
          // ajoute le nouvel élément à la liste des commentaires
          let newComment = response.data.comment;
          newComment.author = { username: this.$store.getters.user.name };
          this.comments.unshift(newComment);
          this.commentForm.text = "";
        })
        // si une erreur est retournée, elle est restituée sur la page et on force la déconnexion
        .catch((error) => {
          if (error.response) {
            this.errorMessage = error.response.data.message;
          } else {
            this.errorMessage = error;
          }
        });
    },
    // permet de supprimer le post renvoyé par le composant enfant
    removeCommentItem(index) {
      this.comments.splice(index, 1);
    },
  },
  mounted() {
    // récupéation du token depuis le store vuex
    postAxios.defaults.headers.common["Authorization"] =
      "Bearer " + this.$store.getters.user.token;
    postAxios
      .get("/" + this.$route.params.id)
      .then((response) => {
        this.post = response.data.post;
        this.comments = response.data.post.comments;
        this.loaded = true;
        if (this.post.likes.some((x) => x.id === this.user.id)) {
          this.isActive = true;
        } else {
          this.isActive = false;
        }
        this.nbLikes = this.post.likes.length;
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

<style lang="scss">
@import "../assets/variables.scss";

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
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    overflow: hidden;
    padding: 20px;
    @media (max-width: 730px) {
        width: 100%;
        border-radius: 0px;
    }
  }
  &__post {
    padding-left: 50px;
    position: relative;
  }
  &__likes {
    position: absolute;
    display: flex;
    flex-direction: column;
    font-size: 1.3em;
    font-weight: 700;
    text-align: center;
    left: 10px;
    padding: 3px;
    user-select: none;
    cursor: pointer;
  }
  &__text {
    margin: 20px 0;
    white-space: pre;
  }
  &__admin {
    display: flex;
    & > * {
      cursor: pointer;
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
  &__update {
    text-decoration: none;
    margin-right: 20px;
    color: $primary-color;
  }
  &__delete {
    color: $secondary-color;
  }
}
</style>