module.exports = {
    //Modulo de usuario
    insertarUsuario: function insertarUsuario(usuario, callback) {
        var sql = "INSERT INTO usuario (correo, password, nombre, apellidos, sexo, fecha) VALUES (?, ?, ?, ?, ?, ?) ";
        conexion.query(sql, [usuario.correo, usuario.password, usuario.nombre, usuario.apellidos, usuario.sexo, usuario.fecha],
                function (err, rows) {
                    if (err) {
                        console.error(err);
                        console.error("Usuario ya existente");
                    } else {

                        console.log("Usuario creada");
                        callback(null, rows);
                    }
                });
    },
    
    buscarUsuarioPorCorreo: function buscarUsuarioPorCorreo(usuario, callback){
 
        var sql = "SELECT * FROM usuario WHERE usuario.correo = " + usuario.correo + " AND usuario.password = " + usuario.password + ";";
        conexion.query(sql, function(err, rows){
            if(err || rows[0] === undefined){
                console.error("Error al hacer el login");
                callback(null, undefined);
            }
            else{
                console.log("Usuario logueado");
                callback(null, rows[0]);
            }
        });
    },
    
//Modulo de Cursos
    insertarCurso: function insertarCurso(curso, callback) {
        var sql = "INSERT INTO curso (titulo, localidad, direccion, numPlazas, descripcion, fechaIni, fechaFin) VALUES (?, ?, ?, ?, ?, ?, ?) ";
        conexion.query(sql, [curso.titulo, curso.localidad, curso.direccion, curso.numPlazas, curso.descripcion, curso.fechaIni, curso.fechaFin],
                function (err, rows) {
                    if (err) {
                        console.error(err);
                        console.error("Curso ya existente");
                    } else {

                        console.log("Curso Creado");
                        callback(null, rows[0]);
                    }
                });
    },

    actualizarCurso: function actualizarCurso(curso, callback) {

        var sql = "UPDATE curso SET " +
                "curso.titulo = '" + curso.titulo + "', " +
                "curso.localidad = '" + curso.localidad + "', " +
                "curso.direccion = '" + curso.direccion + "', " +
                "curso.numPlazas = " + curso.numPlazas + ", " +
                "curso.descripcion = '" + curso.descripcion + "', " +
                "curso.fechaIni = '" + curso.fechaIni + "', " +
                "curso.fechaFin = '" + curso.fechaFin + "' " +
                "where curso.idcurso = " + curso.id + ";"
                ;
        conexion.query(sql,
                function (err, rows) {
                    if (err) {
                        console.error(err);
                        console.error("Fallo al actualizar curso");
                    } else {

                        console.log("Curso Actualizado");
                        callback(null, rows);
                    }
                });
    },

    eliminarCurso: function eliminarCurso(curso, callback) {
        var sql = "DELETE FROM curso WHERE idcurso = " + curso.id + ";";
        conexion.query(sql,
                function (err, rows) {
                    if (err) {
                        console.error(err);
                        console.error("Curso No existente");
                        callback(err, undefined);
                    } else {

                        console.log("Curso Eliminado");
                        callback(null, rows);
                    }
                });
    },

    recuperarUltimoCurso: function recuperarUltimoCurso(callback) {
        var sql = "SELECT @@identity AS id";
        conexion.query(sql,
                function (err, rows) {
                    if (err) {
                        console.error(err);
                        console.error("No hay cursos");
                    } else {

                        console.log("Curso Recuperado");
                        callback(null, rows[0]);
                    }
                });
    }
    ,
    mostrarCurso: function mostrarCurso(curso, callback) {
        var sql = "SELECT * FROM curso WHERE curso.idcurso = " + curso.id + ";";
        conexion.query(sql,
                function (err, rows) {
                    if (err) {
                        console.error(err);
                        console.error("Curso No existente");
                        callback(err, undefined);
                    } else {

                        console.log("Curso mostrado");
                        callback(null, rows);
                    }
                });
    },
    buscarCursosTexto: function buscarCursosTexto(curso, pagina, callback) {


        var sql = "SELECT * FROM curso WHERE curso.titulo LIKE '%" + curso.titulo + "%' LIMIT 5 OFFSET " + pagina + ";";

        conexion.query(sql,
                function (err, rows) {
                    if (err) {
                        console.error(err);
                        console.error("No se han encontrado cursos");
                        callback(err, undefined);
                    } else {
                        console.log("Cursos mostrado");
                        callback(null, rows);
                    }
                });
    },
    buscarNumeroCursosTexto: function buscarNumeroCursosTexto(curso, callback) {

        var sql = "SELECT COUNT (*) AS numCursos FROM curso WHERE curso.titulo LIKE '%" + curso.titulo + "%'";

        conexion.query(sql,
                function (err, rows) {
                    if (err) {
                        console.error(err);
                        console.error("No se han encontrado cursos");
                        callback(err, undefined);
                    } else {
                        
                        console.log("Cursos mostrado");
                        callback(null, rows[0]);
                    }
                });
    },
    eliminarHorario: function eliminarHorario(curso, callback) {
        var sql = "DELETE FROM horario WHERE horario.id_curso = " + curso.id + ";";
        conexion.query(sql,
                function (err, rows) {
                    if (err) {
                        console.error(err);
                        console.error("Horario No existente");
                        callback(err, undefined);
                    } else {

                        console.log("Horario Eliminado");
                        callback(null, rows);
                    }
                });
    },
    insertarHorario: function insertarHorario(horario, callback) {
        var sql = "INSERT INTO horario (id_curso, horaIni, horaFin, dia) VALUES (?, ?, ?, ?) ";
        conexion.query(sql, [horario.id_curso, horario.horaIni, horario.horaFin, horario.dia],
                function (err, rows) {
                    if (err) {
                        console.error(err);
                        console.error("Curso ya existente");
                    } else {

                        console.log("Horario añadido");
                        callback(null, rows[0]);
                    }
                });
    },
    buscarHorarioIdCurso: function buscarHorarioIdCurso(curso, callback) {
        console.log("Muestro el id del curso");
        console.log(curso);
        var sql = "SELECT * FROM horario WHERE horario.id_curso = '" + curso.id + "';";

        conexion.query(sql,
                function (err, rows) {
                    if (err) {
                        console.error(err);
                        console.error("No se han encontrado cursos");
                        callback(err, undefined);
                    } else {
                        console.log("Cursos mostrado");
                        callback(null, rows);
                    }
                });
    }
    ,

};
//Modulo de horario





var mysql = require("mysql");
var config = require("./config");
var conexion = mysql.createConnection({
    host: config.dbHost,
    user: config.dbUser,
    password: config.dbPassword,
    database: config.dbName
});
