// Memoria temporal para la sesión
let zonas = [];
let horarios = [];

// --- Lógica para SP1.4: Registrar Zonas ---
const formZona = document.getElementById('form-zona');
const msgZona = document.getElementById('mensaje-zona');
const selectZona = document.getElementById('horario-zona');

formZona.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nombre = document.getElementById('zona-nombre').value.trim();
    const barrios = document.getElementById('zona-barrios').value.trim();

    // Criterio de confirmación: Validar campos vacíos
    if (!nombre || !barrios) {
        mostrarMensaje(msgZona, "Por favor, complete todos los campos", "red");
        return;
    }

    // Criterio de confirmación: Nombre único
    const existeZona = zonas.find(z => z.nombre.toLowerCase() === nombre.toLowerCase());
    if (existeZona) {
        mostrarMensaje(msgZona, "Error: El nombre de la zona ya existe. Debe ser único.", "red");
        return;
    }

    // Guardar zona
    zonas.push({ nombre, barrios });
    mostrarMensaje(msgZona, "Zona registrada exitosamente.", "green");
    formZona.reset();
    
    actualizarSelectZonas();
});

// Función de apoyo para mostrar mensajes
function mostrarMensaje(elemento, texto, color) {
    elemento.textContent = texto;
    elemento.style.color = color;
    setTimeout(() => elemento.textContent = "", 3000);
}

// Función para poblar el select de la HU SP1.3
function actualizarSelectZonas() {
    if (zonas.length === 0) return;
    
    selectZona.innerHTML = '<option value="">-- Seleccione una zona --</option>';
    zonas.forEach(zona => {
        const option = document.createElement('option');
        option.value = zona.nombre;
        option.textContent = zona.nombre;
        selectZona.appendChild(option);
    });
}
// --- Lógica para SP1.3: Registrar Horarios ---
const formHorario = document.getElementById('form-horario');
const msgHorario = document.getElementById('mensaje-horario');
const listaRutas = document.getElementById('lista-rutas');

formHorario.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const zonaSeleccionada = document.getElementById('horario-zona').value;
    const dias = document.getElementById('horario-dias').value.trim();
    const hora = document.getElementById('horario-hora').value;

    // Criterio de confirmación: Validar campos
    if (!zonaSeleccionada || !dias || !hora) {
        mostrarMensaje(msgHorario, "Por favor, complete todos los campos", "red");
        return;
    }

    // Guardar horario
    horarios.push({ zona: zonaSeleccionada, dias, hora });
    mostrarMensaje(msgHorario, "Horario registrado exitosamente.", "green");
    formHorario.reset();
    
    renderizarRutas();
});

// Criterio de confirmación: Observarse en la aplicación
function renderizarRutas() {
    if (horarios.length === 0) {
        listaRutas.innerHTML = '<p style="color: #666;">No hay rutas registradas aún.</p>';
        return;
    }

    listaRutas.innerHTML = '';
    
    // Combinar datos de zonas y horarios para mostrar
    horarios.forEach(horario => {
        const infoZona = zonas.find(z => z.nombre === horario.zona);
        const div = document.createElement('div');
        div.className = 'list-item';
        div.innerHTML = `
            <h3 style="color: #764ba2; margin-bottom: 5px;">📍 ${horario.zona}</h3>
            <p><strong>Barrios:</strong> ${infoZona.barrios}</p>
            <p><strong>Días:</strong> ${horario.dias}</p>
            <p><strong>Hora aprox:</strong> ${horario.hora}</p>
        `;
        listaRutas.appendChild(div);
    });
}