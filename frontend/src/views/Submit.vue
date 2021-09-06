<template>
  <form
    @submit.prevent="submitPost"
  >
    <input
      type="text"
      id="title"
      placeholder="Title"
      v-model="post.title"
    />
    <!-- Password -->
    <input
      type="text"
      id="text"
      placeholder="Text"
      v-model="post.text"
    />
    <!-- Sign in button -->
    <button type="submit">
      Submit
    </button>
  </form>
</template>

<script>
const API_URL = "http://localhost:3000/api/posts";
export default {
  name: 'Submit',
  data() {
    return {
      post: {
        title: "",
        text: ""
      }
    };
  },
  methods: {
    async submitPost() {
      try {
        const bearer = localStorage.getItem("user");
        await fetch(API_URL, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + bearer,
          },
          body: JSON.stringify(this.post),
        })
      } catch (error) {
        console.log(error);
      }
      this.$router.push('/');
    }
  }
};
</script>