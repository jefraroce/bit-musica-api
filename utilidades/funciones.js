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
            .json({ mensaje: mensajeDeError || error });
        console.error("[Error en Base De Datos] : ", error);
    } else if (valorAEnviarEnExito.length != 0) {
        let respuestaAvatar = {
            _id: valorAEnviarEnExito[0]._id,
            nombre: valorAEnviarEnExito[0].nombre,
            avatar: valorAEnviarEnExito[0].avatar,
        };
        respuesta.status(codigoDeEstado || 200).json(respuestaAvatar);
    } else {
        respuesta
            .status(codigoDeEstado || 401)
            .json({ mensaje: "Usuario no encontrado" });
    }
};

module.exports = { responder, responderloggin };