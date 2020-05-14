const express = require('express')
const mongoose = require('mongoose')

const app = express()
const PUERTO = 3000

// mongodb+srv://DB_USER:DB_PASSWORD@DB_HOST:DB_PORT/DB_NAME
mongoose.connect('mongodb://127.0.0.1:27017/bit_musica', {useNewUrlParser: true})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'Error de conexión: '))
db.once('open', function() {
  console.log('La conexión a la DB fue exitosa!')
})

const cancionSchema = new mongoose.Schema({
  nombre: String,
  artista: String,
  album: String,
  enlace: String
})

const Cancion = mongoose.model('canciones', cancionSchema)

app.get('/', function(solicitud, respuesta) {
  console.log('solicitud.query ', solicitud.query)

  Cancion.find( function(error, canciones) {
    if (error) {
      console.error('Error consultando canciones: ', error)
    } else {
      respuesta.send({ canciones: canciones })
    }
  })
})

app.listen(PUERTO)
