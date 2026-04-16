const formLogin = document.getElementById('form-login');
const msgLogin = document.getElementById('mensaje-login');
const sectionLogin = document.getElementById('section-login');
const sectionAdmin = document.getElementById('section-admin');
const btnLogout = document.getElementById('btn-logout');

const formZona = document.getElementById('form-zona');
const msgZona = document.getElementById('mensaje-zona');
const selectZona = document.getElementById('horario-zona');

const formHorario = document.getElementById('form-horario');
const msgHorario = document.getElementById('mensaje-horario');
const listaRutas = document.getElementById('lista-rutas');

const selectConsultaZona = document.getElementById('consulta-zona');
const btnVerHorarios = document.getElementById('btn-ver-horarios');
const msgConsultaHorario = document.getElementById('mensaje-consulta-horario');
const listaHorariosCiudadano = document.getElementById('lista-horarios-ciudadano');

const btnVerZonas = document.getElementById('btn-ver-zonas');
const msgVerZonas = document.getElementById('mensaje-ver-zonas');
const listaZonasCiudadano = document.getElementById('lista-zonas-ciudadano');

const formReporte = document.getElementById('form-reporte');
const selectReporteZona = document.getElementById('reporte-zona');
const msgReporte = document.getElementById('mensaje-reporte');

const btnVerReportes = document.getElementById('btn-ver-reportes');
const msgVerReportes = document.getElementById('mensaje-ver-reportes');
const listaReportesAdmin = document.getElementById('lista-reportes-admin');

export function obtenerElementosVista() {
    return {
        formLogin,
        msgLogin,
        sectionLogin,
        sectionAdmin,
        formZona,
        msgZona,
        selectZona,
        formHorario,
        msgHorario,
        listaRutas,
        selectConsultaZona,
        btnVerHorarios,
        msgConsultaHorario,
        listaHorariosCiudadano,
        btnVerZonas,
        msgVerZonas,
        listaZonasCiudadano,
        formReporte,
        selectReporteZona,
        msgReporte,
        btnVerReportes,
        msgVerReportes,
        listaReportesAdmin,
        btnLogout
    };
}

export function obtenerDatosLogin() {
    return {
        usuario: document.getElementById('login-user').value.trim(),
        pass: document.getElementById('login-pass').value.trim()
    };
}

export function mostrarPanelAdmin(mostrar) {
    if (mostrar) {
        sectionLogin.style.display = 'none';
        sectionAdmin.style.display = 'block';
        return;
    }

    sectionLogin.style.display = 'block';
    sectionAdmin.style.display = 'none';
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

export function obtenerZonaConsulta() {
    return selectConsultaZona.value;
}

export function obtenerDatosReporte() {
    return {
        zonaSeleccionada: document.getElementById('reporte-zona').value,
        descripcion: document.getElementById('reporte-descripcion').value.trim()
    };
}

export function mostrarMensaje(elemento, texto, color) {
    elemento.textContent = texto;
    elemento.style.color = color;
}

export function limpiarFormularioZona() {
    formZona.reset();
}

export function limpiarFormularioHorario() {
    formHorario.reset();
}

export function limpiarFormularioReporte() {
    formReporte.reset();
}

export function actualizarSelectZonas(zonas) {
    selectZona.innerHTML = '';
    selectConsultaZona.innerHTML = '';
    selectReporteZona.innerHTML = '';

    if (zonas.length === 0) {
        selectZona.innerHTML = '<option value="">-- Primero registre una zona --</option>';
        selectConsultaZona.innerHTML = '<option value="">-- No hay zonas disponibles --</option>';
        selectReporteZona.innerHTML = '<option value="">-- No hay zonas disponibles --</option>';
        return;
    }

    const optionAdminInicial = document.createElement('option');
    optionAdminInicial.value = '';
    optionAdminInicial.textContent = '-- Seleccione una zona --';
    selectZona.appendChild(optionAdminInicial);

    const optionCiudadanoInicial = document.createElement('option');
    optionCiudadanoInicial.value = '';
    optionCiudadanoInicial.textContent = '-- Seleccione una zona --';
    selectConsultaZona.appendChild(optionCiudadanoInicial);

    const optionReporteInicial = document.createElement('option');
    optionReporteInicial.value = '';
    optionReporteInicial.textContent = '-- Seleccione una zona --';
    selectReporteZona.appendChild(optionReporteInicial);

    for (let i = 0; i < zonas.length; i++) {
        const optionAdmin = document.createElement('option');
        optionAdmin.value = zonas[i].nombre;
        optionAdmin.textContent = zonas[i].nombre;
        selectZona.appendChild(optionAdmin);

        const optionCiudadano = document.createElement('option');
        optionCiudadano.value = zonas[i].nombre;
        optionCiudadano.textContent = zonas[i].nombre;
        selectConsultaZona.appendChild(optionCiudadano);

        const optionReporte = document.createElement('option');
        optionReporte.value = zonas[i].nombre;
        optionReporte.textContent = zonas[i].nombre;
        selectReporteZona.appendChild(optionReporte);
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

export function renderizarHorariosCiudadano(horariosZona) {
    listaHorariosCiudadano.innerHTML = '';

    for (let i = 0; i < horariosZona.length; i++) {
        const horario = horariosZona[i];

        const div = document.createElement('div');
        div.className = 'list-item';
        div.innerHTML =
            '<h3 style="color: #764ba2; margin-bottom: 5px;">🕒 ' + horario.zona + '</h3>' +
            '<p><strong>Días:</strong> ' + horario.dias + '</p>' +
            '<p><strong>Hora aprox:</strong> ' + horario.hora + '</p>';

        listaHorariosCiudadano.appendChild(div);
    }
}

export function renderizarZonasCiudadano(zonas) {
    listaZonasCiudadano.innerHTML = '';

    for (let i = 0; i < zonas.length; i++) {
        const div = document.createElement('div');
        div.className = 'list-item';
        div.innerHTML =
            '<h3 style="color: #764ba2; margin-bottom: 5px;">📍 ' + zonas[i].nombre + '</h3>' +
            '<p><strong>Barrios:</strong> ' + zonas[i].barrios + '</p>';

        listaZonasCiudadano.appendChild(div);
    }
}

export function renderizarReportesAdmin(reportes) {
    listaReportesAdmin.innerHTML = '';

    for (let i = 0; i < reportes.length; i++) {
        const reporte = reportes[i];

        const div = document.createElement('div');
        div.className = 'list-item';
        div.innerHTML =
            '<h3 style="color: #764ba2; margin-bottom: 5px;">🗑️ Reporte ' + (i + 1) + '</h3>' +
            '<p><strong>Zona:</strong> ' + reporte.zona + '</p>' +
            '<p><strong>Descripción:</strong> ' + reporte.descripcion + '</p>' +
            '<p><strong>Fecha:</strong> ' + reporte.fecha + '</p>';

        listaReportesAdmin.appendChild(div);
    }
}

export function limpiarVistaHorariosCiudadano() {
    listaHorariosCiudadano.innerHTML = '';
    msgConsultaHorario.textContent = '';
}

export function limpiarVistaZonasCiudadano() {
    listaZonasCiudadano.innerHTML = '';
    msgVerZonas.textContent = '';
}

export function limpiarVistaReportesAdmin() {
    listaReportesAdmin.innerHTML = '';
    msgVerReportes.textContent = '';
}
