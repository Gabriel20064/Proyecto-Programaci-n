import Cl_vGeneral, { tHTMLElement } from "./tools/Cl_vGeneral.js";
export default class Cl_vBanco extends Cl_vGeneral {
    constructor() {
        super({ formName: "banco" });
        this.btAgregarTransaccion = this.crearHTMLButtonElement("btAgregarTransaccion", {
            onclick: () => this.agregarTransaccion(),
        });
        this.btAddTransaccion = this.crearHTMLButtonElement("addTB", {
            onclick: () => this.addTransaccion(),
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
      <td>${transaccion.tipoTransaccion === 2 ? "Ingreso" : transaccion.categoria === 1 ? "Salud" : transaccion.categoria === 2 ? "Educación" : transaccion.categoria === 3 ? "Alimentación" : transaccion.categoria === 4 ? "Servicios" : "Otro"}</td>
      <td class="spanInfo">${transaccion.tipoTransaccion === 1 ? "Cargo" : "Abono"}</td>
      <td class="negative-amount">${transaccion.tipoTransaccion === 1 ? "-" + transaccion.monto.toFixed(2) + " Bs." : "---"} </td>
      <td class="positive-amount">${transaccion.tipoTransaccion === 2 ? transaccion.monto.toFixed(2) + " Bs." : "---"} </td>
    </tr>`;
        });
    }
    agregarTransaccion() {
        const modal = document.getElementById("addTransaccion");
        const azu = document.getElementById("azufre");
        const formB = document.getElementById("banco_btAgregarTransaccion");
        if (formB.textContent === "Volver") {
            azu.style.display = "block";
            modal.style.display = "none";
            formB.textContent = "Agregar Transacción";
            return;
        }
        ;
        azu.style.display = "none";
        modal.style.display = "block";
        formB.textContent = "Volver";
    }
    addTransaccion() {
        // Leer valores desde los inputs del formulario (ids dentro del modal/form)
        const fechaEl = document.getElementById("fecha");
        const descripcionEl = document.getElementById("descripcion");
        const referenciaEl = document.getElementById("referencia");
        const categoriaEl = document.getElementById("categoria");
        const tipoEl = document.getElementById("tipoTransaccion");
        const montoEl = document.getElementById("monto");
        if (!fechaEl || !descripcionEl || !referenciaEl || !categoriaEl || !tipoEl || !montoEl)
            return;
        const tipoTransaccion = tipoEl.value;
        if (!tipoTransaccion || (tipoTransaccion !== "1" && tipoTransaccion !== "2"))
            return;
        const fecha = fechaEl.value;
        if (!fecha)
            return;
        const descripcion = descripcionEl.value;
        if (!descripcion)
            return;
        const referencia = referenciaEl.value;
        if (!referencia)
            return;
        const categoria = categoriaEl.value;
        if (!categoria)
            return;
        const monto = montoEl.value;
        const azu = document.getElementById("azufre");
        azu.style.display = "block";
        const formB = document.getElementById("banco_btAgregarTransaccion");
        formB.textContent = "Agregar Transacción";
        this.controlador.agregarTransaccion({
            transaccionData: {
                fecha: fecha,
                descripcion: descripcion,
                referencia: referencia,
                categoria: Number(categoria),
                monto: Number(monto),
                tipoTransaccion: Number(tipoTransaccion),
            },
            callback: (error) => {
                if (error)
                    alert(error);
                // cerrar modal y resetear form
                const modal = document.getElementById("addTransaccion");
                const form = document.getElementById("banco_formAgregarTransaccion");
                if (form)
                    form.reset();
                if (modal)
                    modal.style.display = "none";
                this.refresh();
            },
        });
    }
}
