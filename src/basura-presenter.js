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
} from "./basura-model.js";

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
} from "./basura-view.js";

const elementos = obtenerElementosVista();

const COLORES_MENSAJE = {
    ERROR: "red",
    EXITO: "green",
    LIMPIO: ""
};

let indiceHorarioEditando = null;

function mostrarError(elementoMensaje, mensaje) {
    mostrarMensaje(elementoMensaje, mensaje, COLORES_MENSAJE.ERROR);
}

function mostrarExito(elementoMensaje, mensaje) {
    mostrarMensaje(elementoMensaje, mensaje, COLORES_MENSAJE.EXITO);
}

function actualizarVistaPrincipalAdmin() {
    actualizarSelectZonas(obtenerZonas());
    renderizarRutas(obtenerHorarios(), obtenerZonas());
}

function manejarResultadoFormulario(resultado, elementoMensaje) {
    if (!resultado.exito) {
        mostrarError(elementoMensaje, resultado.mensaje);
        return false;
    }

    mostrarExito(elementoMensaje, resultado.mensaje);
    return true;
}

function mostrarLoginAdmin() {
    elementos.sectionCiudadano.style.display = "none";
    elementos.sectionLogin.style.display = "block";
}

function volverVistaCiudadano() {
    elementos.sectionLogin.style.display = "none";
    elementos.sectionCiudadano.style.display = "block";
}

function iniciarSesion(evento) {
    evento.preventDefault();

    const datosLogin = obtenerDatosLogin();
    const resultado = validarLogin(datosLogin.usuario, datosLogin.pass);

    if (!resultado.exito) {
        mostrarError(elementos.msgLogin, resultado.mensaje);
        return;
    }

    mostrarPanelAdmin(true);
}

function guardarZona(evento) {
    evento.preventDefault();

    const datosZona = obtenerDatosZona();
    const resultado = registrarZona(datosZona.nombre, datosZona.barrios);

    if (!manejarResultadoFormulario(resultado, elementos.msgZona)) {
        return;
    }

    limpiarFormularioZona();
    actualizarSelectZonas(obtenerZonas());
}

function guardarHorario(evento) {
    evento.preventDefault();

    const datosHorario = obtenerDatosHorario();
    const resultado = indiceHorarioEditando !== null
        ? editarHorario(
            indiceHorarioEditando,
            datosHorario.zonaSeleccionada,
            datosHorario.dias,
            datosHorario.hora
        )
        : registrarHorario(
            datosHorario.zonaSeleccionada,
            datosHorario.dias,
            datosHorario.hora
        );

    if (!manejarResultadoFormulario(resultado, elementos.msgHorario)) {
        return;
    }

    limpiarFormularioHorario();
    desactivarModoEdicion();
    indiceHorarioEditando = null;
    actualizarVistaPrincipalAdmin();
}

function editarHorarioSeleccionado(evento) {
    if (!evento.target.classList.contains("btn-edit")) {
        return;
    }

    const indiceHorario = Number.parseInt(evento.target.getAttribute("data-index"), 10);
    const horarioSeleccionado = obtenerHorarios()[indiceHorario];

    if (!horarioSeleccionado) {
        return;
    }

    indiceHorarioEditando = indiceHorario;
    cargarDatosEnFormularioHorario(horarioSeleccionado);
    activarModoEdicion();

    elementos.formHorario.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

function consultarHorariosPorZona() {
    const zonaSeleccionada = obtenerZonaConsulta();
    const resultado = verHorariosPorZona(zonaSeleccionada);

    limpiarVistaHorariosCiudadano();

    if (!resultado.exito) {
        mostrarError(elementos.msgConsultaHorario, resultado.mensaje);
        return;
    }

    renderizarHorariosCiudadano(resultado.datos);
}

function consultarZonasDisponibles() {
    const resultado = verZonasDisponibles();

    limpiarVistaZonasCiudadano();

    if (!resultado.exito) {
        mostrarError(elementos.msgVerZonas, resultado.mensaje);
        return;
    }

    renderizarZonasCiudadano(resultado.datos);
}

function guardarReporte(evento) {
    evento.preventDefault();

    const datosReporte = obtenerDatosReporte();
    const resultado = registrarReporte(
        datosReporte.zonaSeleccionada,
        datosReporte.descripcion
    );

    if (!manejarResultadoFormulario(resultado, elementos.msgReporte)) {
        return;
    }

    limpiarFormularioReporte();
}

function consultarReportesAdmin() {
    const resultado = verReportesAdmin();

    limpiarVistaReportesAdmin();

    if (!resultado.exito) {
        mostrarError(elementos.msgVerReportes, resultado.mensaje);
        return;
    }

    renderizarReportesAdmin(resultado.datos);
}

function cerrarSesion() {
    limpiarFormularioZona();
    limpiarFormularioHorario();
    desactivarModoEdicion();

    indiceHorarioEditando = null;

    mostrarPanelAdmin(false);
    mostrarMensaje(elementos.msgLogin, "", COLORES_MENSAJE.LIMPIO);
}

function inicializarEventos() {
    elementos.btnMostrarLogin.addEventListener("click", mostrarLoginAdmin);
    elementos.btnVolverCiudadano.addEventListener("click", volverVistaCiudadano);
    elementos.formLogin.addEventListener("submit", iniciarSesion);
    elementos.formZona.addEventListener("submit", guardarZona);
    elementos.formHorario.addEventListener("submit", guardarHorario);
    elementos.listaRutas.addEventListener("click", editarHorarioSeleccionado);
    elementos.btnVerHorarios.addEventListener("click", consultarHorariosPorZona);
    elementos.btnVerZonas.addEventListener("click", consultarZonasDisponibles);
    elementos.formReporte.addEventListener("submit", guardarReporte);
    elementos.btnVerReportes.addEventListener("click", consultarReportesAdmin);
    elementos.btnLogout.addEventListener("click", cerrarSesion);
}

function inicializarAplicacion() {
    inicializarEventos();
    actualizarVistaPrincipalAdmin();
    mostrarPanelAdmin(false);
}

inicializarAplicacion();