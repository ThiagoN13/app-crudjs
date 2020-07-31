<template>
  <div id="app">
    <navbar></navbar>
    <notificacao></notificacao>

    <div class="container mt-4 mb-5">
      <router-view></router-view>
    </div>

    <footer class="bg-light py-2">
      Feito por  🖤 Thiago Nogueira
    </footer>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import Notificacao from './components/Notificacao'

export default {
  name: 'App',
  components: {
    Navbar,
    Notificacao
  }
}
</script>

<style scoped>
footer {
  z-index: 3;
  position: fixed;
  width: 100%;
  text-align: center;
  bottom: 0;
}
</style>
