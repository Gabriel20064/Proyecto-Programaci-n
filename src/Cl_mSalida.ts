import Cl_mTransaccion from "./Cl_mTransaccion.js";

export default class Cl_mSalida extends Cl_mTransaccion{
    private _tipoTransaccion: number = 0;
    constructor({
        descripcion,
        monto,
        referencia,
        categoria,
        fecha,
        tipoTransaccion = 0,
    }: {
        descripcion: string,
        monto: number,
        referencia: string,
        categoria: string,
        fecha: number,
        tipoTransaccion: number,
    }){
        super({descripcion, monto, referencia, categoria, fecha});
        this.tipoTransaccion = tipoTransaccion;
    }
    // setter y getter
    public set tipoTransaccion(t: number) {
        this._tipoTransaccion = t;
    }
    public get tipoTransaccion(): number {
        return this._tipoTransaccion;
    }
    //metodo de validacion
    
    //metodos
    public comision(): number {
        if (this.tipoTransaccion === 1) {
            return this.monto * 0.003; 
        }else return 0;
    }

    toJSON(){
        return {
            ...super.toJSON(),
            tipoTransaccion: this.tipoTransaccion,
            comision: this.comision(),
        }
    }

}