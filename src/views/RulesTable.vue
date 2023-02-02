<template>
  <div class="rules">
    <h1>Rules List</h1>
    <button @click="showModalAdd()">Add Rule</button>
    <ModalComponentAdd v-if="isModalAddVisible" @closeModalAdd="closeModalAdd()">
      <slot>
        <AddRule/>
      </slot>
    </ModalComponentAdd>
    <select name="Language" v-model=language>
      <option value="">all</option>
      <option value="ru">ru</option>
      <option value="en">en</option>
    </select>
    <select name="Active" v-model=status>
      <option value="">all</option>
      <option value="1">active</option>
      <option value="0">disabled</option>
    </select>
    <div class="block">
      <span class="demonstration">Date</span>
<!--      <el-date-picker-->
<!--          v-model="date"-->
<!--          type="date"-->
<!--          placeholder="Pick a day">-->
<!--      </el-date-picker>-->
    </div>
    <button @click="filterRules(language, status)">Sort</button>
    <table>
      <tr>
        <td>id</td>
        <td>active</td>
        <td>title</td>
        <td>date</td>
        <td>content</td>
        <td>language</td>
        <td>edit</td>
        <td>delete</td>
      </tr>
      <tr v-for="item in RULESLIST" v-bind:key="item.id">
        <td>{{ item.id }}</td>
        <td>{{ item.active }}</td>
        <td>{{ item.title }}</td>
        <td>{{ item.created_at }}</td>
        <td>{{ item.content }}</td>
        <td>{{ item.language }}</td>
        <td>
          <button @click="showModalEdit(item.id)">edit</button>
          <ModalComponentEdit v-if="isModalEditVisible" @closeModalEdit="closeModalEdit()">
            <slot>
              <EditRule
                  v-bind:id="item.id"
              />
              <!--              <router-link :to="{ name: 'edit', params: {id: item.id}}">Edit</router-link>-->
            </slot>
          </ModalComponentEdit>
        </td>
        <td>
          <button @click="deleteRule(item)">Delete</button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import AddRule from "@/components/AddRule"
import EditRule from "@/components/EditRule"
import { mapActions, mapGetters, mapMutations } from 'vuex'
import ModalComponentAdd from "@/components/modals/ModalComponentAdd"
import ModalComponentEdit from "@/components/modals/ModalComponentEdit"
// import ElementUIComponent from ""

export default {
  name: "RulesTable",
  data() {
    return {
      date: '',
      status: '',
      language: '',
      isModalAddVisible: false,
      isModalEditVisible: false
    }
  },

  mounted() {
    this.GET_RULES_FROM_API()
  },

  components: {
    AddRule,
    EditRule,
    ModalComponentAdd,
    ModalComponentEdit
  },

  computed: {
    ...mapGetters([
        'RULESLIST',
        'ID'
    ]),
  },

  methods: {
    ...mapActions([
      'GET_RULES_FROM_API',
      'deleteRule',
    ]),

    ...mapMutations([
      'SET_ID'
    ]),

    filterRules(language, status) {
      this.$store.dispatch('filterRules', {language: language, status: status})
    },

    deleteRule(rule) {
      if(confirm("Are you sure you want to delete the rule?" + rule.title)) {
        this.$store.dispatch('deleteRule', rule)
      }
    },

    showModalAdd() {
      this.isModalAddVisible = true
    },

    closeModalAdd() {
      this.isModalAddVisible = false
    },

    showModalEdit(id) {
      this.isModalEditVisible = true
      this.SET_ID(id)
    },

    closeModalEdit() {
      this.isModalEditVisible = false
    }
  }
}

</script>

<style scoped>

</style>
