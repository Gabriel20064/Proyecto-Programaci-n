import Cl_dcytDb from "https://gtplus.net/forms2/dcytDb/api/Cl_dcytDb.php?v251129-1230";
import Cl_mTransaccion, {iTransaccion} from "./Cl_mTransaccion.js";
interface iResultTransaccion {
    objects: [iTransaccion] | null;
    error: string | false;
}
export default class Cl_mBanco{
    private acmMontoCargo: number = 0;
    private acmMontoAbonado: number = 0;
    private cntTransacciones: number = 0;

    private db: Cl_dcytDb;
    private transacciones: Cl_mTransaccion[];
    readonly tbTransaccion: string = "demo17.transaccion";
    constructor() {
    this.db = new Cl_dcytDb({ aliasCuenta: "Usuario" });
    this.transacciones = []
  }
    addTransaccion({
        dtTransaccion,
        callback,
    }: {
        dtTransaccion: iTransaccion;
        callback: (error: string | false) => void;
    }): void {
    let transaccion = new Cl_mTransaccion(dtTransaccion);
    // Validar que no exista otra materia con el mismo código
    if (this.transacciones.find((t) => t.referencia === dtTransaccion.referencia))
      callback(`La referencia ${dtTransaccion.referencia} ya existe.`);

    // Validar que la materia sea correcta
    else if (!transaccion.transaccionOk) callback(transaccion.transaccionOk);
    // Guardar la materia
    else
      this.db.addRecord({
        tabla: this.tbTransaccion,
       // registroAlias: dtMateria.codigo,
        object: transaccion,
        callback: ({ id, objects: transacciones, error }) => {
          if (!error) this.llenarTransacciones(transacciones);
          callback?.(error);
        },
      });
        //localStorage
        /*localStorage.setItem("Banco", JSON.stringify(this.listar()));
        callback(false);*/
    }
    editTransaccion({  
    dtTransaccion,
        callback,
        }: {
        dtTransaccion: iTransaccion;
        callback: (error: string | boolean) => void;
        }): void {
        let transaccion = new Cl_mTransaccion(dtTransaccion);
    // Validar que los datos de dtTransaccion sean correctos
    if (!transaccion.transaccionOk) callback(transaccion.transaccionOk);
    else
      this.db.editRecord({
        tabla: this.tbTransaccion,
        object: transaccion,
        callback: ({ objects: transacciones, error }) => {
          if (!error) this.llenarTransacciones(transacciones);
          callback?.(error);
        },
      });
    }

    deleteTransaccion({
    referencia,
    callback,
    }: {
    referencia: string;
    callback: (error: string | boolean) => void;
  }): void {
    let indice = this.transacciones.findIndex((t) => t.referencia === referencia);
    // Verificar si la materia existe
    if (indice === -1) callback(`La transaccion con referencia ${referencia} no existe.`);
    else {
        this.db.deleteRecord({
          tabla: this.tbTransaccion,
          object: this.transacciones[indice],
          callback: ({ objects: transacciones, error }) => {
            if (!error) this.llenarTransacciones(transacciones);
            callback?.(error);
          },
        });
      
    }
  }
dtTransacciones(): iTransaccion[] {
    return this.transacciones.map((t) => t.toJSON());
  }

  transaccion(referencia:string): Cl_mTransaccion | null {
    let transaccion = this.transacciones.find((t) => t.referencia === referencia);
    return transaccion ? transaccion : null;
  }
//Cargar?

llenarTransacciones(transacciones: iTransaccion[]): void {
    this.transacciones = [];
    transacciones.forEach((transaccion: iTransaccion) => 
        this.transacciones.push(new Cl_mTransaccion(transaccion))
    );
  }







/*
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
    */
}