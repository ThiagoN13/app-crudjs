<template>
  <div>
    <div class="row">
      <div class="col-8">
        <h2>Usuários</h2>
      </div>

      <div class="col-4 text-right">
        <button type="button" class="btn btn-primary" @click="abrirFormulario">Adicionar</button>
      </div>
    </div>

    <hr>

    <filtro ref="filtro" @filtrar="onChange"></filtro>

    <hr>

    <div class="row mb-2" v-for="usuario in usuarios" :key="usuario._id">
      <div class="col-12">
        <div class="card rounded">
          <div class="card-body">
            <div class="row">
              <div class="col-md-4">
                 <b>ID:</b> <span>{{ usuario._id }}</span>
              </div>

              <div class="col-md-4">
                 <b>Nome:</b> <span>{{ usuario.nome }}</span>
              </div>

              <div class="col-md-4">
                 <b>Email:</b> <span>{{ usuario.email }}</span>
              </div>
            </div>

            <div class="row mt-md-2">
              <div class="col-md-4">
                 <b>Data criação:</b> <span>{{ usuario.dataCriacao | formataData }}</span>
              </div>

              <div class="col-md-6">
                 <b>Data atualização:</b> <span>{{ usuario.dataAlteracao | formataData }}</span>
              </div>
            </div>
          </div>

          <div class="card-footer">
            <div class="row">
              <div class="col-6">
                <button type="button" class="btn btn-primary w-100" @click="abrirFormulario(usuario)">Editar</button>
              </div>

              <div class="col-6">
                <button type="button" class="btn btn-danger w-100" @click="confirmarDelecao(usuario._id)">Excluir</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="text-center" v-if="usuarios.length == 0">
      Sem dados.
    </div>

    <paginacao
      class="mt-3 mb-5"
      ref="paginacao"
      v-if="usuarios.length > 0"
      :limit="10"
      :total="total"
      @change="onChange">
    </paginacao>

    <form-usuario ref="FormUsuario" @deletar="apagar"></form-usuario>

    <confirmar-delecao ref="ConfirmarDelecao" @deletar="apagar"></confirmar-delecao>

  </div>
</template>

<script>
import FormUsuario from './form/FormUsuario'
import { mapActions, mapGetters } from 'vuex'
import Paginacao from '../../components/Paginacao'
import Filtro from './filtro/Filtro'
import ConfirmarDelecao from '../../components/ConfirmarDelecao'

export default {
  components: {
    FormUsuario,
    ConfirmarDelecao,
    Paginacao,
    Filtro
  },

  created () {
    this.buscar()
  },

  methods: {
    ...mapActions({
      remover: 'auth/remover',
      buscar: 'auth/buscar'
    }),

    onChange () {
      const filtro = this.$refs.filtro.filtro
      const paginacao = this.$refs.paginacao.options

      this.buscar(Object.assign({}, filtro, paginacao))
    },

    confirmarDelecao (usuario) {
      this.$refs.ConfirmarDelecao.open(usuario)
    },

    abrirFormulario (usuario) {
      this.$refs.FormUsuario.open(usuario)
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
      usuarios: 'auth/usuarios',
      total: 'auth/total'
    })
  }
}
</script>


<style>

</style>