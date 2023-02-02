import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const resource_url = 'http://localhost:3000/rules'

export default new Vuex.Store({
  state: {
    id: null,
    rulesList: null,
    listFromDB: null,
    newRule: {
        title: '',
        content: '',
        language: '',
        active: ''
    }
  },

  getters: {
    RULESLIST(state) {
      return state.rulesList
    },
    NEW_RULE(state) {
      return state.newRule
    },
      ID(state) {
        return state.id
      },
  },

  mutations: {
      SET_RULESLIST_TO_STATE: (state, rules) => {
          rules.sort((a,b) => a.created_at > b.created_at ? 1 : -1)
          rules.forEach(i => {
                  i.created_at = new Date(i.created_at).toLocaleString()
          })
          state.rulesList = rules
          state.listFromDB = rules
      },

      DELETE_RULE: (state, ruleId) => {
          state.rulesList = state.rulesList.filter(rule => rule.id !== ruleId)
      },

      EDIT_RULE: (state, rule) => {
          state.rulesList.forEach(r => {
              if(r.id === rule.id) {
                  r.title = rule.title
                  r.content = rule.content
                  r.language = rule.language
                  r.active = rule.active
              }
          })
      },

       listFilter(state, settings) {
           state.rulesList = state.listFromDB
          if (settings.language && settings.status) {
              state.rulesList = state.rulesList.filter(rule => rule.language === settings.language)
              state.rulesList = state.rulesList.filter(rule => rule.active === Number(settings.status))
          } if (settings.language) {
              state.rulesList = state.rulesList.filter(rule => rule.language === settings.language)
          } if (settings.status) {
               state.rulesList = state.rulesList.filter(rule => rule.active === Number(settings.status))
          }
      },

      SET_ID: (state, ruleId) =>
          state.id = ruleId
  },

  actions: {
    async GET_RULES_FROM_API({ commit }) {
      return await axios.get(resource_url)
          .then((rules) => {
            commit('SET_RULESLIST_TO_STATE', rules.data)
            return rules
          })
          .catch((error) => {
            console.log(error)
            return error
          })
    },

    async addRuleToAPI(commit, rule) {
      return await axios.post(resource_url, rule)
          .then((result)=>{
              if(result.status === 201) {
                  this.dispatch('GET_RULES_FROM_API')
              }
          })
          .catch((error) => {
            console.log(error)
            return error
          })
    },

      async editRule({commit}, rule) {
          return await axios.put(resource_url, rule)
              .then((result)=>{
                  if(result.status === 202) {
                      commit('EDIT_RULE', rule)
                  }
              })
              .catch((error) => {
                  console.log(error)
                  return error
              })
      },

    deleteRule({commit}, rule) {
        axios.delete(resource_url, { headers: {id: rule.id}})
            .then((result)=>{
                if(result.status === 200) {
                    commit('DELETE_RULE', rule.id)
                }
            })
            .catch((error) => {
                console.log(error)
                return error
            })
    },

      filterRules({commit}, settings) {
        commit('listFilter', settings)
      }
  },

  modules: {
  }
})
