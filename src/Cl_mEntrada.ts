import Cl_mTransaccion from "./Cl_mTransaccion.js";

export default class Cl_mSalida extends Cl_mTransaccion{
    private _tipoTransaccion: number = 0;
    constructor({
        descripcion,
        monto,
        referencia,
        categoria,
        fecha,
    }: {
        descripcion: string,
        monto: number, 
        referencia: string,
        categoria: string,
        fecha: number,
    }) {
        super({descripcion, monto, referencia, categoria, fecha});
    }

    
    toJSON() {
        return {
            ...super.toJSON(),
        }
    }
}
