import {
    validarLogin,
    registrarZona,
    registrarHorario,
    obtenerZonas,
    obtenerHorarios,
    verHorariosPorZona,
    verZonasDisponibles,
    registrarReporte,
    verReportesAdmin
} from './basura-model.js';

import {
    obtenerElementosVista,
    obtenerDatosLogin,
    mostrarPanelAdmin,
    obtenerDatosZona,
    obtenerDatosHorario,
    obtenerZonaConsulta,
    obtenerDatosReporte,
    mostrarMensaje,
    limpiarFormularioZona,
    limpiarFormularioHorario,
    limpiarFormularioReporte,
    actualizarSelectZonas,
    renderizarRutas,
    renderizarHorariosCiudadano,
    renderizarZonasCiudadano,
    renderizarReportesAdmin,
    limpiarVistaHorariosCiudadano,
    limpiarVistaZonasCiudadano,
    limpiarVistaReportesAdmin
} from './basura-view.js';

const elementos = obtenerElementosVista();

elementos.formLogin.addEventListener('submit', function (e) {
    e.preventDefault();

    const datos = obtenerDatosLogin();
    const resultado = validarLogin(datos.usuario, datos.pass);

    if (!resultado.exito) {
        mostrarMensaje(elementos.msgLogin, resultado.mensaje, "red");
        return;
    }

    mostrarPanelAdmin(true);
});

mostrarPanelAdmin(false);

elementos.formZona.addEventListener('submit', function (e) {
    e.preventDefault();

    const datosZona = obtenerDatosZona();
    const resultado = registrarZona(datosZona.nombre, datosZona.barrios);

    if (!resultado.exito) {
        mostrarMensaje(elementos.msgZona, resultado.mensaje, "red");
        return;
    }

    mostrarMensaje(elementos.msgZona, resultado.mensaje, "green");
    limpiarFormularioZona();
    actualizarSelectZonas(obtenerZonas());
});

elementos.formHorario.addEventListener('submit', function (e) {
    e.preventDefault();

    const datosHorario = obtenerDatosHorario();
    const resultado = registrarHorario(
        datosHorario.zonaSeleccionada,
        datosHorario.dias,
        datosHorario.hora
    );

    if (!resultado.exito) {
        mostrarMensaje(elementos.msgHorario, resultado.mensaje, "red");
        return;
    }

    mostrarMensaje(elementos.msgHorario, resultado.mensaje, "green");
    limpiarFormularioHorario();
    renderizarRutas(obtenerHorarios(), obtenerZonas());
});

elementos.btnVerHorarios.addEventListener('click', function () {
    const zonaSeleccionada = obtenerZonaConsulta();
    const resultado = verHorariosPorZona(zonaSeleccionada);

    limpiarVistaHorariosCiudadano();

    if (!resultado.exito) {
        mostrarMensaje(elementos.msgConsultaHorario, resultado.mensaje, "red");
        return;
    }

    renderizarHorariosCiudadano(resultado.datos);
});

elementos.btnVerZonas.addEventListener('click', function () {
    const resultado = verZonasDisponibles();

    limpiarVistaZonasCiudadano();

    if (!resultado.exito) {
        mostrarMensaje(elementos.msgVerZonas, resultado.mensaje, "red");
        return;
    }

    renderizarZonasCiudadano(resultado.datos);
});

elementos.formReporte.addEventListener('submit', function (e) {
    e.preventDefault();

    const datosReporte = obtenerDatosReporte();
    const resultado = registrarReporte(
        datosReporte.zonaSeleccionada,
        datosReporte.descripcion
    );

    if (!resultado.exito) {
        mostrarMensaje(elementos.msgReporte, resultado.mensaje, "red");
        return;
    }

    mostrarMensaje(elementos.msgReporte, resultado.mensaje, "green");
    limpiarFormularioReporte();
});

elementos.btnVerReportes.addEventListener('click', function () {
    const resultado = verReportesAdmin();

    limpiarVistaReportesAdmin();

    if (!resultado.exito) {
        mostrarMensaje(elementos.msgVerReportes, resultado.mensaje, "red");
        return;
    }

    renderizarReportesAdmin(resultado.datos);
});

elementos.btnLogout.addEventListener('click', function() {
    limpiarFormularioZona();
    limpiarFormularioHorario();
    
    mostrarPanelAdmin(false);
    mostrarMensaje(elementos.msgLogin, "", "");
    
    console.log("Sesión cerrada correctamente");
});

actualizarSelectZonas(obtenerZonas());
renderizarRutas(obtenerHorarios(), obtenerZonas());