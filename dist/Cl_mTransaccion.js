export default class Cl_mTransaccion {
    constructor({ descripcion, monto, referencia, categoria, fecha, tipoTransaccion }) {
        this._tipoTransaccion = 0;
        this._fecha = "";
        this._descripcion = "";
        this._referencia = "";
        this._categoria = 0;
        this._monto = 0;
        this.tipoTransaccion = tipoTransaccion;
        this.fecha = fecha;
        this.descripcion = descripcion;
        this.referencia = referencia;
        this.categoria = categoria;
        this.monto = monto;
    }
    set descripcion(d) {
        this._descripcion = d;
    }
    get descripcion() {
        return this._descripcion;
    }
    set monto(m) {
        this._monto = +m;
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
    //Metodo de validacion 
    error() {
        // Validacion de Referencia
        if (this._referencia.length === 0)
            return "La referencia no puede estar vacía.";
        if (this._referencia.length !== 4)
            return "La referencia debe tener al menos 4 digitos.";
        // Validacion de monto
        if (this._monto < 0)
            return "El monto debe ser mayor a 0.";
        if (this._monto === 0)
            return "El monto no puede estar vacio.";
        // Validacion de descripcion
        if (this._descripcion.length === 0)
            return "La descripcion no puede estar vacía.";
        if (this._descripcion.length > 20)
            return "La descripcion no debe tener más de 15 caracteres.";
        return false;
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
        return {
            tipoTransaccion: this._tipoTransaccion,
            fecha: this._fecha,
            descripcion: this._descripcion,
            referencia: this._referencia,
            categoria: this._categoria,
            monto: this.monto,
        };
    }
}
