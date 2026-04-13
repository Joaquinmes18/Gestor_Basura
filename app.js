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