export interface iTransaccion {
    descripcion: string;
    monto: number;
    referencia: string;
    categoria: string;
}
export default class Cl_mTransaccion{
        protected _descripcion: string ="";
    protected _monto: number =0 ;
    protected _referencia: string ="";
    protected _categoria: string ="";
    constructor({descripcion, monto, referencia, categoria}: {descripcion: string, monto: number, referencia: string, categoria: string}){
        this.descripcion = descripcion;
        this.monto = monto;
        this.referencia = referencia;
        this.categoria = categoria;
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
    //Metodo de validacion 
  error(): string | false {
    // Validacion de Referencia
    if (this._referencia.length === 0) return "La referencia no puede estar vacía.";
    if (this._referencia.length !== 4) return "La referencia debe tener al menos 4 digitos.";
    // Validacion de monto
    if (this._monto <= 0) return "El monto debe ser mayor a 0.";
    if (this._monto === 0) return "El monto no puede estar vacio.";
    // Validacion de descripcion
    if (this._descripcion.length === 0) return "La descripcion no puede estar vacía.";
    if (this._descripcion.length > 15) return "La descripcion no debe tener más de 15 caracteres.";
    return false;
  };
  toJSON(){
    return {
    descripcion: this._descripcion,
    monto: this._monto,
    referencia: this._referencia,
    categoria: this._categoria,
    error: this.error()};
    }
}