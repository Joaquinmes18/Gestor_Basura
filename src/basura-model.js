let zonas = [];
let horarios = [];

export function registrarZona(nombre, barrios) {
    if (!nombre || !barrios) {
        return {
            exito: false,
            mensaje: "Por favor, complete todos los campos"
        };
    }

    const existeZona = zonas.find(function (z) {
        return z.nombre.toLowerCase() === nombre.toLowerCase();
    });

    if (existeZona) {
        return {
            exito: false,
            mensaje: "Error: El nombre de la zona ya existe. Debe ser único."
        };
    }

    zonas.push({ nombre, barrios });

    return {
        exito: true,
        mensaje: "Zona registrada exitosamente."
    };
}

export function registrarHorario(zonaSeleccionada, dias, hora) {
    if (!zonaSeleccionada || !dias || !hora) {
        return {
            exito: false,
            mensaje: "Por favor, complete todos los campos"
        };
    }

    horarios.push({ zona: zonaSeleccionada, dias, hora });

    return {
        exito: true,
        mensaje: "Horario registrado exitosamente."
    };
}

export function obtenerZonas() {
    return zonas;
}

export function obtenerHorarios() {
    return horarios;
}

export function verHorariosPorZona(zonaSeleccionada) {
    if (!zonaSeleccionada) {
        return {
            exito: false,
            mensaje: "Por favor, seleccione una zona",
            datos: []
        };
    }

    const horariosZona = horarios.filter(function (h) {
        return h.zona === zonaSeleccionada;
    });

    if (horariosZona.length === 0) {
        return {
            exito: false,
            mensaje: "No existen horarios disponibles para esta zona",
            datos: []
        };
    }

    return {
        exito: true,
        mensaje: "",
        datos: horariosZona
    };
}

export function verZonasDisponibles() {
    if (zonas.length === 0) {
        return {
            exito: false,
            mensaje: "No existen zonas disponibles",
            datos: []
        };
    }

    return {
        exito: true,
        mensaje: "",
        datos: zonas
    };
}