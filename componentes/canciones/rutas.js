const express = require('express')
const router = express.Router()
const Cancion = require('./modelo')
const { responder } = require('../../utilidades/funciones')

/**
 * Consulta de todas las canciones
 * GET /canciones
 */
router.get('/', function (solicitud, respuesta) {
  Cancion.find(function (error, canciones) {
    responder(error, respuesta, canciones)
  })
})

/**
 * Consulta una canción por su ID
 * GET /canciones/:id
 */
router.get('/:id', function (solicitud, respuesta) {
  Cancion.findById(solicitud.params.id, function (error, cancion) {
    responder(error, respuesta, cancion)
  })
})

/**
 * Crea una nueva canción
 * POST /canciones
 */
router.post('/', function (solicitud, respuesta) {
  const nuevaCancion = new Cancion(solicitud.body)
  nuevaCancion.save(function (error, cancionCreada) {
    responder(error, respuesta, cancionCreada)
  })
})

/**
 * Actualiza una canción por su ID
 * PUT /canciones/:id
 */
router.put('/:id', function (solicitud, respuesta) {
  Cancion.findByIdAndUpdate(solicitud.params.id, solicitud.body, function (error, cancionVieja) {
    if (error) {
      console.error('Error actualizando la canción: ', error)
      respuesta.status(500).json({ mensaje: 'Error actualizando la canción.' })
    } else {
      Cancion.findById(solicitud.params.id, function (error, cancion) {
        responder(error, respuesta, cancion)
      })
    }
  })
})

/**
 * Actualiza una canción por su ID
 * DELETE /canciones/:id
 */
router.delete('/:id', function (solicitud, respuesta) {
  Cancion.findByIdAndDelete(solicitud.params.id, function (error, cancionEliminada) {
    responder(error, respuesta, { mensaje: 'La canción ha sido eliminada.' }, 'La canción NO ha podido ser eliminada.')
  })
})

module.exports = router
