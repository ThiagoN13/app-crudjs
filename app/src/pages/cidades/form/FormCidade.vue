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
              <input class="form-control" :class="{ 'is-invalid': hasErro('nome') }" placeholder="Nome da cidade" v-model="cidade.nome" name="nome" type="text" ng-model="cidade.nome">
            </div>

            <div class="form-group">
              <label for="">Estado</label>
              <select name="estado" placeholder="Estado" :class="{ 'is-invalid': hasErro('estado') }" class="form-control" v-model="cidade.estado">
                <option :value="estado._id" v-for="estado in estados" :key="estado._id">
                  {{ estado.nome }}
                </option>
              </select>
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
import { mapActions, mapGetters } from 'vuex'

export default {
  created () {
    this.buscarEstados()
  },

  data () {
    return {
      erros: [],
      cidade: {}
    }
  },

  methods: {
    ...mapActions({
      buscarEstados: 'estados/buscar',
      buscarCidades: 'cidades/buscar',
      adicionar: 'cidades/adicionar',
      atualizar: 'cidades/atualizar'
    }),

    confirmarDelecao (usuario) {
      this.$refs.ConfirmarDelecao.open(usuario)
    },

    async salvar () {
      try {
        if (this.isInvalido()) return

        if (this.cidade._id) {
          await this.atualizar(this.cidade)
        } else {
          await this.adicionar(this.cidade)
        }

        this.$root.notify({
          text: 'Comando executado com sucesso!',
          type: 'success'
        })

        this.buscarCidades()
        $('#formulario').modal('hide')
      } catch (error) {
        console.log(error)
      }
    },

    open (cidade = {}) {
      this.cidade = Object.assign({}, cidade, { estado: (cidade.estado || {})._id }) || {}

      $('#formulario').modal()
    },

    isInvalido () {
      if (!this.cidade.nome) {
        this.erros.push('nome')
      }

      if (!this.cidade.estado) {
        this.erros.push('estado')
      }

      return this.erros.length > 0
    },

    hasErro (campo) {
      return this.erros.includes(campo)
    }
  },

  computed: {
    ...mapGetters({
      estados: 'estados/estados'
    })
  }
}
</script>

<style>

</style>