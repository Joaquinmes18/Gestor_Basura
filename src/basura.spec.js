import {
    registrarZona,
    registrarHorario,
    obtenerZonas,
    obtenerHorarios,
    verHorariosPorZona,
    verZonasDisponibles,
    validarLogin,
    registrarReporte,
    verReportesAdmin
} from "./basura-model.js";

describe("Gestor de Basura", () => {

    it("debería registrar una zona correctamente", () => {
        const res = registrarZona("Zona Sur", "Villa Esperanza");
        expect(res.exito).toEqual(true);
    });

    it("no debería registrar zona con campos vacíos", () => {
        const res = registrarZona("", "");
        expect(res.exito).toEqual(false);
    });

    it("no debería registrar zona duplicada", () => {
        registrarZona("Zona Norte", "Cala Cala");
        const res = registrarZona("Zona Norte", "Otro barrio");
        expect(res.exito).toEqual(false);
    });

    it("debería devolver zonas registradas", () => {
        const zonas = obtenerZonas();
        expect(zonas.length).toBeGreaterThan(0);
    });

    it("debería mostrar zonas disponibles", () => {
        const res = verZonasDisponibles();
        expect(res.exito).toEqual(true);
    });


    it("debería registrar un horario correctamente", () => {
        registrarZona("Zona Test", "Barrio Test");
        const res = registrarHorario("Zona Test", "Lunes", "08:00");
        expect(res.exito).toEqual(true);
    });

    it("no debería registrar horario con campos vacíos", () => {
        const res = registrarHorario("", "", "");
        expect(res.exito).toEqual(false);
    });

    it("debería devolver horarios registrados", () => {
        const horarios = obtenerHorarios();
        expect(horarios.length).toBeGreaterThan(0);
    });

    it("debería mostrar horarios por zona", () => {
        const res = verHorariosPorZona("Zona Test");
        expect(res.exito).toEqual(true);
    });

    it("debería fallar si no selecciona zona", () => {
        const res = verHorariosPorZona("");
        expect(res.exito).toEqual(false);
    });

    it("debería validar login correcto", () => {
        const res = validarLogin("admin", "12345");
        expect(res.exito).toEqual(true);
    });

    it("debería fallar login incorrecto", () => {
        const res = validarLogin("admin", "wrong");
        expect(res.exito).toEqual(false);
    });

    it("debería fallar login con campos vacíos", () => {
        const res = validarLogin("", "");
        expect(res.exito).toEqual(false);
    });

    it("debería registrar un reporte correctamente", () => {
        registrarZona("Zona Reporte", "Barrio R");
        const res = registrarReporte("Zona Reporte", "Basura acumulada");
        expect(res.exito).toEqual(true);
    });

    it("no debería registrar reporte con campos vacíos", () => {
        const res = registrarReporte("", "");
        expect(res.exito).toEqual(false);
    });

    it("debería mostrar reportes registrados", () => {
        const res = verReportesAdmin();
        expect(res.exito).toEqual(true);
    });

});