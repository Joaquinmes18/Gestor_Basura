import {
    registrarZona,
    registrarHorario,
    obtenerZonas,
    obtenerHorarios
} from '../model/basura-model.js';

import {
    obtenerElementosVista,
    obtenerDatosZona,
    obtenerDatosHorario,
    mostrarMensaje,
    limpiarFormularioZona,
    limpiarFormularioHorario,
    actualizarSelectZonas,
    renderizarRutas
} from '../view/basura-view.js';

const elementos = obtenerElementosVista();

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

actualizarSelectZonas(obtenerZonas());
renderizarRutas(obtenerHorarios(), obtenerZonas());