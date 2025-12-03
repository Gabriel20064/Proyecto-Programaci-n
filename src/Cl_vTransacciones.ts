import { iTransaccion } from "./Cl_mTransaccion.js";
import Cl_vGeneral, { tHTMLElement } from "./tools/Cl_vGeneral.js";
import { opcionFicha } from "./tools/core.tools.js";
interface iOpcionTransaccion {
  edit: HTMLButtonElement | null;
  delete: HTMLButtonElement | null;
}
export default class Cl_vTransacciones extends Cl_vGeneral {
  private btAgregar: HTMLButtonElement;
  private btVolver: HTMLButtonElement;
  private divTransacciones: HTMLDivElement;
  constructor() {
    super({ formName: "transacciones" });
    this.btAgregar = this.crearHTMLButtonElement("btAgregar", {
      onclick: () => this.addTransaccion(),
    });
    this.btVolver = this.crearHTMLButtonElement("btVolver", {
      onclick: () => this.controlador!.activarVista({ vista: "banco" }),
    });
    this.divTransacciones = this.crearHTMLElement("divTransacciones", {
      type: tHTMLElement.CONTAINER,
      refresh: () => this.mostrarTransacciones(),
    }) as HTMLDivElement;
  }
  mostrarTransacciones() {
    this.divTransacciones.innerHTML = "";
    let transacciones = this.controlador?.dtTransacciones;
    if (!transacciones) return;
    transacciones.forEach(
      (transaccion: iTransaccion, index: number) =>
        (this.divTransacciones.innerHTML += `<tr>
            <td>${transaccion.fecha}</td>
            <td>${transaccion.descripcion}</td>
            <td>${transaccion.referencia}</td>
            <td>${transaccion.monto}</td>
            <td>${transaccion.tipoTransaccion}</td>
            <td>${transaccion.categoria}</td>
            <td>
                <button id="transacciones_btEditar_${index}">Editar</button>
                <button id="transacciones_btEliminar_${index}">X</button>
            </td>
        </tr>`)
    );
    transacciones.forEach((transaccion: iTransaccion, index) => {
      this.crearHTMLButtonElement(`btEditar_${index}`, {
        onclick: () => this.editarTransaccion(transaccion.referencia),
      });
      this.crearHTMLButtonElement(`btEliminar_${index}`, {
        onclick: () => this.deleteTransaccion(transaccion.referencia),
      });
    });
  }
  addTransaccion() {
    this.controlador?.activarVista({
      vista: "transaccion",
      opcion: opcionFicha.add,
    });
  }
  editarTransaccion(referencia: string) {
    let transaccion = this.controlador?.transaccion(referencia);
    if (transaccion)
      this.controlador?.activarVista({
        vista: "transaccion",
        opcion: opcionFicha.edit,
        objeto: transaccion,
      });
  }
  deleteTransaccion(referencia: string) {
    if (confirm(`¿Está seguro de eliminar la transaccion ${referencia}?`))
      this.controlador?.deleteTransaccion({
        referencia,
        callback: (error) => {
          if (error)
            alert(`No se pudo eliminar la transaccion ${referencia}.\n${error}`);
          else this.mostrarTransacciones();
        },
      });
  }
  show({ ver }: { ver: boolean }): void {
    super.show({ ver });
    if (ver) this.mostrarTransacciones();
  }
}
