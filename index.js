const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const conectarBaseDeDatos = require('./bd')
const rutasDeCanciones = require('./componentes/canciones/rutas')
const rutasDeUsuarios = require('./componentes/usuarios/rutas')

conectarBaseDeDatos()

// Inicializamos express
const app = express()
const PUERTO = process.env.PORT || 3000

// Agregamos middlewares
app.use(cors()) // Necesario para permitir requests desde cualquier dominio
app.use(bodyParser.json())

app.get('/', function(solicitud, respuesta) {
  respuesta.send('<h1>¡Bienvenidos!</h1> <h3>Menu</h3><ul><li><a href="/canciones">Ver Canciones</a></li><li><a href="/usuarios">Ver Usuarios</a></li></ul>')
})
app.use('/canciones', rutasDeCanciones)
app.use('/usuarios', rutasDeUsuarios)

app.listen(PUERTO, function() {
  console.log(`Escuchando en http://localhost:${PUERTO}`)
})
