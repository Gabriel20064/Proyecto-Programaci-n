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
        return this._referencia;
    }
    public set categoria(c: string) {
        this._categoria = c;
    }
    public get categoria(): string {
        return this._categoria;
    }
    //Metodos 
    public 
}