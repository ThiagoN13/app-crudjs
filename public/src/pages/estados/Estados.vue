<template>
  <div>
    <div class="row">
      <div class="col-8">
        <h2>Estados</h2>
      </div>

      <div class="col-4 text-right">
        <button type="button" class="btn btn-primary" @click="abrirFormulario">Adicionar</button>
      </div>
    </div>

    <hr>

    <filtro ref="filtro" @filtrar="onChange"></filtro>

    <hr>

    <div class="row mb-2" v-for="estado in estados" :key="estado._id">
      <div class="col-12">
        <div class="card rounded">
          <div class="card-body">
            <div class="row">
              <div class="col-md-4">
                 <b>ID:</b> <span>{{ estado._id }}</span>
              </div>

              <div class="col-md-4">
                 <b>Nome:</b> <span>{{ estado.nome }}</span>
              </div>

              <div class="col-md-4">
                 <b>Abreviação:</b> <span>{{ estado.abreviacao }}</span>
              </div>
            </div>

            <div class="row mt-md-2">
              <div class="col-md-4">
                 <b>Data criação:</b> <span>{{ estado.dataCriacao | formataData }}</span>
              </div>

              <div class="col-md-6">
                 <b>Data atualização:</b> <span>{{ estado.dataAlteracao | formataData }}</span>
              </div>
            </div>
          </div>

          <div class="card-footer">
            <div class="row">
              <div class="col-6">
                <button type="button" class="btn btn-primary w-100" @click="abrirFormulario(estado)">Editar</button>
              </div>

              <div class="col-6">
                <button type="button" class="btn btn-danger w-100" @click="confirmarDelecao(estado._id)">Excluir</button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

    <div class="text-center" v-if="estados.length == 0">
      Sem dados.
    </div>

    <paginacao
      class="mt-3 mb-5"
      ref="paginacao"
      v-if="estados.length > 0"
      :limit="10"
      :total="total"
      @change="onChange">
    </paginacao>

    <form-estado ref="FormEstado"></form-estado>

    <confirmar-delecao ref="ConfirmarDelecao" @deletar="apagar"></confirmar-delecao>

  </div>
</template>

<script>
import FormEstado from './form/FormEstado'
import { mapActions, mapGetters } from 'vuex'
import Paginacao from '../../components/Paginacao'
import ConfirmarDelecao from '../../components/ConfirmarDelecao'
import Filtro from './filtro/Filtro'

export default {
  components: {
    FormEstado,
    Paginacao,
    ConfirmarDelecao,
    Filtro
  },

  created () {
    this.buscar()
  },

  methods: {
    ...mapActions({
      buscar: 'estados/buscar',
      remover: 'estados/remover'
    }),

    onChange () {
      const filtro = this.$refs.filtro.filtro
      const paginacao = this.$refs.paginacao.options

      this.buscar(Object.assign({}, filtro, paginacao))
    },

    abrirFormulario (estado) {
      this.$refs.FormEstado.open(estado)
    },

    confirmarDelecao (id) {
      this.$refs.ConfirmarDelecao.open(id)
    },

    async apagar (_id) {
      try {
        await this.remover(_id)

        this.$root.notify({
          text: 'Registro removido com sucesso!',
          type: 'success'
        })
      } catch (error) {
        console.log(error)
      }
    }
  },

  computed: {
    ...mapGetters({
      estados: 'estados/estados',
      total: 'estados/total'
    })
  }
}
</script>


<style>

</style>