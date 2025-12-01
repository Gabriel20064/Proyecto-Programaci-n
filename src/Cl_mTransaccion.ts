export interface iTransaccion {
    descripcion: string;
    monto: number;
    referencia: string;
    fecha: number;
    categoria: string;
    tipoTransaccion: number;
}
export default class Cl_mTransaccion{
    protected _descripcion: string ="";
    protected _monto: number =0 ;
    protected _referencia: string ="";
    protected _categoria: string ="";
    protected _fecha: number = 0;
    protected _tipoTransaccion: number = 0;
    constructor({descripcion, monto, referencia, categoria, fecha, tipoTransaccion}: iTransaccion){
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
    public set categoria(c: string) {
        this._categoria = c;
    }
    public get categoria(): string {
        return this._categoria;
    }
    public set fecha(f: number) {
        this._fecha = f;
    }
    public get fecha(): number {
        return this._fecha;
    }
    public set tipoTransaccion(t: number) {
        this._tipoTransaccion = t;
    }
    public get tipoTransaccion(): number {
        return this._tipoTransaccion;
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
    if (this._descripcion.length > 15) return "La descripcion no debe tener más de 15 caracteres.";
    return false;
  }
  //tipo=1 abono - tipo=2 cargo
  public transaccion(): number {
    if (this._tipoTransaccion === 1) {
        return this._monto;
    } else {
        return this._monto*(-1);
    }
  }
  toJSON(){
    return {
    descripcion: this._descripcion,
    monto: this._monto,
    referencia: this._referencia,
    fecha: this._fecha,
    categoria: this._categoria,
    tipoTransaccion: this._tipoTransaccion,
    error: this.error(),
    transaccion: this.transaccion(),
    }
  }
}