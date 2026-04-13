const formZona = document.getElementById('form-zona');
const msgZona = document.getElementById('mensaje-zona');
const selectZona = document.getElementById('horario-zona');

const formHorario = document.getElementById('form-horario');
const msgHorario = document.getElementById('mensaje-horario');
const listaRutas = document.getElementById('lista-rutas');

export function obtenerElementosVista() {
    return {
        formZona,
        msgZona,
        selectZona,
        formHorario,
        msgHorario,
        listaRutas
    };
}

export function obtenerDatosZona() {
    return {
        nombre: document.getElementById('zona-nombre').value.trim(),
        barrios: document.getElementById('zona-barrios').value.trim()
    };
}

export function obtenerDatosHorario() {
    return {
        zonaSeleccionada: document.getElementById('horario-zona').value,
        dias: document.getElementById('horario-dias').value.trim(),
        hora: document.getElementById('horario-hora').value
    };
}

export function mostrarMensaje(elemento, texto, color) {
    elemento.textContent = texto;
    elemento.style.color = color;

    setTimeout(function () {
        elemento.textContent = "";
    }, 3000);
}

export function limpiarFormularioZona() {
    formZona.reset();
}

export function limpiarFormularioHorario() {
    formHorario.reset();
}

export function actualizarSelectZonas(zonas) {
    if (zonas.length === 0) {
        selectZona.innerHTML = '<option value="">-- Primero registre una zona --</option>';
        return;
    }

    selectZona.innerHTML = '<option value="">-- Seleccione una zona --</option>';

    for (let i = 0; i < zonas.length; i++) {
        const option = document.createElement('option');
        option.value = zonas[i].nombre;
        option.textContent = zonas[i].nombre;
        selectZona.appendChild(option);
    }
}

export function renderizarRutas(horarios, zonas) {
    if (horarios.length === 0) {
        listaRutas.innerHTML = '<p style="color: #666;">No hay rutas registradas aún.</p>';
        return;
    }

    listaRutas.innerHTML = '';

    for (let i = 0; i < horarios.length; i++) {
        const horario = horarios[i];

        const infoZona = zonas.find(function (z) {
            return z.nombre === horario.zona;
        });

        const div = document.createElement('div');
        div.className = 'list-item';
        div.innerHTML =
            '<h3 style="color: #764ba2; margin-bottom: 5px;">📍 ' + horario.zona + '</h3>' +
            '<p><strong>Barrios:</strong> ' + infoZona.barrios + '</p>' +
            '<p><strong>Días:</strong> ' + horario.dias + '</p>' +
            '<p><strong>Hora aprox:</strong> ' + horario.hora + '</p>';

        listaRutas.appendChild(div);
    }
}