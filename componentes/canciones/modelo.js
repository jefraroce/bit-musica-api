const mongoose = require('mongoose')

const cancionSchema = new mongoose.Schema({
  nombre: String,
  artista: String,
  album: String,
  enlace: String
})

const Cancion = mongoose.model('canciones', cancionSchema)

module.exports = Cancion
