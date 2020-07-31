<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand text-center text-md-left" href="#"><b>App</b></a>

    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item" :class="{ 'active': isIncludes('cidades') }">
          <router-link class="nav-link text-center text-md-left" to="/cidades" v-if="isAutenticado">Cidades</router-link>
        </li>

        <li class="nav-item" :class="{ 'active': isIncludes('estados') }">
          <router-link class="nav-link text-center text-md-left" to="/estados" v-if="isAutenticado">Estados</router-link>
        </li>

        <li class="nav-item" :class="{ 'active': isIncludes('usuarios') }">
          <router-link class="nav-link text-center text-md-left" to="/usuarios" v-if="isAutenticado">Usuários</router-link>
        </li>
      </ul>

      <div class="w-100 d-flex">
        <button class="btn btn-outline-danger my-2 my-sm-0 m-auto mr-md-0" type="button" @click="btnLogout" v-if="isAutenticado">Sair</button>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      isAutenticado: false
    }
  },

  methods: {
    ...mapActions({
      logout: 'auth/logout'
    }),

    isIncludes (path) {
      return this.$route.name.includes(path)
    },

    async btnLogout () {
      try {
        await this.logout()

        localStorage.removeItem('jwt')

        this.$router.push('/')
      } catch (error) {
        console.log(error)
      }
    }
  },

  computed: {
    ...mapGetters({
      getToken: 'auth/getToken'
    })
  },

  watch: {
    $route: {
      immediate: true,
      handler () {
        this.isAutenticado = Boolean(localStorage.getItem('jwt')) 
      }
    }
  }
}
</script>

<style>

</style>