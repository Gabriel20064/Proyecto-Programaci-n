export default class Cl_mBanco {
    constructor() {
        this.acmMontoSalida = 0;
        this.acmMontoEntrada = 0;
        this.cntTransacciones = 0;
        this.banco = [];
    }
    agregarTransaccion({ transaccion, callback, }) {
        //validar que el transaccion no tenga errores
        let error = transaccion.error();
        if (error) {
            callback(error);
            return;
        }
        //validar que no se repita  la cedula
        let existe = this.banco.find((c) => c.referencia === transaccion.referencia);
        if (existe) {
            callback("La referencia que ingreso ya a sido registrada.");
            return;
        }
        this.banco.push(transaccion);
        //localStorage
        localStorage.setItem("Banco", JSON.stringify(this.listar()));
        callback(false);
    }
    listar() {
        let lista = [];
        this.banco.forEach((transaccion) => {
            lista.push(transaccion.toJSON());
        });
        return lista;
    }
    procesarTransacciones(t) {
        this.cntTransacciones++;
        if (t.transaccion() > 0) {
            this.acmMontoEntrada += t.transaccion();
        }
        else {
            this.acmMontoSalida += t.transaccion();
        }
    }
    cantidadTransacciones() {
        return this.cntTransacciones;
    }
    //Metodos de retorno
    montoTotalTSalidas() {
        return this.acmMontoSalida;
    }
    montoTotalTEntradas() {
        return this.acmMontoEntrada;
    }
    resultadoFinanciero() {
        if (this.montoTotalTEntradas() > this.montoTotalTSalidas()) {
            return "Utilidad de" + (this.montoTotalTEntradas() + this.montoTotalTSalidas());
        }
        else {
            return "Perdida de" + (this.montoTotalTSalidas() + this.montoTotalTEntradas());
        }
    }
}
