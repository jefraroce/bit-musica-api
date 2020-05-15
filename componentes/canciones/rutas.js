const express = require('express')
const router = express.Router()
const Cancion = require('./modelo')

/**
 * Consulta de todas las canciones
 */
router.get('/', function (solicitud, respuesta) {
  Cancion.find(function (error, canciones) {
    if (error) {
      console.error('Error consultando canciones: ', error)
      respuesta.send('Error consultando las canciones.')
    } else {
      respuesta.send({ canciones: canciones })
    }
  })
})

/**
 * Consultar una Canción
 */
router.get('/:id', function (solicitud, respuesta) {
  Cancion.findById(solicitud.params.id, function (error, cancion) {
    if (error) {
      console.error('Error consultando cancion por el ID: ', error)
      respuesta.send('Error consultando la canción.')
    } else {
      respuesta.send({ cancion: cancion })
    }
  })
})

/**
 * Creación de una nueva canción
 */
router.post('/', function (solicitud, respuesta) {
  const nuevaCancion = new Cancion(solicitud.body)
  nuevaCancion.save(function (error, cancionCreada) {
    if (error) {
      console.error('Error creando canción: ', error)
      respuesta.send('Error actualizando la canción.')
    } else {
      respuesta.send(cancionCreada)
    }
  })
})

/**
 * Actualización de Canciones
 */
router.put('/:id', function(solicitud, respuesta) {
  Cancion.findByIdAndUpdate(solicitud.params.id, solicitud.body, function(error, cancionVieja) {
    if (error) {
      console.error('Error actualizando la canción: ', error)
      respuesta.send('Error actualizando la canción.')
    } else {
      Cancion.findById(solicitud.params.id, function (error, cancion) {
        if (error) {
          console.error('Error consultando la canción actualizada: ', error)
          respuesta.send('Error consultando la canción actualizada.')
        } else {
          respuesta.send({ cancion: cancion })
        }
      })
    }
  })

})

module.exports = router
