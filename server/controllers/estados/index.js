const responseHelper = require('../../utils/response')
const Estados = require('../../models/Estados')

const get = (req, res) => {
  let query = {}
  const { sort = 'dataCriacao', limit = 10, skip = 0 } = req.query

  if (req.query.nome) query.nome = req.query.nome
  if (req.query.abreviacao) query.abreviacao = req.query.abreviacao

  Estados
    .find(query)
    .sort({ [sort]: -1 })
    .limit(Number(limit))
    .skip(Number(skip))
    .lean()
    .then(async (estados) => {
      responseHelper.success(res, { itens: estados, total: await Estados.countDocuments(query) })
    })
    .catch((error) => {
      responseHelper.errors.internalError(res, error)
    })
}

const create = (req, res) => {
  const estado = new Estados(req.body)

  estado.save()
    .then(estado => {
      responseHelper.success(res, estado)
    })
    .catch((error) => {
      responseHelper.errors.internalError(res, error)
    })
}

const put = async (req, res) => {
  const estado = await Estados.findById(req.body._id)

  estado.set(req.body)

  estado.set({
    dataAlteracao: new Date()
  })

  estado.save()
    .then(estado => {
      responseHelper.success(res, estado)
    })
    .catch((error) => {
      responseHelper.errors.internalError(res, error)
    })
}

const remove = (req, res) => {
  Estados.deleteOne({ _id: req.query._id })
    .then(estado => {
      responseHelper.success(res, estado)
    })
    .catch((error) => {
      responseHelper.errors.internalError(res, error)
    })
}


module.exports = {
  create,
  get,
  put,
  remove
}