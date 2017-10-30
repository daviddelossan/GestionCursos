"use strict";


var path = require("path");
var conexion = "conexion.js";
var express = require("express");
var app = express();
var mysql = require("mysql");
var bodyParser = require("body-parser");
var config = require("./config");
var consultas = require("./consultas");


app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());

// Áñadir contactos
app.post("/registro", function (request, response) {
    var nuevoUsuario = request.body;

    consultas.insertarUsuario(nuevoUsuario, function (err, resultado) {
        if (!err) {
            response.status(201);
        } else {
            response.status(500);
        }
    });
    response.end();
});

app.get("/login/:correo/:password", function (request, response){
    var usuarioABuscar = {};
    usuarioABuscar.correo = request.params.correo;
    usuarioABuscar.password = request.params.password;
    
    consultas.buscarUsuarioPorCorreo(usuarioABuscar, function(err, resultado){
        if(!err && resultado !== undefined){
            response.status(200);
            response.json({correo: resultado.correo,
                            password: resultado.password});
        }
        else{
            response.status(401);
        }
    });
    
});

//Modulo curso
app.post("/curso/crear", function (request, response) {
    var nuevoCurso = request.body;

    consultas.insertarCurso(nuevoCurso, function (err, resInsertar) {
        if (!err) {
            response.status(201);
        } else {
            response.status(500);
        }
    });
    response.end();
});
app.get("/curso/crear", function (request, response) {
    var nuevoCurso = request.body;

    consultas.recuperarUltimoCurso(function (err, resId) {
        if (!err) {
      
          
            response.json({idCurso: resId});

        } else {
            response.status(500);
            response.end();
        }

    });
});

app.put("/curso/actualizar/:indice", function (request, response) {
    var cursoModificado = request.body;
    cursoModificado.id = request.params.indice;
    consultas.actualizarCurso(cursoModificado, function (err, resultado) {
        if (err) {
            response.status(400);
        } else {
            response.status(200);
        }
    });

    response.end();
});
app.delete("/curso/eliminar/:indice", function (request, response) {
    var curso = {};
    curso.id = Number(request.params.indice);
    if (!isNaN(curso.id)) {
        consultas.eliminarHorario(curso, function (err, resHorario) {
            consultas.eliminarCurso(curso, function (err, resultado) {
                if (!err) {
                    // Código 200 = OK
                    response.status(200);
                } else {
                    // Error 404 = Not found
                    response.status(404);
                }

            });
        })

    }
    response.end();
});
app.get("/curso/buscar/:indice", function (request, response) {
    var curso = {};
    curso.id = Number(request.params.indice);
    if (!isNaN(curso.id)) {
        consultas.mostrarCurso(curso, function (err, resMostrarCurso) {
            consultas.buscarHorarioIdCurso(curso, function (err, resBuscarHorario) {
                if (!err) {
                    // Código 200 = OK
                    curso = resMostrarCurso[0];
                    curso.horarios = [];
                    curso.horarios = resBuscarHorario;
                    response.json({resultado: curso});

                } else {
                    // Error 404 = Not found
                    console.log("Doy error");
                    response.status(404);
                    response.end();
                }

            })


        });
    }
});
app.get("/curso/buscar/:cadena/:pagina", function (request, response) {
    var curso = {};
    var pagina = Number(request.params.pagina);


    curso.titulo = request.params.cadena;


    if (curso.titulo !== "") {

        consultas.buscarNumeroCursosTexto(curso, function (err, resNum) {

            if (!err) {
                consultas.buscarCursosTexto(curso, pagina, function (err, resultado) {
                    if (!err) {

                        // Código 200 = OK
                          response.json({resultado: resultado,
                            numCursos: resNum.numCursos});

                    } else {
                        // Error 404 = Not found
                        console.log("Doy error");
                        response.status(404);
                        response.end();
                    }

                });
            } else {
                console.log("Doy error");
                response.status(404);
                response.end();
            }
        })
    }

});

app.post("/curso/crear/crearHorario", function (request, response) {
    var nuevoHorario = request.body;

    consultas.insertarHorario(nuevoHorario, function (err, resInsertar) {
        if (!err) {
            response.status(201);
        } else {
            response.status(500);   
        }

    });
    response.end();
});

app.listen(3000, function () {
    console.log("Escuchando en 3000");
});