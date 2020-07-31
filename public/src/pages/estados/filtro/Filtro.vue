<template>
<div>
  <div class="row">
    <div class="col-12">
      <h6>
        <b>Filtros</b>
      </h6>
    </div>

    <div class="col-auto">
      <input type="text" class="form-control" placeholder="Nome" v-model="filtro.nome">
    </div>

    <div class="col-auto">
      <input type="text" class="form-control" placeholder="Abreviação" v-model="filtro.estado">
    </div>

    <div class="col-auto">
      <button type="button" class="btn btn-info" @click="$emit('filtrar', filtro)">Pesquisar</button>
    </div>
  </div>

  <div class="row justify-content-end">
    <div class="col-md-2">
      <select name="" class="form-control form-control-sm" v-model="filtro.sort" @change="$emit('filtrar', filtro)">
        <option value="" selected disabled>Ordenar por</option>
        <option value="_id">ID</option>
        <option value="nome">Nome</option>
        <option value="abreviacao">Abreviação</option>
        <option value="dataAlteracao">Data de atualização</option>
        <option value="dataCriacao">Data de criação</option>
      </select>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      filtro: {}
    }
  }
}
</script>

<style>

</style>