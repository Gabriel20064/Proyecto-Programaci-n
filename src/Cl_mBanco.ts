import Cl_dcytDb from "https://gtplus.net/forms2/dcytDb/api/Cl_dcytDb.php?v251129-1230";
import Cl_mTransaccion, {iTransaccion} from "./Cl_mTransaccion.js";
export default class Cl_mBanco{
    private db: Cl_dcytDb;
    private acmMontoCargo: number = 0;
    private acmMontoAbonado: number = 0;
    private cntTransacciones: number = 0;
    private banco: Cl_mTransaccion[] = [];
    readonly tbTransaccion: string = "demo17.transaccion";
    constructor() {
    this.db = new Cl_dcytDb({ aliasCuenta: "Usuario" });
        
  }
    agregarTransaccion({
        dtTransaccion,
        callback,
    }: {
        dtTransaccion: iTransaccion;
        callback: (error: string | false) => void;
    }): void {
    let transaccion = new Cl_mTransaccion(dtTransaccion);
    // Validar que no exista otra materia con el mismo código
    if (this.banco.find((b) => b.referencia === dtTransaccion.referencia))
        
      callback(`La referencia ${dtTransaccion.referencia} ya existe.`);
    // Validar que la materia sea correcta
    else if (!transaccion.transaccionOk) callback(transaccion.transaccionOk);
    // Guardar la materia
    else
      this.db.addRecord({
        tabla: this.tbMateria,
       // registroAlias: dtMateria.referencia,
        object: materia,
        callback: ({ id, objects: materias, error }) => {
          if (!error) this.llenarMaterias(materias);
          callback?.(error);
        },
      });
        //localStorage
        localStorage.setItem("Banco", JSON.stringify(this.listar()));
        callback(false);
    }
    listar(): iTransaccion[]{
        let lista: iTransaccion[] = [];
        this.banco.forEach((dtTransaccion) => {
            lista.push(dtTransaccion.toJSON());
        });
        return lista;
    }
    editarTransaccion({  
        transaccionData,
        callback,
        }: {
        transaccionData: iTransaccion;
        callback: (error: string | boolean) => void;
        }): void {
        let dtTransaccion = new Cl_mTransaccion(transaccionData);
    // Validar que los datos de dtTransaccion sean correctos
    if (!dtTransaccion.transaccionOk) callback(dtTransaccion.transaccionOk);
    else
      this.db.editRecord({
        tabla: this.tbTransaccion,
        object: dtTransaccion,
        callback: ({ objects: transacciones, error }) => {
          if (!error) this.llenarTransacciones(transacciones);
          callback?.(error);
        },
      });
    }











    //Metodos
    procesarTransacciones(t:Cl_mTransaccion) {
        this.cntTransacciones++;
        if (t.tipoTransaccion === 1) {
            this.acmMontoCargo += t.montoTransaccion();
        } else {
            this.acmMontoAbonado += t.montoTransaccion();
        }
    }
    public cantidadTransacciones(): number {
        return this.cntTransacciones;
        }
         //Metodos de retorno
    public montoTotalTSalidas(): number {
        return this.acmMontoCargo;
    }
    public montoTotalTEntradas(): number {
        return this.acmMontoAbonado;
    }  
    public resultadoFinanciero(): number | string {
        if (this.montoTotalTEntradas() > this.montoTotalTSalidas()) {
            return "Utilidad de" + (this.montoTotalTEntradas() + this.montoTotalTSalidas());
        } else {
            return "Perdida de" + (this.montoTotalTSalidas() + this.montoTotalTEntradas());
        }
    }  
        }