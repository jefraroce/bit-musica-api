const express = require('express')
const mongoose = require('mongoose')
const rutasDeCanciones = require('./componentes/canciones/rutas')

const app = express()
const PUERTO = 3000

app.use('/canciones', rutasDeCanciones)

// mongodb+srv://DB_USER:DB_PASSWORD@DB_HOST:DB_PORT/DB_NAME
mongoose.connect('mongodb://127.0.0.1:27017/bit_musica', {useNewUrlParser: true})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'Error de conexión: '))
db.once('open', function() {
  console.log('La conexión a la DB fue exitosa!')
})

app.listen(PUERTO)
