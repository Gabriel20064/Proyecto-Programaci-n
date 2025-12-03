import { iTransaccion } from "./Cl_mTransaccion.js";
import Cl_vGeneral, { tHTMLElement } from "./tools/Cl_vGeneral.js";
import { opcionFicha } from "./tools/core.tools.js";
interface iOpcionMateria {
  edit: HTMLButtonElement | null;
  delete: HTMLButtonElement | null;
}
export default class Cl_vMaterias extends Cl_vGeneral {
  private btAgregar: HTMLButtonElement;
  private btVolver: HTMLButtonElement;
  private divTransacciones: HTMLDivElement;
  constructor() {
    super({ formName: "transacciones" });
    this.btAgregar = this.crearHTMLButtonElement("btAgregar", {
      onclick: () => this.addTransaccion(),
    });
    this.btVolver = this.crearHTMLButtonElement("btVolver", {
      onclick: () => this.controlador!.activarVista({ vista: "ucla" }),
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
          <td class="colNumber">${transaccion.fecha}</td>
        <td>${transaccion.descripcion}</td>
        <td class="colNumber">${transaccion.referencia}</td>
        <td>${transaccion.tipoTransaccion === 2 ? "Ingreso" : transaccion.categoria === 1 ? "Salud" : transaccion.categoria === 2 ? "Educación" : transaccion.categoria === 3 ? "Alimentación" : transaccion.categoria === 4 ? "Servicios" : "Otro"}</td>
        <td class="spanInfo">${transaccion.tipoTransaccion === 1 ? "Cargo" : "Abono"}</td>
        <td class="negative-amount">${transaccion.tipoTransaccion === 1 ? "-" +transaccion.monto.toFixed(2) + " Bs.": "---"} </td>
        <td class="positive-amount">${transaccion.tipoTransaccion === 2 ? transaccion.monto.toFixed(2) + " Bs.": "---"} </td>
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
            alert(`No se pudo eliminar la transaccion ${referencia}.\n${referencia}`);
          else this.mostrarTransacciones();
        },
      });
  }
  show({ ver }: { ver: boolean }): void {
    super.show({ ver });
    if (ver) this.mostrarTransacciones();
  }
}
