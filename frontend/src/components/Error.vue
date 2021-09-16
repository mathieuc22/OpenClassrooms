<template>
  <div class="error">
    <h1>{{status}}</h1>
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  name: 'Erreur',
  props: ['message','status'],
}
</script>

<style lang="scss">

@import '../assets/variables.scss';

.error {
  background: $secondary-color;
  color: white;
  text-align: center;
  display: flex;
  flex-direction: column;
  border-radius: 25px;
  padding: 20px;
  margin: 20px auto;
  max-width: 400px;
}

</style>