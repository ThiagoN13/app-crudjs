const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CidadesSchema = new Schema({
  estado: {
    type: Schema.Types.ObjectId,
    ref: 'estados',
    required: true
  },

  nome: {
    type: String,
    required: true
  },

  dataCriacao: {
    type: Date,
    default: Date.now
  },

  dataAlteracao: {
    type: Date
  }
})

const Cidades = mongoose.model('cidades', CidadesSchema)

module.exports = Cidades
