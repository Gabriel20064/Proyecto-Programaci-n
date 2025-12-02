import Cl_vGeneral from "./tools/Cl_vGeneral";
import Cl_mTransaccion from "./Cl_mTransaccion";
import { opcionFicha } from "./tools/core.tools";
export default class Cl_vTransaccion extends Cl_vGeneral {
    constructor() {
        super({ formName: "transaccion" });
        this.opcion = null;
        this.transaccion = new Cl_mTransaccion();
        this.lblOpcion = this.crearHTMLLabelElement("lblOpcion", {
            refresh: () => (this.lblOpcion.innerHTML =
                this.opcion === opcionFicha.add ? "Agregar" : "Editar"),
        });
        this.inDescripcion = this.crearHTMLInputElement("inDescripcion", {
            oninput: () => {
                this.inDescripcion.value = this.transaccion.descripcion = this.inDescripcion.value;
                this.refresh();
            },
            refresh: () => (this.inDescripcion.style.borderColor = this.transaccion.descripcionOk ? "" : "red"),
        });
        this.inDescripcion.disabled = this.opcion === opcionFicha.edit;
        this.inMonto = this.crearHTMLInputElement("inMonto", {
            oninput: () => {
                this.inMonto.value = this.transaccion.monto = this.inMonto.value;
                this.refresh();
            },
            refresh: () => (this.inMonto.style.borderColor = this.transaccion.montoOk ? "" : "red"),
        });
        this.inReferencia = this.crearHTMLInputElement("inReferencia", {
            oninput: () => {
                this.inReferencia.value = this.transaccion.referencia = this.inReferencia.value;
                this.refresh();
            },
            refresh: () => (this.inReferencia.style.borderColor = this.transaccion.referenciaOk ? "" : "red"),
        });
        this.inCategoria = this.crearHTMLInputElement("inCategoria", {
            oninput: () => {
                this.inCategoria.value = this.transaccion.categoria = this.inCategoria.value;
                this.refresh();
            },
            refresh: () => (this.inCategoria.style.borderColor = this.transaccion.categoriaOk ? "" : "red"),
        });
        this.inFecha = this.crearHTMLInputElement("inFecha", {
            oninput: () => {
                this.inFecha.value = this.transaccion.fecha = this.inFecha.value;
                this.refresh();
            },
            refresh: () => (this.inFecha.style.borderColor = this.transaccion.fechaOk ? "" : "red"),
        });
        this.inTipoTransaccion = this.crearHTMLInputElement("inTipoTransaccion", {
            oninput: () => {
                this.inTipoTransaccion.value = this.transaccion.tipoTransaccion = this.inTipoTransaccion.value;
                this.refresh();
            },
            refresh: () => (this.inTipoTransaccion.style.borderColor = this.transaccion.tipoTransaccionOk ? "" : "red"),
        });
        this.btAceptar = this.crearHTMLButtonElement("btAceptar", {
            onclick: () => this.aceptar(),
            refresh: () => {
                this.btAceptar.disabled = this.transaccion.transaccionOk !== true;
            },
        });
        this.btCancelar = this.crearHTMLButtonElement("btCancelar", {
            onclick: () => this.controlador.activarVista({ vista: "transaciones" }),
        });
    }
    aceptar() {
        if (this.opcion === opcionFicha.add)
            this.controlador.addTransaccion({
                dtTransaccion: this.transaccion.toJSON(),
                callback: (error) => {
                    if (!error)
                        this.controlador.activarVista({ vista: "transaciones" });
                    else
                        alert(`Error: ${error}`);
                }
            });
        else {
            this.controlador.editTransacion({
                dtTransaccion: this.transaccion.toJSON(),
                callback: (error) => {
                    if (!error)
                        this.controlador.activarVista({ vista: "transaciones" });
                    else
                        alert(`Error: ${error}`);
                },
            });
        }
    }
    show({ ver, transaccion, opcion, } = {
        ver: false,
        transaccion: new Cl_mTransaccion(),
    }) {
        super.show({ ver });
        if (opcion) {
            this.opcion = opcion;
            this.transaccion.descripcion = transaccion.descripcion;
            this.transaccion.monto = transaccion.monto;
            this.transaccion.referencia = transaccion.referencia;
            this.transaccion.categoria = transaccion.categoria;
            this.transaccion.fecha = transaccion.fecha;
            this.transaccion.tipoTransaccion = transaccion.tipoTransaccion;
            this.refresh();
        }
    }
}
