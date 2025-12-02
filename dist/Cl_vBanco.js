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
            <td>${transaccion.descripcion}</td>
            <td>${transaccion.monto} Bs.</td>
            <td>${transaccion.referencia}</td>
            <td>${transaccion.categoria}</td>
            <td>${transaccion.fecha}</td>
            <td>${transaccion.tipoTransaccion === 1 ? "Abono" : "Cargo"}</td>
        </tr>`;
        });
    }
    agregarTransaccion() {
        let descripcion = prompt("Ingrese la descripción de la transacción");
        if (!descripcion)
            return;
        let monto = prompt("Ingrese el monto de la transacción");
        if (!monto)
            return;
        let referencia = prompt("Ingrese la referencia de la transacción");
        if (!referencia)
            return;
        let categoria = prompt("Ingrese la categoría de la transacción");
        if (!categoria)
            return;
        let fecha = Date.now();
        let tipoTransaccion = prompt("Ingrese el tipo de transacción (1 para Abono, 2 para Cargo)");
        if (!tipoTransaccion || (tipoTransaccion !== "1" && tipoTransaccion !== "2"))
            return;
        this.controlador.agregarTransaccion({
            transaccionData: {
                descripcion: descripcion,
                monto: Number(monto),
                referencia: referencia,
                categoria: categoria,
                fecha: fecha,
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
