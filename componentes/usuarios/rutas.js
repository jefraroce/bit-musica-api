const express = require("express");
const router = express.Router();
const Usuario = require("./modelo");
const {
    responder,
    responderloggin,
    responderEmail,
} = require("../../utilidades/funciones");

/**
 * Consulta de todas las usuarios
 * GET /usuarios
 */
router.get("/", function(solicitud, respuesta) {
    Usuario.find({}, ['nombre', 'correoElectronico', 'avatar'], function(error, usuarios) {
        responder(error, respuesta, usuarios);
    });
});

router.post("/email", function(solicitud, respuesta) {
    Usuario.find({ correoElectronico: solicitud.body.correoElectronico },
        function(error, usuario) {
            responderEmail(error, respuesta, usuario);
        }
    );
});

/**
 * Consulta una canción por su ID
 * GET /usuarios/:id
 */
router.get("/:id", function(solicitud, respuesta) {
    Usuario.findById(solicitud.params.id, function(error, usuario) {
        responder(error, respuesta, usuario);
    });
});

/**
 * Crea una nueva sesión
 * POST /usuarios/login
 */
router.post("/login", function(solicitud, respuesta) {
    Usuario.find({
            correoElectronico: solicitud.body.correoElectronico,
            contrasena: solicitud.body.contrasena,
        },
        function(error, usuario) {
            responderloggin(error, respuesta, usuario);
        }
    );
});

/**
 * Crea un nuevo usuario
 * POST /usuarios
 */
router.post("/", function(solicitud, respuesta) {
    const nuevaUsuario = new Usuario(solicitud.body);
    nuevaUsuario.save(function(error, usuarioCreado) {
        responder(error, respuesta, usuarioCreado);
    });
});

/**
 * Actualiza una canción por su ID
 * PUT /usuarios/:id
 */
router.put("/:id", function(solicitud, respuesta) {
    Usuario.findByIdAndUpdate(solicitud.params.id, solicitud.body, function(
        error,
        usuarioViejo
    ) {
        if (error) {
            console.error("Error actualizando el usuario: ", error);
            respuesta.status(500).json({ mensaje: "Error actualizando el usuario." });
        } else {
            Usuario.findById(solicitud.params.id, function(error, usuario) {
                responder(error, respuesta, usuario);
            });
        }
    });
});

/**
 * Actualiza una canción por su ID
 * DELETE /usuarios/:id
 */
router.delete("/:id", function(solicitud, respuesta) {
    Usuario.findByIdAndDelete(solicitud.params.id, function(
        error,
        usuarioEliminado
    ) {
        responder(
            error,
            respuesta, { mensaje: "El usuario ha sido eliminado." },
            "El usuario NO ha podido ser eliminado."
        );
    });
});

module.exports = router;
