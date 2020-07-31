import Vuex from 'vuex'
import cidades from './cidades'
import estados from './estados'
import auth from './auth'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    cidades,
    auth,
    estados
  }
})