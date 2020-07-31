import Vue from 'vue'

Vue.filter('formataData', function (data) {
  if (!data) return '-'

  data = new Date(data)

  return data.toLocaleString()
})