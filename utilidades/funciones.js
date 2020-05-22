const nodemailer = require("nodemailer");

const responder = function(
    error,
    respuesta,
    valorAEnviarEnExito,
    mensajeDeError,
    codigoDeEstado
) {
    if (error) {
        respuesta
            .status(codigoDeEstado || 500)
            .json({ mensaje: mensajeDeError || error });
        console.error("[Error en Base De Datos] : ", error);
    } else {
        respuesta.status(codigoDeEstado || 200).json(valorAEnviarEnExito);
    }
};

const enviarCorreo = function (correoElectronico, asunto, mensaje) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'bitmusica2@gmail.com',
      pass: 'Bit-music@'
    }
  })

  const mailOptions = {
    from: '"BIT Música 👻" <info@bit-musica.com>',
    to: correoElectronico,
    subject: asunto,
    text: mensaje,
    html: `<h1>¡¡¡Muchas gracias por tu mensaje!!!</h1>
    <p>Cordialmente,<br/>BIT Música</p>`
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error('Error enviando correo: ', error)
    } else {
      console.log('El correo ha sido enviado: ', info.response)
    }
  })
}

const responderloggin = function(
    error,
    respuesta,
    valorAEnviarEnExito,
    mensajeDeError,
    codigoDeEstado
) {
    if (error) {
        respuesta
            .status(codigoDeEstado || 500)
            .json({ mensaje: mensajeDeError || error })
        console.error("[Error en Base De Datos] : ", error)
    } else if (valorAEnviarEnExito.length != 0) {
        let respuestaAvatar = {
            _id: valorAEnviarEnExito[0]._id,
            nombre: valorAEnviarEnExito[0].nombre,
            avatar: valorAEnviarEnExito[0].avatar,
        }
        respuesta.status(codigoDeEstado || 200).json(respuestaAvatar)
    } else {
        respuesta
            .status(codigoDeEstado || 401)
            .json({ mensaje: "Usuario no encontrado" })
    }
}

module.exports = { responder, enviarCorreo, responderloggin }
