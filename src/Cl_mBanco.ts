import Cl_mTransaccion, {iTransaccion} from "./Cl_mTransaccion.js";
import Cl_mSalida from "./Cl_mSalida.js";
import Cl_mEntrada from "./Cl_mEntrada.js";
export default class Cl_mBanco{
    private acmMontoSalida: number = 0;
    private acmMontoEntrada: number = 0;
    private cntTransacciones: number = 0;
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
    procesarTransacciones(t:Cl_mTransaccion) {
    this.cntTransacciones++
    if (t instanceof Cl_mSalida) { 
        this.acmMontoSalida += t.montoF();    
        }
    if (t instanceof Cl_mEntrada) { 
        this.acmMontoEntrada += t.montoF();    
        }
    }
    //Metodos de retorno
    public montoTotalTSalidas(): number {
        return this.acmMontoSalida;
    }
    public montoTotalTEntradas(): number {
        return this.acmMontoEntrada;
    }  
    public cantidadTransacciones(): number {
        return this.cntTransacciones;
    }
    public resultadoFinanciero(): number | string {
        if (this.montoTotalTEntradas() > this.montoTotalTSalidas()) {
            return "Utilidad de" + (this.montoTotalTEntradas() - this.montoTotalTSalidas());
        } else {
            return "Perdida de" + (this.montoTotalTSalidas() - this.montoTotalTEntradas());
        }
    }
}