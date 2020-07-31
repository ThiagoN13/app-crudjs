const responseHelper = require('../../utils/response')
const Cidades = require('../../models/Cidades')

const get = (req, res) => {
  let query = {}
  const { sort = 'dataCriacao', limit = 10, skip = 0 } = req.query

  if (req.query.nome) query.nome = req.query.nome
  if (req.query.estado) query.estado = req.query.estado

  Cidades
    .find(query)
    .populate('estado')
    .sort({ [sort]: -1 })
    .limit(Number(limit))
    .skip(Number(skip))
    .lean()
    .then(async (cidades) => {
      responseHelper.success(res, { itens: cidades, total: await Cidades.countDocuments(query) })
    })
    .catch((error) => {
      responseHelper.errors.internalError(res, error)
    })
}

const create = (req, res) => {
  const cidade = new Cidades(req.body)

  cidade.save()
    .then(async (cidade) => {
      responseHelper.success(res, cidade)
    })
    .catch((error) => {
      responseHelper.errors.internalError(res, error)
    })
}

const put = async (req, res) => {
  const cidade = await Cidades.findById(req.body._id)

  cidade.set(req.body)

  cidade.set({
    dataAlteracao: new Date()
  })

  cidade.save()
    .then(cidade => {
      responseHelper.success(res, cidade)
    })
    .catch((error) => {
      responseHelper.errors.internalError(res, error)
    })
}

const remove = (req, res) => {
  Cidades.deleteOne({ _id: req.query._id })
    .then(cidade => {
      responseHelper.success(res, cidade)
    })
    .catch((error) => {
      responseHelper.errors.internalError(res, error)
    })
}

module.exports = {
  create,
  remove,
  put,
  get
}