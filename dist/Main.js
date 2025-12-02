import Cl_Controlador from "./Cl_Controlador.js";
import Cl_mBanco from "./Cl_mBanco.js";
import Cl_mTransaccion from "./Cl_mTransaccion.js";
import Cl_vBanco from "./Cl_vBanco.js";
export default class Cl_index {
    constructor() {
        this.modelo = new Cl_mBanco();
        let transaccionesLS = localStorage.getItem("Banco");
        if (transaccionesLS) {
            let transaccionesDT = JSON.parse(transaccionesLS);
            transaccionesDT.forEach((transaccion) => {
                this.modelo.agregarTransaccion({
                    transaccion: new Cl_mTransaccion(transaccion),
                    callback: (error) => {
                        // Ignorar errores al cargar desde localStorage
                    },
                });
            });
        }
        this.vista = new Cl_vBanco();
        let controlador = new Cl_Controlador(this.modelo, this.vista);
        this.vista.controlador = controlador;
        this.vista.refresh();
    }
}
