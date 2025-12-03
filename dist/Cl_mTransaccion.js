import Cl_mTablaWeb from "./tools/Cl_mTablaWeb.js";
export default class Cl_mTransaccion extends Cl_mTablaWeb {
    constructor({ id, creadoEl, alias, fecha, descripcion, monto, referencia, categoria, tipoTransaccion } = { id: null, creadoEl: null, alias: null, fecha: "", descripcion: "", monto: 0, referencia: "", categoria: 0, tipoTransaccion: 0 }) {
        super({ id, creadoEl, alias });
        this._descripcion = "";
        this._monto = 0;
        this._referencia = "";
        this._categoria = 0;
        this._fecha = "";
        this._tipoTransaccion = 0;
        this.descripcion = descripcion;
        this.monto = monto;
        this.referencia = referencia;
        this.categoria = categoria;
        this.fecha = fecha;
        this.tipoTransaccion = tipoTransaccion;
    }
    set descripcion(d) {
        this._descripcion = d;
    }
    get descripcion() {
        return this._descripcion;
    }
    set monto(m) {
        this._monto = m;
    }
    get monto() {
        return this._monto;
    }
    set referencia(r) {
        this._referencia = r;
    }
    get referencia() {
        return this._referencia.trim().toUpperCase();
    }
    set categoria(c) {
        this._categoria = c;
    }
    get categoria() {
        return this._categoria;
    }
    set fecha(f) {
        this._fecha = f;
    }
    get fecha() {
        return this._fecha;
    }
    set tipoTransaccion(t) {
        this._tipoTransaccion = t;
    }
    get tipoTransaccion() {
        return this._tipoTransaccion;
    }
    get descripcionOk() {
        return this.descripcion.length <= 20;
    }
    get montoOk() {
        return this.monto > 0;
    }
    get referenciaOk() {
        return this.referencia.length === 7;
    }
    get categoriaOk() {
        { }
        return this.categoria > 0;
    }
    get fechaOk() {
        return this.fecha.length === 4;
    }
    get tipoTransaccionOk() {
        { }
        return this.tipoTransaccion > 0;
    }
    get transaccionOk() {
        if (!this.descripcionOk)
            return "descripcion";
        if (!this.montoOk)
            return "monto";
        if (!this.referenciaOk)
            return "referencia";
        if (!this.categoriaOk)
            return "categoria";
        if (!this.fechaOk)
            return "fecha";
        if (!this.tipoTransaccionOk)
            return "tipoTransaccion";
        return true;
    }
    //tipo=1 abono - tipo=2 cargo
    montoTransaccion() {
        if (this._tipoTransaccion === 1) {
            return this._monto;
        }
        else {
            return this._monto * (-1);
        }
    }
    toJSON() {
        return Object.assign(Object.assign({}, super.toJSON()), { fecha: this._fecha, descripcion: this._descripcion, referencia: this._referencia, monto: this.monto, tipoTransaccion: this._tipoTransaccion, categoria: this._categoria });
    }
}
