<template>
  <form @submit.prevent="addRule()" method="post">
    <input type="text" placeholder="title" v-model="title"><br>
    <input type="text" placeholder="content" v-model="content"><br>
    <select name="language" v-model="language">
      <option value="en">en</option>
      <option value="ru">ru</option>
    </select><br>
    <select name="condition" v-model="condition">
      <option value=1>active</option>
      <option value=0>disabled</option>
    </select><br>
    <button type="submit">Add Rule</button>
  </form>
</template>

<script>

import { mapActions } from "vuex";

export default {
  name: "AddRule",
  data() {
    return {
      title: '',
      content: '',
      language: 'en',
      condition: 1
    }
  },

  methods: {
    ...mapActions([
      'addRuleToAPI',
    ]),

    addRule() {
      if(this.title.trim() && this.content.trim()) {
        this.$store.dispatch("addRuleToAPI", {
          title: this.title,
          content: this.content,
          language: this.language,
          active: this.condition
        })
      } else {
        alert("fields cannot be empty")
      }
    }
  }
}

</script>

<style scoped>

</style>
