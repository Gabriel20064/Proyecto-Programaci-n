import Cl_vGeneral, { tHTMLElement } from "./tools/Cl_vGeneral.js";
export default class Cl_vBanco extends Cl_vGeneral {
    constructor() {
        super({ formName: "banco" });
        this.btAgregarTransaccion = this.crearHTMLButtonElement("btAgregarTransaccion", {
            onclick: () => this.agregarTransaccion(),
        });
        this.divTransaccionesRegistradas = this.crearHTMLElement("divTransaccionesRegistradas", {
            type: tHTMLElement.CONTAINER,
            refresh: () => this.mostrarTransaccionesRegistradas(),
        });
    }
    mostrarTransaccionesRegistradas() {
        var _a;
        this.divTransaccionesRegistradas.innerHTML = "";
        let banco = (_a = this.controlador) === null || _a === void 0 ? void 0 : _a.transaccionesRegistradas();
        if (!banco)
            return;
        banco.forEach((transaccion) => {
            this.divTransaccionesRegistradas.innerHTML += `<tr>
      <td class="colNumber">${transaccion.fecha}</td>
      <td>${transaccion.descripcion}</td>
      <td class="colNumber">${transaccion.referencia}</td>
      <td>${transaccion.categoria}</td>
      <td class="spanInfo">${transaccion.tipoTransaccion === 1 ? "Abono" : "Cargo"}</td>
      <td class="negative-amount">${transaccion.tipoTransaccion === 1 ? "- " + transaccion.monto + " Bs." : "-"} </td>
      <td class="positive-amount">${transaccion.tipoTransaccion === 2 ? transaccion.monto + " Bs." : "-"} </td>

        </tr>`;
        });
    }
    agregarTransaccion() {
        let tipoTransaccion = prompt("Ingrese el tipo de transacción (1 para Cargo, 2 para Abono)");
        if (!tipoTransaccion || (tipoTransaccion !== "1" && tipoTransaccion !== "2"))
            return;
        let fecha = Date.now();
        let descripcion = prompt("Ingrese la descripción de la transacción");
        if (!descripcion)
            return;
        let referencia = prompt("Ingrese la referencia de la transacción");
        if (!referencia)
            return;
        let categoria = prompt("Ingrese la categoría de la transacción");
        if (!categoria)
            return;
        let monto = prompt("Ingrese el monto de la transacción");
        if (!monto)
            return;
        this.controlador.agregarTransaccion({
            transaccionData: {
                fecha: fecha,
                descripcion: descripcion,
                referencia: referencia,
                categoria: categoria,
                monto: Number(monto),
                tipoTransaccion: Number(tipoTransaccion),
            },
            callback: (error) => {
                if (error)
                    alert(error);
                this.refresh();
            },
        });
    }
}
