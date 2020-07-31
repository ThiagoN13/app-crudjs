<template>
  <div class="modal fade" id="confirmarDelecao" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-sm modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-body">
          <span>
            Confirma remover este registro ?
          </span>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-sm btn-secondary" data-dismiss="modal">Fechar</button>
          <button type="button" class="btn btn-sm btn-danger" @click="confirm">Confirmar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  data () {
    return {
      id: null
    }
  },

  methods: {
    open (id) {
      this.id = id
      $('#confirmarDelecao').modal()
    },

    confirm () {
      this.$emit('deletar', this.id)
      $('#confirmarDelecao').modal('hide')
    }
  }
}
</script>

<style>

</style>