$(document).ready(function () {
    console.log("Se ha cargado el DOM");
    ocultarTodas();
    $(".bienvenida").show();


    $("#mostrarVentana").on("click", abrirVentana);
    $("#ventana span.cerrar").on("click", cerrarVentana);
    $("#cerrar").on("click", cerrarVentana);



    $(".identificarse").on("click", function () {
        ocultarTodas();
        $(".login").show();
        
    });

    $(".registrar").on("click", function () {
        $(".login").hide();
        $(".registro").show();


    });

    $(".crearCuenta").on("click", function () {
        
         $(".registro").hide();
         $(".misCursos").show();
        
        usuario.correo = $("#campoCorreoRegistro").val();
        usuario.password = $("#campoPasswordRegistro").val();
        usuario.nombre = $("#campoNombreRegistro").val();
        usuario.apellidos = $("#campoApellidosRegistro").val();
        usuario.fecha = $("#campoFechaRegistro").val();

        if ($("#formHombre").is("checked")) {
            usuario.sexo = "hombre";
        } else {
            usuario.sexo = "mujer";
        }

        $.ajax({
            type: "POST",
            url: "/registro",
            contentType: "application/json",
            data: JSON.stringify(usuario)

        });

    });
    
    
    $(".botonEntrar").on("click", function(){
       

        
        usuario.correo = $("#campoCorreoLogin").val();
        usuario.password = $("#campoPasswordLogin").val();
        
        
        
        $.ajax({
            type: "GET",
            url: "/login/" + usuario.correo + "/" + usuario.password,
            success: function (data, textStatus, jqXHR) {    
                    $(".login").hide();
                    $(".misCursos").show();
                
            } 
        });
    });

    $(".crearCurso").on("click", function () {
        curso.titulo = $("#campoTituloCurso").val();
        curso.descripcion = $("#campoDescripcionCurso").val();
        curso.localidad = $("#campoLocalidadCurso").val();
        curso.direccion = $("#campoDireccionCurso").val();
        curso.numPlazas = $("#campoNumPlazas").val();
        curso.fechaIni = $("#campoFechaInicio").val();
        curso.fechaFin = $("#campoFechaFin").val();



        $.ajax({
            type: "POST",
            url: "/curso/crear",
            contentType: "application/json",
            data: JSON.stringify(curso)

        });


        ocultarTodas();
        $(".creacionHorarios").show();

        $.ajax({
            type: "GET",
            url: "/curso/crear",
            success: function (data, textStatus, jqXHR) {



                $("#añadirHorarioCurso").on("click", function () {
                    horario.id_curso = data.idCurso.id;
                    horario.dia = $("#campoDiaHorario").val();
                    horario.horaIni = $("#campoHorarioHoraInicio").val();
                    horario.horaFin = $("#campoHorarioHoraFin").val();


                    $.ajax({
                        type: "POST",
                        url: "/curso/crear/crearHorario",
                        contentType: "application/json",
                        data: JSON.stringify(horario)

                    });

                    $(".mensajeSistema").remove();
                    var mensaje = $("<p class = \"mensajeSistema\">").text("Horario añadido al curso");
                    $(".mensajeFeedback").append(mensaje);
                    $("#feedbackVentana").fadeIn(500);
                    $("#feedbackVentana").fadeOut(1500);


                });
                $("#terminarHorarioCurso").on("click", function () {
                    ocultarTodas();
                    $(".mensajeSistema").remove();
                    var mensaje = $("<p  class = \"mensajeSistema\">").text("Curso creado");
                    $(".mensajeFeedback").append(mensaje);
                    $("#feedbackVentana").fadeIn(500);
                    $("#feedbackVentana").fadeOut(1500);


                    $(".bienvenida").show();
                });

            }

        });


    });

    //PULSACION EN ACTUALIZACION
    $(".botonCursoAModificar").on("click", function () {
        curso.id = $("#campoIdCursoAModificar").val();
        curso.titulo = $("#campoTituloCursoAModificar").val();
        curso.descripcion = $("#campoDescripcionCursoAModificar").val();
        curso.localidad = $("#campoLocalidadCursoAModificar").val();
        curso.direccion = $("#campoDireccionCursoAModificar").val();
        curso.numPlazas = $("#campoNumPlazasAModificar").val();
        curso.fechaIni = $("#campoFechaInicioAModificar").val();
        curso.fechaFin = $("#campoFechaFinAModificar").val();

        $.ajax({
            type: "PUT",
            url: "/curso/actualizar/" + curso.id,
            contentType: "application/json",
            data: JSON.stringify(curso)

        });

        $(".mensajeSistema").remove();
        var mensaje = $("<p class = \"mensajeSistema\">").text("Curso modificado");

        ocultarTodas();
        $(".bienvenida").show();
        $(".mensajeFeedback").append(mensaje);
        $("#feedbackVentana").fadeIn(500);
        $("#feedbackVentana").fadeOut(1500);

    });

    //PULSACION EN ELIMINAR
    $(".botonCursoAEliminar").on("click", function () {
        curso.id = $("#campoIdCursoAEliminar").val();
        $.ajax({
            type: "DELETE",
            url: "/curso/eliminar/" + curso.id,
            contentType: "application/json"


        });
        $(".mensajeSistema").remove();
        var mensaje = $("<p class = \"mensajeSistema\">").text("Curso eliminado");
        ocultarTodas();
        $(".bienvenida").show();
        $(".mensajeFeedback").append(mensaje);
        $("#feedbackVentana").fadeIn(500);
        $("#feedbackVentana").fadeOut(1500);

    });








        //PULSACION EN BUSCAR CURSO
    $(".botonBuscarCursoTexto").on("click", function () {

        curso.titulo = $("#campoTextoCursoABuscar").val();
        var pagina = $(this).prop("value");
        $(".filaTabla").remove();


        $.ajax({
            type: "GET",
            url: "/curso/buscar/" + $("#campoTextoCursoABuscar").val() + "/" + pagina,
            success: function (data, textStatus, jqXHR) {
                $(".filaTabla").remove();
                    $(".tituloTabla").remove();
                    $(".celdaPagina").remove();
                    $(".horarioTabla").remove();

                //Si hay resultados
                if (data.resultado.length > 0) {
                    
                    var fila = $("<tr class =\"tituloTabla\">");
                    var celdaTitulo = $("<td class = \"celdaTituloTabla\">").text("Nombre");
                    var celdaLugar = $("<td class = \"celdaTituloTabla\">").text("Lugar");
                    var celdaInicio = $("<td class = \"celdaTituloTabla\">").text("Inicio");
                    var celdaFin = $("<td class = \"celdaTituloTabla\">").text("Fin");
                    var celdaVacantes = $("<td class = \"celdaTituloTabla\">").text("Vacantes");
                    var botonCelda = $("<button class = \"botonCeldaTitulo\">");

                    $(".tablaResultados").append(fila);
                    fila.append(celdaTitulo);
                    fila.append(celdaLugar);
                    fila.append(celdaInicio);
                    fila.append(celdaFin);
                    fila.append(celdaVacantes);

                    for (var i = 0; i < data.resultado.length; i++) {



                        fila = $("<tr class =\"filaTabla\">");

                        $(".tablaResultados").append(fila);

                        botonCelda = $("<button class = \"botonCelda\" value = \"" + data.resultado[i].idcurso + "\">");
                        celdaTitulo = $("<td class = \"celdaTabla\">");
                        celdaTitulo.append(botonCelda.text(data.resultado[i].titulo));

                        botonCelda = $("<button class = \"botonCelda\" value = \"" + data.resultado[i].idcurso + "\">");
                        celdaLugar = $("<td class = \"celdaTabla\">");
                        celdaLugar.append(botonCelda.text(data.resultado[i].localidad));

                        botonCelda = $("<button class = \"botonCelda\" value = \"" + data.resultado[i].idcurso + "\">");
                        celdaInicio = $("<td class = \"celdaTabla\">");
                        celdaInicio.append(botonCelda.text(data.resultado[i].fechaIni));

                        botonCelda = $("<button class = \"botonCelda\" value = \"" + data.resultado[i].idcurso + "\">");
                        celdaFin = $("<td class = \"celdaTabla\">");
                        celdaFin.append(botonCelda.text(data.resultado[i].fechaFin));

                        botonCelda = $("<button class = \"botonCelda\" value = \"" + data.resultado[i].idcurso + "\">");
                        celdaVacantes = $("<td class = \"celdaTabla\">");
                        celdaVacantes.append(botonCelda.text(data.resultado[i].numPlazas));

                        $(".tablaResultados").append(fila);
                        fila.append(celdaTitulo);
                        fila.append(celdaLugar);
                        fila.append(celdaInicio);
                        fila.append(celdaFin);
                        fila.append(celdaVacantes);
                    }

                    $(".botonCelda").on("click", function () {
                        $(".horarioTabla").remove();
                        curso.id = $(this).prop("value");
                        $.ajax({
                            type: "GET",
                            url: "/curso/buscar/" + curso.id,
                            success: function (data, textStatus, jqXHR) {
                                var duracion = "Desde el " + data.resultado.fechaIni + " hasta el " + data.resultado.fechaFin;
                                $("#ventana").fadeIn(500);
                                $(".tituloEmergente").text(data.resultado.titulo);
                                $(".descripcionEmergente").text(data.resultado.descripcion);
                                $(".lugarEmergente").text(data.resultado.direccion);
                                $(".ciudadEmergente").text(data.resultado.localidad);
                                $(".plazasEmergente").text(data.resultado.numPlazas);
                                $(".duracionEmergente").text(duracion);
                                var horarios = "";
                                var filaDia = $("<p>");
                                for (var i = 0; i < data.resultado.horarios.length; ++i) {
                                    var filaDia = $("<p class = \"horarioTabla\">>");
                                    filaDia.text(data.resultado.horarios[i].dia + " de " + data.resultado.horarios[i].horaIni + " a " + data.resultado.horarios[i].horaFin);
                                    $(".horarioEmergente").append(filaDia);
                                }


                            }
                        });
                    });



                    var botonPagina;
                    var filaPagina = $("<tr class =\"filaPagina\">");
                    var celdaPagina;

                    //PAGINACIÓN
                    for (var i = 0; i <= data.numCursos / 5; i++) {
                        botonPagina = $("<button class = \"botonPagina botonLogueo botonBuscarCursoTexto\" value = \" " + 5 * i + " \" >").text(i + 1);
                        celdaPagina = $("<td class = \"celdaPagina\">");
                        celdaPagina.append(botonPagina);
                        $(".tablaPaginacion").append(celdaPagina);
                    }

                    $(".tablaResultados").append(filaPagina);

                    $(".botonPagina").on("click", function () {

                        pagina = $(this).prop("value");

                        $.ajax({

                            type: "GET",
                            url: "/curso/buscar/" + $("#campoTextoCursoABuscar").val() + "/" + pagina,
                            success: function (data, textStatus, jqXHR) {
                               
                               $(".filaTabla").remove();
                              


                                if (data.resultado.length > 0) {
                                    
                                    for (var i = 0; i < data.resultado.length; i++) {
                                        fila = $("<tr class =\"filaTabla\">");

                                        $(".tablaResultados").append(fila);

                                        botonCelda = $("<button class = \"botonCelda\" value = \"" + data.resultado[i].idcurso + "\">");
                                        celdaTitulo = $("<td class = \"celdaTabla\">");
                                        celdaTitulo.append(botonCelda.text(data.resultado[i].titulo));

                                        botonCelda = $("<button class = \"botonCelda\" value = \"" + data.resultado[i].idcurso + "\">");
                                        celdaLugar = $("<td class = \"celdaTabla\">");
                                        celdaLugar.append(botonCelda.text(data.resultado[i].localidad));

                                        botonCelda = $("<button class = \"botonCelda\" value = \"" + data.resultado[i].idcurso + "\">");
                                        celdaInicio = $("<td class = \"celdaTabla\">");
                                        celdaInicio.append(botonCelda.text(data.resultado[i].fechaIni));

                                        botonCelda = $("<button class = \"botonCelda\" value = \"" + data.resultado[i].idcurso + "\">");
                                        celdaFin = $("<td class = \"celdaTabla\">");
                                        celdaFin.append(botonCelda.text(data.resultado[i].fechaFin));

                                        botonCelda = $("<button class = \"botonCelda\" value = \"" + data.resultado[i].idcurso + "\">");
                                        celdaVacantes = $("<td class = \"celdaTabla\">");
                                        celdaVacantes.append(botonCelda.text(data.resultado[i].numPlazas));

                                        $(".tablaResultados").append(fila);
                                        fila.append(celdaTitulo);
                                        fila.append(celdaLugar);
                                        fila.append(celdaInicio);
                                        fila.append(celdaFin);
                                        fila.append(celdaVacantes);
                                    }

                                    $(".botonCelda").on("click", function () {
                                        curso.id = $(this).prop("value");
                                        $(".horarioTabla").remove();
                                        $.ajax({
                                            type: "GET",
                                            url: "/curso/buscar/" + curso.id,
                                            success: function (data, textStatus, jqXHR) {
                                                $("<body>").addClass("grisModal");
                                                var duracion = "Desde el " + data.resultado.fechaIni + " hasta el " + data.resultado.fechaFin;
                                                $("#ventana").fadeIn(500);
                                                $(".tituloEmergente").text(data.resultado.titulo);
                                                $(".descripcionEmergente").text(data.resultado.descripcion);
                                                $(".lugarEmergente").text(data.resultado.direccion);
                                                $(".ciudadEmergente").text(data.resultado.localidad);
                                                $(".plazasEmergente").text(data.resultado.numPlazas);
                                                $(".duracionEmergente").text(duracion);

                                                var horarios = "";
                                                var filaDia = $("<p>");
                                                for (var i = 0; i < data.resultado.horarios.length; ++i) {
                                                    var filaDia = $("<p class = \"horarioTabla\">>");
                                                    filaDia.text(data.resultado.horarios[i].dia + " de " + data.resultado.horarios[i].horaIni + " a " + data.resultado.horarios[i].horaFin);
                                                    $(".horarioEmergente").append(filaDia);
                                                }

                                            }

                                        });

                                    });

                               


                                        var botonPagina;
                                        var filaPagina = $("<tr class =\"filaPagina\">");
                                        var celdaPagina;

                                        for (var i = 0; i <= data.resultado.length / 5; i++) {

                                            // var link = "/curso/buscar/" + $("#campoTextoCursoABuscar").val() + "/" + 5 * i;

                                            //    botonPagina  = $("<a class = \"botonPagina botonLogueo\" href = \" " + link + " \" >");

                                            botonPagina = $("<button class = \"botonPagina botonLogueo botonBuscarCursoTexto\" value = \" " + 5 * i + " \" >");
                                            celdaPagina = $("<td class = \"celdaPagina\">");
                                            celdaPagina.append(botonPagina);
                                            filaPagina.append(celdaPagina);
                                        }

                                 }
                                 
                                 else{
                                    $(".mensajeSistema").remove();
                                    var mensaje = $("<p class = \"mensajeSistema\">").text("No se ha encontrado ningun curso");
                                    $(".mensajeFeedback").append(mensaje);
                                    $("#feedbackVentana").fadeIn(500);
                                    $("#feedbackVentana").fadeOut(1500);

                                     
                                 }



                            }
                        });
                    });
                }// Si hay resultados

                //Si no hay resultados
                else {
                    $(".mensajeSistema").remove();
                    var mensaje = $("<p class = \"mensajeSistema\">").text("No se ha encontrado ningun curso");

                    $(".mensajeFeedback").append(mensaje);
                    $("#feedbackVentana").fadeIn(500);
                    $("#feedbackVentana").fadeOut(1500);


                }



            }
        });
        
        
        
        
        
    });


    $(".portalCursos").on("click", function () {
        ocultarTodas();
        $(".bienvenida").show();
        //Borramos busquedas anteriores
        $(".filaTabla").remove();
        $(".tituloTabla").remove();
        $(".celdaPagina").remove();
    });

    $(".redireccionCrear").on("click", function () {
        ocultarTodas();
        $(".registroCurso").show();
    });
    $(".redireccionActualizar").on("click", function () {
        ocultarTodas();
        $(".buscarCursoAModificar").show();
    });
    $(".redireccionBorrar").on("click", function () {
        ocultarTodas();
        $(".buscarCursoAEliminar").show();
    });
    $(".buscarCursos").on("click", function () {
        ocultarTodas();
        $("#buscarCursoTexto").show();
    });


});

//VAR GLOBALEs
var usuario = {};
var curso = {};
var horario = {};

function abrirVentana() {
    $("#ventana").show();
    $.ajax({
        type: "GET",
        url: "/curso/buscar/" + $("#campoIdCursoABuscar").val(),
        success: function (data, textStatus, jqXHR) {
            var texto = $("<p>").text("CREADO DESDE JQUERY");

            $(".buscarCurso").append(texto);
        }

    });
}

function cerrarVentana() {
    $("#ventana").hide();
}

function mostrarCurso() {
    $("#ventana").fadeIn([500]);
}

function ocultarTodas() {
    $(".busqueda").hide();
    $(".misCursos").hide();
    $(".registro").hide();
    $("#buscarCurso").hide();
    $("#buscarCursoTexto").hide();
    $(".buscarCursoAEliminar").hide();
    $(".login").hide();
    $(".registroCurso").hide();
    $(".buscarCursoAModificar").hide();
    $(".tituloTablaResultado").hide();
    $(".bienvenida").hide();
    $(".creacionHorarios").hide();
    $("#feedbackVentana").hide();

}