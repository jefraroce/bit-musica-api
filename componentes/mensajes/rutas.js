const express = require('express')
const router = express.Router()
const Mensaje = require('./modelo')
const { responder, enviarCorreo } = require('../../utilidades/funciones')

/**
 * Consulta de todas los mensajes
 * GET /mensajes
 */
router.get('/', function (solicitud, respuesta) {
  Mensaje.find(function (error, mensajes) {
    responder(error, respuesta, mensajes)
  })
})

/**
 * Consulta un mensaje por su ID
 * GET /mensajes/:id
 */
router.get('/:id', function (solicitud, respuesta) {
  Mensaje.findById(solicitud.params.id, function (error, mensaje) {
    responder(error, respuesta, mensaje)
  })
})

/**
 * Crea un nuevo mensaje
 * POST /mensajes
 */
router.post('/', function (solicitud, respuesta) {
  const nuevoMensaje = new Mensaje(solicitud.body)
  nuevoMensaje.save(function (error, mensajeCreado) {
    responder(error, respuesta, mensajeCreado)
    enviarCorreo(mensajeCreado.correoElectronico, `Hola ${mensajeCreado.nombre}`, 'Gracias por tu Mensaje.')
  })
})

/**
 * Actualiza un mensaje por su ID
 * PUT /mensajes/:id
 */
router.put('/:id', function (solicitud, respuesta) {
  Mensaje.findByIdAndUpdate(solicitud.params.id, solicitud.body, function (error, mensajeViejo) {
    if (error) {
      console.error('Error actualizando el mensaje: ', error)
      respuesta.status(500).json({ mensaje: 'Error actualizando el mensaje.' })
    } else {
      Mensaje.findById(solicitud.params.id, function (error, mensaje) {
        responder(error, respuesta, mensaje)
      })
    }
  })
})

/**
 * Actualiza un mensaje por su ID
 * DELETE /mensajes/:id
 */
router.delete('/:id', function (solicitud, respuesta) {
  Mensaje.findByIdAndDelete(solicitud.params.id, function (error, mensajeEliminado) {
    responder(error, respuesta, { mensaje: 'El mensaje ha sido eliminado.' }, 'El mensaje NO ha podido ser eliminado.')
  })
})



module.exports = router
