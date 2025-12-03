import Cl_mTransaccion from "./Cl_mTransaccion.js";
import { opcionFicha } from "./tools/core.tools.js";
export default class Cl_Controlador {
    constructor(modelo, vista) {
        this.modelo = modelo;
        this.vista = vista;
    }
    addTransaccion({ dtTransaccion, callback, }) {
        this.modelo.addTransaccion({
            dtTransaccion,
            callback,
        });
    }
    editTransaccion({ dtTransaccion, callback, }) {
        this.modelo.editTransaccion({
            dtTransaccion,
            callback,
        });
    }
    deleteTransaccion({ referencia, callback, }) {
        this.modelo.deleteTransaccion({
            referencia,
            callback,
        });
    }
    transaccion(referencia) {
        let transaccion = this.modelo.transaccion(referencia);
        if (transaccion)
            return new Cl_mTransaccion(transaccion.toJSON());
        else
            return null;
    }
    get dtTransacciones() {
        let dtTransacciones = this.modelo.dtTransacciones();
        dtTransacciones.sort((a, b) => a.referencia.localeCompare(b.referencia));
        return dtTransacciones;
    }
    activarVista({ vista, opcion, objeto, }) {
        this.vista.activarVista({ vista, opcion, objeto });
    }
    transaccionesRegistradas() {
        let dtTransacciones = this.modelo.dtTransacciones();
        let transacciones = [];
        dtTransacciones.forEach((transaccion) => {
            transacciones.push(new Cl_mTransaccion(transaccion));
        });
        return transacciones;
    }
    agregarTransaccion() {
        this.activarVista({ vista: "transaccion", opcion: opcionFicha.add });
    }
}
