import Cl_vGeneral, { tHTMLElement } from "./tools/Cl_vGeneral.js";
import { opcionFicha } from "./tools/core.tools.js";
export default class Cl_vMaterias extends Cl_vGeneral {
    constructor() {
        super({ formName: "transacciones" });
        this.btAgregar = this.crearHTMLButtonElement("btAgregar", {
            onclick: () => this.addTransaccion(),
        });
        this.btVolver = this.crearHTMLButtonElement("btVolver", {
            onclick: () => this.controlador.activarVista({ vista: "ucla" }),
        });
        this.divTransacciones = this.crearHTMLElement("divTransacciones", {
            type: tHTMLElement.CONTAINER,
            refresh: () => this.mostrarTransacciones(),
        });
    }
    mostrarTransacciones() {
        var _a;
        this.divTransacciones.innerHTML = "";
        let transacciones = (_a = this.controlador) === null || _a === void 0 ? void 0 : _a.dtTransacciones;
        if (!transacciones)
            return;
        transacciones.forEach((transaccion, index) => (this.divTransacciones.innerHTML += `<tr>
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
        </tr>`));
        transacciones.forEach((transaccion, index) => {
            this.crearHTMLButtonElement(`btEditar_${index}`, {
                onclick: () => this.editarTransaccion(transaccion.referencia),
            });
            this.crearHTMLButtonElement(`btEliminar_${index}`, {
                onclick: () => this.deleteTransaccion(transaccion.referencia),
            });
        });
    }
    addTransaccion() {
        var _a;
        (_a = this.controlador) === null || _a === void 0 ? void 0 : _a.activarVista({
            vista: "transaccion",
            opcion: opcionFicha.add,
        });
    }
    editarTransaccion(referencia) {
        var _a, _b;
        let transaccion = (_a = this.controlador) === null || _a === void 0 ? void 0 : _a.transaccion(referencia);
        if (transaccion)
            (_b = this.controlador) === null || _b === void 0 ? void 0 : _b.activarVista({
                vista: "transaccion",
                opcion: opcionFicha.edit,
                objeto: transaccion,
            });
    }
    deleteTransaccion(referencia) {
        var _a;
        if (confirm(`¿Está seguro de eliminar la transaccion ${referencia}?`))
            (_a = this.controlador) === null || _a === void 0 ? void 0 : _a.deleteTransaccion({
                referencia,
                callback: (error) => {
                    if (error)
                        alert(`No se pudo eliminar la transaccion ${referencia}.\n${referencia}`);
                    else
                        this.mostrarTransacciones();
                },
            });
    }
    show({ ver }) {
        super.show({ ver });
        if (ver)
            this.mostrarTransacciones();
    }
}
