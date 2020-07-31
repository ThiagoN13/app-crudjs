<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{ 'disabled': pagina === 1 }" >
        <a class="page-link" @click="btnAnterior">
          <span aria-hidden="true">&laquo;</span>
          <span class="sr-only">Previous</span>
        </a>
      </li>

      <li
        class="page-item"
        :class="{ 'active': numero == pagina }"
        v-for="numero in totalPaginas" :key="numero"
        @click="selecionarPagina(numero)">
        <a class="page-link">{{ numero }}</a>
      </li>

      <li class="page-item" :class="{ 'disabled': pagina === totalPaginas }">
        <a class="page-link" @click="btnProximo">
          <span aria-hidden="true">&raquo;</span>
          <span class="sr-only">Next</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    limit: {
      type: Number,
      default: 0
    },

    total: {
      type: Number,
      default: 0
    }
  },

  data () {
    return {
      options: {},
      pagina: 1
    }
  },

  methods: {
    selecionarPagina (pagina) {
      this.pagina = pagina

      this.onChange()
    },

    onChange () {
      this.options = {
        skip: (this.pagina * this.limit) - this.limit,
        limit: this.pagina * this.limit
      }

      this.$emit('change', this.options)
    },

    btnAnterior () {
      if (this.pagina - 1 === 0) return

      this.pagina--

      this.onChange()
    },

    btnProximo () {
      if (this.pagina + 1 > this.totalPaginas) return

      this.pagina++

      this.onChange()
    }
  },

  computed: {
    totalPaginas () {
      if (this.limit > this.total) return 1

      return Math.ceil(this.total / this.limit)
    }
  }
}
</script>

<style scoped>
.page-link {
  cursor: pointer;
}
</style>