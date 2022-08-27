import { postAxios, authAxios } from '../functions/axios'
var Functions = {
  methods: {
    // fonction de formattage de la date récupérée de l'API
    formatDate(date) {
      return new Intl.DateTimeFormat("fr").format(new Date(date));
    },
    likePost(id) {
      try {
        postAxios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.state.user.token;
        postAxios.post("/" + id + "/like")
          .then((result) => {
            this.isActive = !this.isActive;
            if (result.data.like) {
              this.userLike = "Unlike";
              this.nbLikes++;
            } else {
              this.userLike = "Like";
              this.nbLikes--;
            }
          });
      } catch (error) {
        console.log(error);
      }
    },
    // fonction de suppression d'un post
    deletePost(id, index) {
      try {
        postAxios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.state.user.token;
        postAxios.delete("/" + id)
          .then((result) => {
            console.log(result);
            // si on supprime depuis la page d'accueil on renvoie l'index du post à supprimer, sinon on renvoie sur Home
            if (typeof index !== 'undefined') {
              this.$emit('deleteThisPost', index)
            } else {
              this.$router.push('/');
            }
          });
      } catch (error) {
        console.log(error);
      }
    },
    // fonction de suppression d'un post
    deleteUser(id, index) {
      try {
        authAxios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.state.user.token;
        authAxios.delete("/users/" + id)
          .then((result) => {
            console.log(result);
            // si on supprime depuis la page d'accueil on renvoie l'index du post à supprimer, sinon on renvoie sur Home
            if (typeof index !== 'undefined') {
              this.$emit('deleteThisUser', index)
            } else {
              this.$router.push('/');
            }
          });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
export default Functions;
