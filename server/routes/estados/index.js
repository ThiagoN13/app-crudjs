const express = require('express')
const router = express.Router()

const EstadosController = require('../../controllers/estados')
const AuthController = require('../../controllers/auth')

router.get('/estados', AuthController.verificarToken,  EstadosController.get)
router.post('/estados', AuthController.verificarToken,  EstadosController.create)
router.put('/estados', AuthController.verificarToken,  EstadosController.put)
router.delete('/estados', AuthController.verificarToken,  EstadosController.remove)

module.exports = router