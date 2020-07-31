<template>
  <div class="row">
    <div class="col-md-5 m-auto">
      <div id="accordion">
        <div class="card">
          <div class="card-header" id="headLogin">
            <h5 class="mb-0">
              <button type="button" class="btn btn-link w-100" data-toggle="collapse" data-target="#login" aria-expanded="true" aria-controls="login" @click="limparErros()">
                Login
              </button>
            </h5>
          </div>

          <div id="login" class="collapse show" aria-labelledby="headLogin" data-parent="#accordion">
            <div class="card-body">
              <div class="m-auto">
                <form>
                  <div class="form-group">
                    <label for="">Email</label>
                    <input class="form-control" :class="{ 'is-invalid': hasErro('email') }" placeholder="seuemail@example.com" v-model="form.email" name="email" type="text">
                  </div>

                  <div class="form-group">
                    <label for="">Senha</label>
                    <input class="form-control" :class="{ 'is-invalid': hasErro('senha') }" placeholder="Senha" name="senha" v-model="form.senha" type="password" value="">
                  </div>

                  <div class="checkbox">
                    <label>
                      <input name="remember" type="checkbox" value="Lembrar"> Lembrar
                    </label>
                  </div>

                  <button type="button" class="btn btn-lg btn-success btn-block" @click="logar()">Login</button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header" id="headerCadastro">
            <h5 class="mb-0">
              <button type="button" class="btn btn-link w-100 collapsed" data-toggle="collapse" data-target="#cadastro" aria-expanded="false" aria-controls="cadastro" @click="limparErros()">
                Cadastro
              </button>
            </h5>
          </div>

          <div id="cadastro" class="collapse" aria-labelledby="headerCadastro" data-parent="#accordion">
            <div class="card-body">
              <div class="m-auto">
                <form>
                  <div class="form-group">
                    <label for="">Nome</label>
                    <input class="form-control" :class="{ 'is-invalid': hasErro('nome') }" name="nome" type="text" v-model="form.nome">
                  </div>

                  <div class="form-group">
                    <label for="">Email</label>
                    <input class="form-control" :class="{ 'is-invalid': hasErro('email') }" placeholder="seuemail@example.com" v-model="form.email" name="email" type="text">
                  </div>

                  <div class="form-group">
                    <label for="">Senha</label>
                    <input class="form-control" :class="{ 'is-invalid': hasErro('senha') }"  placeholder="Senha" v-model="form.senha" name="senha" type="password" value="">
                  </div>

                  <button type="button" class="btn btn-lg btn-success btn-block" @click="cadastrar()">Cadastrar</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      form: {},
      erros: []
    }
  },
  methods: {
    ...mapActions({
      login: 'auth/login',
      adicionar: 'auth/adicionar',
    }),

    async logar () {
      try {
        if (this.isLoginInvalido()) return

        await this.login(this.form)

        this.$router.push('/estados')
      } catch (error) {
        console.log(error)
      }
    },

    async cadastrar () {
      if (this.isCadastroInvalido()) return

      await this.adicionar(this.form)

      this.logar()
    },

    limparErros () {
      this.erros = []
    },

    isLoginInvalido () {
      if (!this.form.email) {
        this.erros.push('email')
      }

      if (!this.form.senha) {
        this.erros.push('senha')
      }

      return this.erros.length > 0
    },

    isCadastroInvalido () {
      if (!this.form.nome) {
        this.erros.push('nome')
      }

      if (!this.form.email) {
        this.erros.push('email')
      }

      if (!this.form.senha) {
        this.erros.push('senha')
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