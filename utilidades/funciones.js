const nodemailer = require('nodemailer');

const responder = function (error, respuesta, valorAEnviarEnExito, mensajeDeError, codigoDeEstado) {
  if (error) {
    respuesta.status(codigoDeEstado || 500).json({ mensaje: mensajeDeError || error })
    console.error('[Error en Base De Datos] : ', error)
  } else {
    respuesta.status(codigoDeEstado || 200).json(valorAEnviarEnExito)
  }
}

const enviarCorreo = function (correoElectronico, asunto, mensaje) {


  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: true,

    auth: {
      user: 'bitmusica2@gmail.com',
      pass: 'Bit-music@'
    }
  });

  const mailOptions = {
    from: 'bitmusica2@gmail.com',
    to: correoElectronico,
    subject: asunto,
    text: mensaje
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

module.exports = { responder, enviarCorreo }
