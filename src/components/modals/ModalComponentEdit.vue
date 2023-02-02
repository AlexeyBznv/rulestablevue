<template>
  <div class="modalEdit">
    <div class="modal__header"></div>
    <span>Edit</span>
    <button @click="close()">Close</button>
    <div class="modal__content"></div>
    <slot></slot>
    <div class="modal__footer"></div>
  </div>
</template>

<script>
export default {
  name: "ModalComponentEdit",

  methods: {
    close() {
      this.$emit('closeModalEdit')
    }
  }
}
</script>

<style scoped>

</style>
