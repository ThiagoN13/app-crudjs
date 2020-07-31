<template>
  <div>
    <div class="row">
      <div class="col-8">
        <h2>Cidades</h2>
      </div>

      <div class="col-4 text-right">
        <button type="button" class="btn btn-primary" @click="abrirFormulario()">Adicionar</button>
      </div>
    </div>

    <hr>

    <filtro ref="filtro" @filtrar="onChange"></filtro>

    <hr>

    <div class="row mb-2" v-for="cidade in cidades" :key="cidade._id">
      <div class="col-12">
        <div class="card rounded">
          <div class="card-body">
            <div class="row">
              <div class="col-md-4">
                 <b>ID:</b> <span>{{ cidade._id }}</span>
              </div>

              <div class="col-md-4">
                 <b>Nome:</b> <span>{{ cidade.nome }}</span>
              </div>

              <div class="col-md-4">
                 <b>Estado:</b> <span>{{ (cidade.estado || {}).nome || '-' }}</span>
              </div>
            </div>

            <div class="row mt-md-2">
              <div class="col-md-4">
                 <b>Data criação:</b> <span>{{ cidade.dataCriacao | formataData }}</span>
              </div>

              <div class="col-md-6">
                 <b>Data atualização:</b> <span>{{ cidade.dataAlteracao | formataData }}</span>
              </div>
            </div>
          </div>

          <div class="card-footer">
            <div class="row">
              <div class="col-6">
                <button type="button" class="btn btn-primary w-100" @click="abrirFormulario(cidade)">Editar</button>
              </div>

              <div class="col-6">
                <button type="button" class="btn btn-danger w-100" @click="confirmarDelecao(cidade._id)">Excluir</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="text-center" v-if="cidades.length == 0">
      Sem dados.
    </div>

    <paginacao
      class="mt-3 mb-5"
      ref="paginacao"
      v-if="cidades.length > 0"
      :limit="10"
      :total="total"
      @change="onChange">
    </paginacao>

    <form-cidade ref="FormCidade"></form-cidade>

    <confirmar-delecao ref="ConfirmarDelecao" @deletar="apagar"></confirmar-delecao>

  </div>
</template>

<script>
import FormCidade from './form/FormCidade'
import { mapActions, mapGetters } from 'vuex'
import Paginacao from '../../components/Paginacao'
import Filtro from './filtro/Filtro'
import ConfirmarDelecao from '../../components/ConfirmarDelecao'

export default {
  components: {
    FormCidade,
    Paginacao,
    Filtro,
    ConfirmarDelecao
  },

  created () {
    this.buscar()
  },

  methods: {
    ...mapActions({
      buscar: 'cidades/buscar',
      remover: 'cidades/remover'
    }),

    onChange () {
      const filtro = this.$refs.filtro.filtro
      const paginacao = this.$refs.paginacao.options

      this.buscar(Object.assign({}, filtro, paginacao))
    },

    abrirFormulario (cidade) {
      this.$refs.FormCidade.open(cidade)
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
      cidades: 'cidades/cidades',
      total: 'cidades/total'
    })
  }
}
</script>

<style>

</style>