const express = require('express')
const router = express.Router()
const Cancion = require('./modelo')

/**
 * Consulta de todas las canciones
 * GET /canciones
 */
router.get('/', function (solicitud, respuesta) {
  Cancion.find(function (error, canciones) {
    if (error) {
      console.error('Error consultando canciones: ', error)
      respuesta.status(500).send('Error consultando las canciones.')
    } else {
      respuesta.status(200).send({ canciones: canciones })
    }
  })
})

/**
 * Consulta una canción por su ID
 * GET /canciones/:id
 */
router.get('/:id', function (solicitud, respuesta) {
  Cancion.findById(solicitud.params.id, function (error, cancion) {
    if (error) {
      console.error('Error consultando cancion por el ID: ', error)
      respuesta.status(500).json({ mensaje: 'Error consultando la canción.' })
    } else {
      respuesta.status(200).json({ cancion: cancion })
    }
  })
})

/**
 * Crea una nueva canción
 * POST /canciones
 */
router.post('/', function (solicitud, respuesta) {
  const nuevaCancion = new Cancion(solicitud.body)
  nuevaCancion.save(function (error, cancionCreada) {
    if (error) {
      console.error('Error creando canción: ', error)
      respuesta.status(500).json({ mensaje: 'Error actualizando la canción.' })
    } else {
      respuesta.status(201).json({ cancion: cancionCreada })
    }
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
        if (error) {
          console.error('Error consultando la canción actualizada: ', error)
          respuesta.status(500).json({ mensaje: 'Error consultando la canción actualizada.' })
        } else {
          respuesta.status(200).json({ cancion: cancion })
        }
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
    if (error) {
      console.error(`Error eliminando canción por el ID ${solicitud.params.id} `, error)
      respuesta.status(500).json({ mensaje: 'La canción NO ha podido ser eliminada.' })
    } else {
      respuesta.status(200).json({ mensaje: 'La canción ha sido eliminada.' })
    }
  })
})

module.exports = router
