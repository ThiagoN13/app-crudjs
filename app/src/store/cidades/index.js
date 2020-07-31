import axios from 'axios'
import { transfromObjectInQueryString } from '../../lib/utils'

const cidades = {
  namespaced: true,
  state: {
    cidades: [],
    total: 0
  },
  mutations: {
    setar (state, cidades) {
      state.cidades = cidades.itens
      state.total = cidades.total
    },

    adicionar (state, cidade) {
      state.cidades.unshift(cidade)
    },

    remover (state, id) {
      const index = state.cidades.findIndex(cidade => cidade._id === id)

      state.cidades.splice(index, 1)
    },

    atualizar (state, dados) {
      const index = state.cidades.findIndex(cidade => cidade._id === dados._id)

      state.cidades.splice(index, 1, dados)
    }
  },
  actions: {
    async buscar (contexto, filtro) {
      const { data = {} } = await axios.get(`/cidades${transfromObjectInQueryString(filtro)}`, filtro)

      contexto.commit('setar', data.data)
    },

    async adicionar (contexto, cidade) {
      const { data = {} } = await axios.post('/cidades', cidade)

      contexto.commit('adicionar', data.data)
    },

    async remover (contexto, id) {
      await axios.delete(`/cidades?_id=${id}`)

      contexto.commit('remover', id)
    },

    async atualizar (contexto, cidade) {
      const { data = {} } = await axios.put('/cidades', cidade)

      contexto.commit('atualizar', data.data)
    }

  },
  getters: {
    cidades (state) {
      return state.cidades
    },

    total (state) {
      return state.total
    }
  }
}

export default cidades