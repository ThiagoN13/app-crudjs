const express = require('express')
const router = express.Router()

const CidadesController = require('../../controllers/cidades')
const AuthController = require('../../controllers/auth')

router.get('/cidades', AuthController.verificarToken,  CidadesController.get)
router.post('/cidades', AuthController.verificarToken,  CidadesController.create)
router.put('/cidades', AuthController.verificarToken,  CidadesController.put)
router.delete('/cidades', AuthController.verificarToken,  CidadesController.remove)

module.exports = router