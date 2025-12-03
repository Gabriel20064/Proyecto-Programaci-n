import Cl_Controlador from "./Cl_Controlador.js";
import Cl_mTransaccion from "./Cl_mTransaccion.js";
import Cl_vTransaccion from "./Cl_vTransaccion.js";
import Cl_vTransacciones from "./Cl_vTransacciones.js";
import Cl_vGeneral from "./tools/Cl_vGeneral.js";
import { opcionFicha } from "./tools/core.tools.js";

export default class Cl_vBanco extends Cl_vGeneral {
  private vTransacciones: Cl_vTransacciones;
  private vTransaccion: Cl_vTransaccion;
  private btTransacciones: HTMLButtonElement;
  private lblTransacciones: HTMLLabelElement;
  constructor() {
    super({ formName: "banco" });
    this.vTransacciones = new Cl_vTransacciones();
    this.vTransacciones.show({ ver: false });
    this.vTransaccion = new Cl_vTransaccion();
    this.vTransaccion.show({ ver: false });
    this.btTransacciones = this.crearHTMLButtonElement("btTransacciones", {
      onclick: () => this.controlador!.activarVista({ vista: "transacciones" }),
    });
    this.lblTransacciones = this.crearHTMLLabelElement("lblTransacciones", {
      refresh: () => {},
    });
  }
  set controlador(controlador: Cl_Controlador) {
    super.controlador = controlador;
    this.vTransacciones.controlador = controlador;
    this.vTransaccion.controlador = controlador;
  }
  get controlador(): Cl_Controlador | null {
    return super.controlador;
  }
  activarVista({
    vista,
    opcion,
    objeto,
  }: {
    vista: string;
    opcion?: opcionFicha;
    objeto?: Cl_mTransaccion;
  }): void {
    this.show({ ver: vista === "banco" });
    this.vTransacciones.show({ ver: vista === "transacciones" });
    this.vTransaccion.show({ ver: vista === "transaccion", transaccion: objeto, opcion });
  }
}
