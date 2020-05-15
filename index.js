const express = require('express')
const bodyParser = require('body-parser')
const conectarBaseDeDatos = require('./bd')
const rutasDeCanciones = require('./componentes/canciones/rutas')

conectarBaseDeDatos()

// Inicializamos express
const app = express()
const PUERTO = 3000

// Agregamos middlewares
app.use(bodyParser.json())

app.use('/canciones', rutasDeCanciones)

app.listen(PUERTO, function() {
  console.log(`Escuchando en http://localhost:${PUERTO}`)
})
