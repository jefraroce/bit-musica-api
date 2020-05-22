const mongoose = require('mongoose')

const mensajeSchema = new mongoose.Schema({
  nombre: String,
  correoElectronico: String,
  mensaje: String
})

const Mensaje = mongoose.model('mensajes', mensajeSchema)

module.exports = Mensaje

// Envio de correos con mensaje de agradecimiento

// var nodemailer = require('nodemailer');

// var transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'bitmusica2@gmail.com',
//     pass: 'Bit-music@'
//   }
// });

// var mailOptions = {
//   from: 'bitmusica2@gmail.com',
//   to: 'bitmusica2020@gmail.com',
//   subject: 'Sending Email using Node.js',
//   text: 'That was easy!'
// };

// transporter.sendMail(mailOptions, function(error, info){
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// });