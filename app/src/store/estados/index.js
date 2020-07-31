import axios from 'axios'
import { transfromObjectInQueryString } from '../../lib/utils'

const estados = {
  namespaced: true,
  state: {
    total: 0,
    estados: []
  },
  mutations: {
    setar (state, estados) {
      state.estados = estados.itens
      state.total = estados.total
    },

    adicionar (state, estado) {
      state.estados.unshift(estado)
    },

    remover (state, id) {
      const index = state.estados.findIndex(estado => estado._id === id)

      state.estados.splice(index, 1)
    },

    atualizar (state, dados) {
      const index = state.estados.findIndex(estado => estado._id === dados._id)

      state.estados.splice(index, 1, dados)
    }
  },
  actions: {
    async buscar (contexto, filtro) {
      const { data = {} } = await axios.get(`/estados${transfromObjectInQueryString(filtro)}`, filtro)

      contexto.commit('setar', data.data)
    },

    async adicionar (contexto, estado) {
      const { data = {} } = await axios.post('/estados', estado)

      contexto.commit('adicionar', data.data)
    },

    async remover (contexto, id) {
      await axios.delete(`/estados?_id=${id}`)

      contexto.commit('remover', id)
    },

    async atualizar (contexto, estado) {
      const { data = {} } = await axios.put('/estados', estado)

      contexto.commit('atualizar', data.data)
    }
  },
  getters: {
    estados (state) {
      return state.estados
    },

    total (state) {
      return state.total
    }
  }
}

export default estados