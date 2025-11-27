import Cl_mTransaccion, {iTransaccion} from "./Cl_mTransaccion.js";

export default class Cl_mBanco{
    private banco: Cl_mTransaccion[] = [];
    agregarTransaccion({
        transaccion,
        callback,
    }: {
        transaccion: Cl_mTransaccion;
        callback: (error: string | false) => void;
    }): void {
        //validar que el transaccion no tenga errores
        let error = transaccion.error();
        if (error) {
            callback(error);
            return;
        }
        //validar que no se repita  la cedula
        let existe = this.banco.find((c) => c.referencia === transaccion.referencia);
        if(existe) {
            callback("La referencia que ingreso ya a sido registrada.");
            return;
        }
        this.banco.push(transaccion);
        
        //localStorage
        localStorage.setItem("Banco", JSON.stringify(this.listar()));
        callback(false);
    }
    listar(): iTransaccion[]{
        let lista: iTransaccion[] = [];
        this.banco.forEach((transaccion) => {
            lista.push(transaccion.toJSON());
        });
        return lista;
    }
}