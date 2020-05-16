const mongoose = require('mongoose')

const usuarioSchema = new mongoose.Schema({
  nombre: String,
  correoElectronico: String,
  contrasena: String,
  avatar: String
})

const Usuario = mongoose.model('usuarios', usuarioSchema)

module.exports = Usuario
