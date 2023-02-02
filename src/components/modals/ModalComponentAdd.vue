<template>
  <div class="modalAdd">
    <div class="modal__header"></div>
    <span>Add</span>
    <button @click="close()">Close</button>
    <div class="modal__content"></div>
    <slot></slot>
    <div class="modal__footer"></div>
  </div>
</template>

<script>
export default {
  name: "ModalComponentAdd",

  methods: {
    close() {
      this.$emit('closeModalAdd')
    }
  }
}
</script>

<style scoped>

</style>
