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
              <input class="form-control" name="nome" type="text" v-model="form.nome">
            </div>

            <div class="form-group">
              <label for="">Email</label>
              <input class="form-control" placeholder="seuemail@example.com" v-model="form.email" name="email" type="text">
            </div>

            <div class="form-group">
              <label for="">Senha</label>
              <input class="form-control" placeholder="Senha" v-model="form.senha" name="senha" type="password" value="">
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
      form: {}
    }
  },

  methods: {
    ...mapActions({
      adicionar: 'auth/adicionar',
      atualizar: 'auth/atualizar'
    }),

    open (usuario) {
      this.form = usuario || {}

      $('#formulario').modal()
    },

    async salvar () {
      try {
        if (this.form._id) {
          await this.atualizar(this.form)
        } else {
          await this.adicionar(this.form)
        }

        this.$root.notify({
          text: 'Comando executado com sucesso!',
          type: 'success'
        })

        $('#formulario').modal('hide')
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style>

</style>