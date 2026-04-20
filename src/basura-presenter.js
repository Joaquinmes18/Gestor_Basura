import {
    validarLogin,
    registrarZona,
    registrarHorario,
    obtenerZonas,
    obtenerHorarios,
    verHorariosPorZona,
    verZonasDisponibles,
    registrarReporte,
    verReportesAdmin,
    editarHorario
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
    limpiarVistaReportesAdmin,
    cargarDatosEnFormularioHorario,
    activarModoEdicion,
    desactivarModoEdicion
} from './basura-view.js';

const elementos = obtenerElementosVista();
let indiceEditando = null;

elementos.btnMostrarLogin.addEventListener('click', function () {
    elementos.sectionCiudadano.style.display = 'none';
    elementos.sectionLogin.style.display = 'block';
});

elementos.btnVolverCiudadano.addEventListener('click', function () {
    elementos.sectionLogin.style.display = 'none';
    elementos.sectionCiudadano.style.display = 'block';
});

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

    const datos = obtenerDatosHorario();
    let resultado;

    if (indiceEditando !== null) {
        resultado = editarHorario(indiceEditando, datos.zonaSeleccionada, datos.dias, datos.hora);
    } else {
        resultado = registrarHorario(datos.zonaSeleccionada, datos.dias, datos.hora);
    }

    if (!resultado.exito) {
        mostrarMensaje(elementos.msgHorario, resultado.mensaje, "red");
        return;
    }

    mostrarMensaje(elementos.msgHorario, resultado.mensaje, "green");
    limpiarFormularioHorario();
    desactivarModoEdicion();
    indiceEditando = null;
    renderizarRutas(obtenerHorarios(), obtenerZonas());
});

elementos.listaRutas.addEventListener('click', function (e) {
    if (!e.target.classList.contains('btn-edit')) return;

    const index = parseInt(e.target.getAttribute('data-index'));
    const horario = obtenerHorarios()[index];

    indiceEditando = index;
    cargarDatosEnFormularioHorario(horario);
    activarModoEdicion();

    elementos.formHorario.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

elementos.btnLogout.addEventListener('click', function () {
    limpiarFormularioZona();
    limpiarFormularioHorario();
    desactivarModoEdicion();
    indiceEditando = null;
    mostrarPanelAdmin(false);
    mostrarMensaje(elementos.msgLogin, "", "");
});

actualizarSelectZonas(obtenerZonas());
renderizarRutas(obtenerHorarios(), obtenerZonas());
mostrarPanelAdmin(false);