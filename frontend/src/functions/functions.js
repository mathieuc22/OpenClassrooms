import axios from "axios";
var Functions = {
  methods: {
    // fonction de formattage de la date récupérée de l'API
    formatDate(date) {
      return new Intl.DateTimeFormat("fr").format(new Date(date));
    },
    async likePost(id) {
      try {
        axios.post("/" + id + "/like")
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
    async deletePost(id) {
      try {
        axios.delete("/" + id)
          .then((result) => {
            console.log(result);
          });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
export default Functions;
