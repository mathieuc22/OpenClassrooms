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
        <i class="postDetail__delete fas fa-trash" v-if="isAuthor || isModerator" @click="deletePost(post.id)"></i> 
      </div>


      <div class="postDetail__comments">
        <h3>Commentaires</h3>
        <form
          @submit.prevent="submitComment"
        >
          <input
            type="text"
            id="text"
            placeholder="Text"
            v-model="commentForm.text"
          />
          <!-- Post button -->
          <button type="submit">
            Submit
          </button>
        </form>
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
import { postAxios } from '../functions/axios'
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
      comments: '',
      commentForm: {
        text: ""
      },
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
    isModerator() {
      return this.$store.getters.user.moderator;
    },
  },
  methods: {
    // création d'un nouveau post avec l'API
    submitComment() {
      // récupère du store le token d'authentification pour la requête
      postAxios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.getters.user.token;
      // envoie les données du formulaire à l'API
      postAxios.post("/" + this.$route.params.id, this.commentForm)
      .then(response => {
        // ajoute le nouvel élément à la liste des commentaires
        let newComment = response.data.comment;
        newComment.author = {username: this.$store.getters.user.name};
        this.comments.unshift(newComment);
        this.commentForm.text = ''
      })
      // si une erreur est retournée, elle est restituée sur la page et on force la déconnexion
      .catch(error => {
        if (error.response) {
          this.errorMessage = error.response.data.message;
        } else {
          this.errorMessage = error;
        }
        this.$store.dispatch('logOut');
      });
    },
    // permet de supprimer le post renvoyé par le composant enfant
    removeCommentItem (index) {
      this.comments.splice(index, 1)
    }
  },
  mounted() {
    // récupéation du token depuis le store vuex
    postAxios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.getters.user.token;
    postAxios.get("/" + this.$route.params.id)
    .then(response => {
      this.post = response.data.post;
      this.comments = response.data.post.comments;
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