<template>
  <div class="modal fade" id="formulario" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Cadastro</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <div class="modal-body">
          <form>
            <div class="form-group">
              <label for="">Nome</label>
              <input class="form-control" :class="{ 'is-invalid': hasErro('nome') }" placeholder="Nome do estado" name="nome" type="text" v-model="estado.nome">
            </div>

            <div class="form-group">
              <label for="">Abreviação</label>
              <input class="form-control" :class="{ 'is-invalid': hasErro('abreviacao') }" placeholder="Abreviação do estado" name="abreviacao" v-model="estado.abreviacao" maxlength="2" type="text">
            </div>
          </form>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
          <button type="button" class="btn btn-primary" @click="salvar">Salvar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      erros: [],
      estado: {}
    }
  },

  methods: {
    ...mapActions({
      adicionar: 'estados/adicionar',
      atualizar: 'estados/atualizar'
    }),

    open (estado) {
      this.estado = estado || {}

      $('#formulario').modal()
    },

    async salvar () {
      try {
        if (this.isInvalido()) return

        if (this.estado._id) {
          await this.atualizar(this.estado)
        } else {
          await this.adicionar(this.estado)
        }

        this.$root.notify({
          text: 'Comando executado com sucesso!',
          type: 'success'
        })

        $('#formulario').modal('hide')
      } catch (error) {
        console.log(error)
      }
    },

    isInvalido () {
      if (!this.estado.nome) {
        this.erros.push('nome')
      }

      if (!this.estado.abreviacao) {
        this.erros.push('abreviacao')
      }

      return this.erros.length > 0
    },

    hasErro (campo) {
      return this.erros.includes(campo)
    }
  }
}
</script>

<style>

</style>