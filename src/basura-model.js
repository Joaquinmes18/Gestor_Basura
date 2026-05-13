class Zona {
    constructor(nombre, barrios) {
        this.nombre = nombre;
        this.barrios = barrios;
    }
}

class Horario {
    constructor(zona, dias, hora) {
        this.zona = zona;
        this.dias = dias;
        this.hora = hora;
    }
}

class Reporte {
    constructor(zona, descripcion) {
        this.zona = zona;
        this.descripcion = descripcion;
        this.fecha = new Date().toLocaleString("es-BO");
    }
}

const almacenamiento = {
    zonas: [],
    horarios: [],
    reportes: []
};

const ADMIN_CREDENTIALS = {
    usuario: "admin",
    password: "12345"
};

const MENSAJES = {
    CAMPOS_REQUERIDOS: "Por favor, complete todos los campos",
    ZONA_DUPLICADA: "Error: El nombre de la zona ya existe. Debe ser único.",
    ZONA_REQUERIDA: "Por favor, seleccione una zona",
    HORARIO_NO_ENCONTRADO: "Horario no encontrado.",
    SIN_HORARIOS_ZONA: "No existen horarios disponibles para esta zona",
    SIN_ZONAS: "No existen zonas disponibles",
    LOGIN_CORRECTO: "Acceso correcto",
    LOGIN_INCORRECTO: "Usuario o contraseña incorrectos",
    REPORTE_REQUERIDO: "Por favor, complete los datos del reporte",
    SIN_REPORTES: "No existen reportes registrados",
    ZONA_REGISTRADA: "Zona registrada exitosamente.",
    HORARIO_REGISTRADO: "Horario registrado exitosamente.",
    HORARIO_ACTUALIZADO: "Horario actualizado exitosamente.",
    REPORTE_REGISTRADO: "Reporte registrado correctamente."
};

function crearRespuestaExitosa(mensaje = "", datos = []) {
    return {
        exito: true,
        mensaje,
        datos
    };
}

function crearRespuestaError(mensaje, datos = []) {
    return {
        exito: false,
        mensaje,
        datos
    };
}

function estaVacio(valor) {
    return !valor || valor.trim() === "";
}

function normalizarTexto(texto) {
    return texto.trim();
}

function existeZona(nombreZona) {
    return almacenamiento.zonas.some(function (zona) {
        return zona.nombre.toLowerCase() === nombreZona.toLowerCase();
    });
}

function obtenerIndiceValido(indice, lista) {
    const indiceConvertido = Number.parseInt(indice, 10);

    if (
        Number.isNaN(indiceConvertido) ||
        indiceConvertido < 0 ||
        indiceConvertido >= lista.length
    ) {
        return -1;
    }

    return indiceConvertido;
}

export function registrarZona(nombre, barrios) {
    if (estaVacio(nombre) || estaVacio(barrios)) {
        return crearRespuestaError(MENSAJES.CAMPOS_REQUERIDOS);
    }

    const nombreZona = normalizarTexto(nombre);
    const barriosZona = normalizarTexto(barrios);

    if (existeZona(nombreZona)) {
        return crearRespuestaError(MENSAJES.ZONA_DUPLICADA);
    }

    const nuevaZona = new Zona(nombreZona, barriosZona);
    almacenamiento.zonas.push(nuevaZona);

    return crearRespuestaExitosa(MENSAJES.ZONA_REGISTRADA);
}

export function registrarHorario(zonaSeleccionada, dias, hora) {
    if (estaVacio(zonaSeleccionada) || estaVacio(dias) || estaVacio(hora)) {
        return crearRespuestaError(MENSAJES.CAMPOS_REQUERIDOS);
    }

    const nuevoHorario = new Horario(
        normalizarTexto(zonaSeleccionada),
        normalizarTexto(dias),
        normalizarTexto(hora)
    );

    almacenamiento.horarios.push(nuevoHorario);

    return crearRespuestaExitosa(MENSAJES.HORARIO_REGISTRADO);
}

export function editarHorario(indice, zonaSeleccionada, dias, hora) {
    if (estaVacio(zonaSeleccionada) || estaVacio(dias) || estaVacio(hora)) {
        return crearRespuestaError(MENSAJES.CAMPOS_REQUERIDOS);
    }

    const indiceHorario = obtenerIndiceValido(indice, almacenamiento.horarios);

    if (indiceHorario === -1) {
        return crearRespuestaError(MENSAJES.HORARIO_NO_ENCONTRADO);
    }

    almacenamiento.horarios[indiceHorario] = new Horario(
        normalizarTexto(zonaSeleccionada),
        normalizarTexto(dias),
        normalizarTexto(hora)
    );

    return crearRespuestaExitosa(MENSAJES.HORARIO_ACTUALIZADO);
}

export function obtenerZonas() {
    return [...almacenamiento.zonas];
}

export function obtenerHorarios() {
    return [...almacenamiento.horarios];
}

export function obtenerReportes() {
    return [...almacenamiento.reportes];
}

export function verHorariosPorZona(zonaSeleccionada) {
    if (estaVacio(zonaSeleccionada)) {
        return crearRespuestaError(MENSAJES.ZONA_REQUERIDA);
    }

    const horariosZona = almacenamiento.horarios.filter(function (horario) {
        return horario.zona === zonaSeleccionada;
    });

    if (horariosZona.length === 0) {
        return crearRespuestaError(MENSAJES.SIN_HORARIOS_ZONA);
    }

    return crearRespuestaExitosa("", horariosZona);
}

export function verZonasDisponibles() {
    if (almacenamiento.zonas.length === 0) {
        return crearRespuestaError(MENSAJES.SIN_ZONAS);
    }

    return crearRespuestaExitosa("", obtenerZonas());
}

export function validarLogin(usuario, password) {
    if (estaVacio(usuario) || estaVacio(password)) {
        return crearRespuestaError(MENSAJES.CAMPOS_REQUERIDOS);
    }

    const credencialesCorrectas =
        usuario === ADMIN_CREDENTIALS.usuario &&
        password === ADMIN_CREDENTIALS.password;

    if (!credencialesCorrectas) {
        return crearRespuestaError(MENSAJES.LOGIN_INCORRECTO);
    }

    return crearRespuestaExitosa(MENSAJES.LOGIN_CORRECTO);
}

export function registrarReporte(zonaSeleccionada, descripcion) {
    if (estaVacio(zonaSeleccionada) || estaVacio(descripcion)) {
        return crearRespuestaError(MENSAJES.REPORTE_REQUERIDO);
    }

    const nuevoReporte = new Reporte(
        normalizarTexto(zonaSeleccionada),
        normalizarTexto(descripcion)
    );

    almacenamiento.reportes.push(nuevoReporte);

    return crearRespuestaExitosa(MENSAJES.REPORTE_REGISTRADO);
}

export function verReportesAdmin() {
    if (almacenamiento.reportes.length === 0) {
        return crearRespuestaError(MENSAJES.SIN_REPORTES);
    }

    return crearRespuestaExitosa("", obtenerReportes());
}

export function reiniciarDatos() {
    almacenamiento.zonas = [];
    almacenamiento.horarios = [];
    almacenamiento.reportes = [];
}