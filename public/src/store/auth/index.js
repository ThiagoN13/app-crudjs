import axios from 'axios'
import { transfromObjectInQueryString } from '../../lib/utils'

const auth = {
  namespaced: true,
  state: {
    token: null,
    total: 0,
    usuarios: [],
    usuario: {}
  },
  mutations: {
    login (state, usuario) {
      state.usuario = usuario
    },

    setToken (state, token) {
      state.token = token
      localStorage.setItem('jwt', token)
    },

    logout (state) {
      state.usuario = {}
    },

    setar (state, usuarios) {
      state.usuarios = usuarios.itens
      state.total = usuarios.total
    },

    adicionar (state, usuario) {
      state.usuarios.unshift(usuario)
    },

    remover (state, id) {
      const index = state.usuarios.findIndex(usuario => usuario._id === id)

      state.usuarios.splice(index, 1)
    },

    atualizar (state, dados) {
      const index = state.usuarios.findIndex(usuario => usuario._id === dados._id)

      state.usuarios.splice(index, 1, dados)
    }
  },
  actions: {
    async adicionar (contexto, usuario) {
      const { data } = await axios.post('/auth', usuario)

      contexto.commit('adicionar', data.data)
    },

    async login (contexto, usuario) {
      const { data = {} } = await axios.post('/auth/login', usuario)

      const { tokens } = data.data || {}
      const { token } = tokens

      contexto.commit('setToken', token)
    },

    async logout (contexto) {
      await axios.post('/auth/logout')

      contexto.commit('logout')
    },

    async buscar (contexto, filtro) {
      const { data = {} } = await axios.get(`/auth${transfromObjectInQueryString(filtro)}`, filtro)

      contexto.commit('setar', data.data)
    },

    async remover (contexto, id) {
      await axios.delete(`/auth?_id=${id}`)

      contexto.commit('remover', id)
    },

    async atualizar (contexto, usuario) {
      const { data = {} } = await axios.put('/auth', usuario)

      contexto.commit('atualizar', data.data)
    }
  },
  getters: {
    usuario (state) {
      return state.usuario
    },

    usuarios (state) {
      return state.usuarios
    },

    getToken (state) {
      return state.token
    },

    total (state) {
      return state.total
    }
  }
}
  
export default auth