export interface iTransaccion {
    descripcion: string;
    monto: number;
    referencia: string;
    categoria: number;
    fecha: string;
    tipoTransaccion: number;
}
export default class Cl_mTransaccion{
    protected _descripcion: string ="";
    protected _monto: number =0 ;
    protected _referencia: string ="";
    protected _categoria: number =0 ;
    protected _fecha: string = "";
    protected _tipoTransaccion: number = 0;
    constructor({descripcion, monto, referencia, categoria, fecha, tipoTransaccion}: {descripcion: string, monto: number, referencia: string, categoria: number, fecha: string, tipoTransaccion: number}){
        this.descripcion = descripcion;
        this.monto = monto;
        this.referencia = referencia;
        this.categoria = categoria;
        this.fecha = fecha;
        this.tipoTransaccion = tipoTransaccion;
    }
    public set descripcion(d: string) {
        this._descripcion = d;
    }
    public get descripcion(): string {
        return this._descripcion;
    }
    public set monto(m: number) {
        this._monto = m;
    }        
    public get monto(): number {
        return this._monto;
    }
    public set referencia(r: string) {
        this._referencia = r;
    }
    public get referencia(): string {
        return this._referencia.trim().toUpperCase();
    }
    public set categoria(c: number) {
        this._categoria = c;
    }
    public get categoria(): number {
        return this._categoria;
    }
    public set fecha(f: string) {
        this._fecha = f;
    }
    public get fecha(): string {
        return this._fecha;
    }
    public set tipoTransaccion(t: number) {
        this._tipoTransaccion = t;
    }
    public get tipoTransaccion(): number {
        return this._tipoTransaccion;
    }
  get descripcionOk(): boolean {
    return this.descripcion.length === 4;
  }
  get montoOk(): boolean {
    return this.monto > 0;
  }
  get referenciaOk(): boolean {
    return this.referencia.length === 4;
  }
  get categoriaOk(): boolean {{}
    return this.categoria > 0;
  }
  get fechaOk(): boolean {
    return this.fecha.length === 4;
  }
  get tipoTransaccionOk(): boolean {{}
    return this.tipoTransaccion > 0;
  }
  get transaccionOk(): string | true {
    if (!this.descripcionOk) return "descripcion";
    if (!this.montoOk) return "monto";
    if (!this.referenciaOk) return "referencia";
    if (!this.categoriaOk) return "categoria";
    if (!this.fechaOk) return "fecha";
    if (!this.tipoTransaccionOk) return "tipoTransaccion";
    return true;
  }
    //Metodo de validacion 
  public error(): string | false {
    // Validacion de Referencia
    if (this._referencia.length === 0) return "La referencia no puede estar vacía.";
    if (this._referencia.length !== 4) return "La referencia debe tener al menos 4 digitos.";
    // Validacion de monto
    if (this._monto < 0) return "El monto debe ser mayor a 0.";
    if (this._monto === 0) return "El monto no puede estar vacio.";
    // Validacion de descripcion
    if (this._descripcion.length === 0) return "La descripcion no puede estar vacía.";
    if (this._descripcion.length > 20) return "La descripcion no debe tener más de 15 caracteres.";
    return false;
  }
  //tipo=1 abono - tipo=2 cargo
  public montoTransaccion(): number {
    if (this._tipoTransaccion === 1) {
        return this._monto;
    } else {
        return this._monto*(-1);
    }
  }
  toJSON(){
    return {
    tipoTransaccion: this._tipoTransaccion,
    fecha: this._fecha,
    descripcion: this._descripcion,
    referencia: this._referencia,
    categoria: this._categoria,
    monto: this.monto,
    }
  }
}