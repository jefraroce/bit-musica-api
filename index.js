const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const conectarBaseDeDatos = require('./bd')
const rutasDeCanciones = require('./componentes/canciones/rutas')
const rutasDeUsuarios = require('./componentes/usuarios/rutas')
const rutasDeMensajes = require('./componentes/mensajes/rutas')

conectarBaseDeDatos()

// Inicializamos express
const app = express()
const PUERTO = process.env.PORT || 3000

// Agregamos middlewares
app.use(cors()) // Necesario para permitir requests desde cualquier dominio
app.use(bodyParser.json())

// Agregamos nuestras rutas
app.get('/', function(solicitud, respuesta) {
  respuesta.send('<h1>¡Bienvenidos!</h1> <h3>Menú</h3><ul><li><a href="/canciones">Ver Canciones</a></li><li><a href="/usuarios">Ver Usuarios</a></li></ul><li><a href="/mensajes">Ver Mensajes</a></li></ul>')
})
app.use('/canciones', rutasDeCanciones)
app.use('/usuarios', rutasDeUsuarios)
app.use('/mensajes',rutasDeMensajes)


// Encendemos el servidor de express
app.listen(PUERTO, function() {
  console.log(`Escuchando en http://localhost:${PUERTO}`)
})
