export interface iTransaccion {
    tipoTransaccion: number;
    fecha: string;
    descripcion: string;
    referencia: string;
    categoria: number;
    monto: number;
}
export default class Cl_mTransaccion{
    protected _tipoTransaccion: number = 0;
    protected _fecha: string = "";
    protected _descripcion: string ="";
    protected _referencia: string ="";
    protected _categoria: number =0 ;
    protected _monto: number =0 ;
    constructor({descripcion, monto, referencia, categoria, fecha, tipoTransaccion}: {descripcion: string, monto: number, referencia: string, categoria: number, fecha: string, tipoTransaccion: number}){
        this.tipoTransaccion = tipoTransaccion;
        this.fecha = fecha;
        this.descripcion = descripcion;
        this.referencia = referencia;
        this.categoria = categoria;
        this.monto = monto;
    }
    public set descripcion(d: string) {
        this._descripcion = d;
    }
    public get descripcion(): string {
        return this._descripcion;
    }
    public set monto(m: number) {
        this._monto = +m;
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