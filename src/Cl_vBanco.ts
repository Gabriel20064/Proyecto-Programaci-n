import { iTransaccion } from "./Cl_mTransaccion.js";
import Cl_vGeneral, { tHTMLElement } from "./tools/Cl_vGeneral.js";
export default class Cl_vBanco extends Cl_vGeneral {
  private btAgregarTransaccion: HTMLButtonElement;
  private divTransaccionesRegistradas: HTMLDivElement;
  constructor() {
    super({ formName: "banco" });
    this.btAgregarTransaccion = this.crearHTMLButtonElement("btAgregarTransaccion", {
      onclick: () => this.agregarTransaccion(),
    });
    this.divTransaccionesRegistradas = this.crearHTMLElement(
      "divTransaccionesRegistradas",
      {
        type: tHTMLElement.CONTAINER,
        refresh: () => this.mostrarTransaccionesRegistradas(),
      }
    ) as HTMLDivElement;
  }
  mostrarTransaccionesRegistradas() {
    this.divTransaccionesRegistradas.innerHTML = "";
    let banco = this.controlador?.transaccionesRegistradas();
    if (!banco) return;
    banco.forEach((transaccion: iTransaccion) => {
      this.divTransaccionesRegistradas.innerHTML += `<tr>
      <td class="colNumber">${transaccion.fecha}</td>
      <td>${transaccion.descripcion}</td>
      <td class="colNumber">${transaccion.referencia}</td>
      <td>${transaccion.tipoTransaccion === 2 ? "Ingreso" : transaccion.categoria === 1 ? "Salud" : transaccion.categoria === 2 ? "Educación" : transaccion.categoria === 3 ? "Alimentación" : transaccion.categoria === 4 ? "Servicios" : "Otro"}</td>
      <td class="spanInfo">${transaccion.tipoTransaccion === 1 ? "Cargo" : "Abono"}</td>
      <td class="negative-amount">${transaccion.tipoTransaccion === 1 ? "-" +transaccion.monto.toFixed(2) + " Bs.": "---"} </td>
      <td class="positive-amount">${transaccion.tipoTransaccion === 2 ? transaccion.monto.toFixed(2) + " Bs.": "---"} </td>
    </tr>`;
    });
  }
  agregarTransaccion() {
    let tipoTransaccion = prompt("Ingrese el tipo de transacción (1 para Cargo, 2 para Abono)");
    if (!tipoTransaccion || (tipoTransaccion !== "1" && tipoTransaccion !== "2")) return;
    let fecha = prompt("Ingrese la fecha de la transacción");
    if (!fecha) return;
    let descripcion = prompt("Ingrese la descripción de la transacción");
    if (!descripcion) return;
    let referencia = prompt("Ingrese la referencia de la transacción");
    if (!referencia) return;
    let categoria = prompt("Ingrese la categoría de la transacción");
    if (!categoria) return;
    let monto = prompt("Ingrese el monto de la transacción");
    if (!monto) return;

    this.controlador!.agregarTransaccion({

        transaccionData: {
            fecha: fecha,
            descripcion: descripcion,
            referencia: referencia,
            categoria: Number(categoria),
            monto: Number(monto),
            tipoTransaccion: Number(tipoTransaccion),
      },
      callback: (error: string | false) => {
        if (error) alert(error);
        this.refresh();
      },
    });
  }
}
