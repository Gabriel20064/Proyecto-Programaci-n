import Cl_mTablaWeb from "./tools/Cl_mTablaWeb.js";
export interface iTransaccion {
  //Tools Cl_mTablaWeb
  id: number | null;
  creadoEl: string | null;
  alias: string | null;  
//Atributos de la clase
  fecha: string;
  descripcion: string;
  referencia: string;
  monto: number;
  tipoTransaccion: number;
  categoria: number;
}
export default class Cl_mTransaccion extends Cl_mTablaWeb{
    protected _descripcion: string ="";
    protected _monto: number =0 ;
    protected _referencia: string ="";
    protected _categoria: number =0 ;
    protected _fecha: string = "";
    protected _tipoTransaccion: number = 0;
    constructor({id, creadoEl, alias, fecha, descripcion, monto, referencia, categoria, tipoTransaccion}: iTransaccion = {id: null, creadoEl: null, alias: null, fecha: "", descripcion: "", monto: 0, referencia: "", categoria: 0, tipoTransaccion: 0}) {
        super({id, creadoEl, alias});
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
    return this.descripcion.length <= 20;
  }
  get montoOk(): boolean {
    return this.monto > 0;
  }
  get referenciaOk(): boolean {
    return this.referencia.length === 7;
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
  //tipo=1 abono - tipo=2 cargo
  public montoTransaccion(): number {
    if (this._tipoTransaccion === 1) {
        return this._monto;
    } else {
        return this._monto*(-1);
    }
  }
  toJSON(): iTransaccion{
    return {
      ...super.toJSON(),
      fecha: this._fecha,
      descripcion: this._descripcion,
      referencia: this._referencia,
      monto: this.monto,
      tipoTransaccion: this._tipoTransaccion,
      categoria: this._categoria,
    }
  }
}