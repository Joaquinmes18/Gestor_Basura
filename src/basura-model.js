let zonas = [];
let horarios = [];
let reportes = [];

const ADMIN_USER = "admin";
const ADMIN_PASS = "12345";

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

export function obtenerReportes() {
    return reportes;
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

export function validarLogin(admin, password) {
    if (!admin || !password) {
        return {
            exito: false,
            mensaje: "Por favor, complete todos los campos"
        };
    }

    if (admin === ADMIN_USER && password === ADMIN_PASS) {
        return {
            exito: true,
            mensaje: "Acceso correcto"
        };
    }

    return {
        exito: false,
        mensaje: "Usuario o contraseña incorrectos"
    };
}

export function registrarReporte(zonaSeleccionada, descripcion) {
    if (!zonaSeleccionada || !descripcion) {
        return {
            exito: false,
            mensaje: "Por favor, complete los datos del reporte"
        };
    }

    reportes.push({
        zona: zonaSeleccionada,
        descripcion: descripcion,
        fecha: new Date().toLocaleString("es-BO")
    });

    return {
        exito: true,
        mensaje: "Reporte registrado correctamente."
    };
}

export function verReportesAdmin() {
    if (reportes.length === 0) {
        return {
            exito: false,
            mensaje: "No existen reportes registrados",
            datos: []
        };
    }

    return {
        exito: true,
        mensaje: "",
        datos: reportes
    };
}

export function editarHorario(indice, nuevaZona, nuevosDias, nuevaHora) {
    if (!nuevaZona || !nuevosDias || !nuevaHora) {
        return {
            exito: false,
            mensaje: "Por favor, complete todos los campos"
        };
    }
    if (horarios[indice]) {
        horarios[indice] = { zona: nuevaZona, dias: nuevosDias, hora: nuevaHora };
        return {
            exito: true,
            mensaje: "Horario actualizado exitosamente."
        };
    }

    return {
        exito: false,
        mensaje: "No se pudo actualizar el horario"
    };
}