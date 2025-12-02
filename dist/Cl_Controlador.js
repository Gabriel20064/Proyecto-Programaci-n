import Cl_mTransaccion from "./Cl_mTransaccion.js";
export default class Cl_Controlador {
    constructor(modelo, vista) {
        this.modelo = modelo;
        this.vista = vista;
    }
    agregarTransaccion({ transaccionData, callback, }) {
        this.modelo.agregarTransaccion({
            transaccion: new Cl_mTransaccion(transaccionData),
            callback: (error) => {
                callback(error);
            },
        });
    }
    transaccionesRegistradas() {
        return this.modelo.listar();
    }
}
