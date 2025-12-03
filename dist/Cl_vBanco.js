import Cl_vTransaccion from "./Cl_vTransaccion.js";
import Cl_vTransacciones from "./Cl_vTransacciones.js";
import Cl_vGeneral from "./tools/Cl_vGeneral.js";
export default class Cl_vBanco extends Cl_vGeneral {
    constructor() {
        super({ formName: "banco" });
        this.vTransacciones = new Cl_vTransacciones();
        this.vTransacciones.show({ ver: false });
        this.vTransaccion = new Cl_vTransaccion();
        this.vTransaccion.show({ ver: false });
        this.btTransacciones = this.crearHTMLButtonElement("btTransacciones", {
            onclick: () => this.controlador.activarVista({ vista: "transacciones" }),
        });
        this.lblTransacciones = this.crearHTMLLabelElement("lblTransacciones", {
            refresh: () => { },
        });
    }
    set controlador(controlador) {
        super.controlador = controlador;
        this.vTransacciones.controlador = controlador;
        this.vTransaccion.controlador = controlador;
    }
    get controlador() {
        return super.controlador;
    }
    activarVista({ vista, opcion, objeto, }) {
        this.show({ ver: vista === "banco" });
        this.vTransacciones.show({ ver: vista === "transacciones" });
        this.vTransaccion.show({ ver: vista === "transaccion", transaccion: objeto, opcion });
    }
}
