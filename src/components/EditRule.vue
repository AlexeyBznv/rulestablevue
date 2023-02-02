<template>
    <form @submit.prevent="editRule()" method="post">
      <input type="text" placeholder="title" v-model="rule.title"><br>
      <input type="text" placeholder="content" v-model="rule.content"><br>
      <input type="text" placeholder="language" v-model="rule.language"><br>
      <input type="text" placeholder="active" v-model="rule.active"><br>
      <button type="submit">Edit</button>
    </form>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "EditRule",
    computed: {
      ...mapGetters([
        'RULESLIST',
        'ID'
      ]),

      rule(){
        return this.RULESLIST.find(rule => rule.id === this.ID)
      }
    },
  methods: {
    ...mapActions([
      'editRule',
    ]),

    async editRule() {
      if(confirm("Are you sure you want to edit the rule?")) {
        await this.$store.dispatch("editRule", {
          id: this.rule.id,
          title: this.rule.title,
          content: this.rule.content,
          language: this.rule.language,
          active: this.rule.active
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
