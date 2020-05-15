const express = require('express')
const router = express.Router()
const Cancion = require('./modelo')

router.get('/', function(solicitud, respuesta) {
  Cancion.find( function(error, canciones) {
    if (error) {
      console.error('Error consultando canciones: ', error)
    } else {
      respuesta.send({ canciones: canciones })
    }
  })
})

router.get('/:id', function(solicitud, respuesta) {
  Cancion.findById(solicitud.params.id, function(error, cancion) {
    if (error) {
      console.error('Error consultando cancion por el ID: ', error)
    } else {
      respuesta.send({ cancion: cancion })
    }
  })
})

router.post('/', function(solicitud, respuesta) {
  const nuevaCancion = new Cancion(solicitud.body)
  nuevaCancion.save(function(error, cancionCreada) {
    if (error) {
      console.error('Error creando canción: ', error)
    } else {
      respuesta.send(cancionCreada)
    }
  })
})

module.exports = router
