const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EstadosSchema = new Schema({
  nome: {
    type: String,
    trim: true,
    required: true
  },

  abreviacao: {
    type: String,
    required: true,
    maxlength: 2,
    trim: true,
    uppercase: true
  },

  dataCriacao: {
    type: Date,
    default: Date.now
  },

  dataAlteracao: {
    type: Date
  }
})

const Estados = mongoose.model('estados', EstadosSchema)

module.exports = Estados
