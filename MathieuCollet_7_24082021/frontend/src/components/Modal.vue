<template>
  <div class="modal">
    <div class="modal__card">
      <h1 class="modal__title">Voulez-vous supprimer votre compte?</h1>
      <div class="modal__button-group">
        <button @click="$emit('confirm')">Oui</button>
        <button class="button" @click="$emit('close')">Non</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: ['message'],
  data: function () {
  },
  computed: {
  },
  mounted() {
  },
}
</script>

<style lang="scss">

@import '../assets/variables.scss';

.modal {
    background-color: rgba(0, 0, 0, 0.6);
    opacity: 0.7;
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    opacity: 1;
    &__card {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 2;
      background-color: $secondary-color;
      border-radius: 10px;
      padding: 20px;
      text-align: center;
      width: 80%;
      max-width: 600px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    &__title {
      margin-bottom: 10px;
    }
    &__text {
      margin: 20px 0 20px 0;
    }
    &__choice {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      height: 70px;
    }
    &__item-name {
      font-weight: 700;
    }
    &__button-group {
      font-size: 1.2em;
      align-items: center;
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 15px;
      &> * {
        cursor: pointer;
        width: 100%;
      }
      @media (max-width: 730px) {
          grid-template-columns: 1fr;
      }
    }
}


</style>