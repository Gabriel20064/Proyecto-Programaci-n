import Cl_dcytDb from "https://gtplus.net/forms2/dcytDb/api/Cl_dcytDb.php?v251129-1230";
import Cl_mTransaccion from "./Cl_mTransaccion.js";
export default class Cl_mBanco {
    constructor() {
        this.acmMontoCargo = 0;
        this.acmMontoAbonado = 0;
        this.cntTransacciones = 0;
        this.tbTransaccion = "demo17.transaccion";
        this.db = new Cl_dcytDb({ aliasCuenta: "Usuario" });
        this.transacciones = [];
    }
    addTransaccion({ dtTransaccion, callback, }) {
        let transaccion = new Cl_mTransaccion(dtTransaccion);
        // Validar que no exista otra materia con el mismo código
        if (this.transacciones.find((t) => t.referencia === dtTransaccion.referencia))
            callback(`La referencia ${dtTransaccion.referencia} ya existe.`);
        // Validar que la materia sea correcta
        else if (!transaccion.transaccionOk)
            callback(transaccion.transaccionOk);
        // Guardar la materia
        else
            this.db.addRecord({
                tabla: this.tbTransaccion,
                // registroAlias: dtMateria.codigo,
                object: transaccion,
                callback: ({ id, objects: transacciones, error }) => {
                    if (!error)
                        this.llenarTransacciones(transacciones);
                    callback === null || callback === void 0 ? void 0 : callback(error);
                },
            });
        //localStorage
        /*localStorage.setItem("Banco", JSON.stringify(this.listar()));
        callback(false);*/
    }
    editTransaccion({ dtTransaccion, callback, }) {
        let transaccion = new Cl_mTransaccion(dtTransaccion);
        // Validar que los datos de dtTransaccion sean correctos
        if (!transaccion.transaccionOk)
            callback(transaccion.transaccionOk);
        else
            this.db.editRecord({
                tabla: this.tbTransaccion,
                object: transaccion,
                callback: ({ objects: transacciones, error }) => {
                    if (!error)
                        this.llenarTransacciones(transacciones);
                    callback === null || callback === void 0 ? void 0 : callback(error);
                },
            });
    }
    deleteTransaccion({ referencia, callback, }) {
        let indice = this.transacciones.findIndex((t) => t.referencia === referencia);
        // Verificar si la materia existe
        if (indice === -1)
            callback(`La transaccion con referencia ${referencia} no existe.`);
        else {
            this.db.deleteRecord({
                tabla: this.tbTransaccion,
                object: this.transacciones[indice],
                callback: ({ objects: transacciones, error }) => {
                    if (!error)
                        this.llenarTransacciones(transacciones);
                    callback === null || callback === void 0 ? void 0 : callback(error);
                },
            });
        }
    }
    dtTransacciones() {
        return this.transacciones.map((t) => t.toJSON());
    }
    transaccion(referencia) {
        let transaccion = this.transacciones.find((t) => t.referencia === referencia);
        return transaccion ? transaccion : null;
    }
    //Cargar?
    cargar(callback) {
        // Obtener la información desde la Web Storage
        this.db.listRecords({
            tabla: this.tbTransaccion,
            callback: ({ objects, error }) => {
                if (error)
                    callback(`Error cargando transacciones: ${error}`);
                else
                    this.db.listRecords({
                        tabla: this.tbTransaccion,
                        callback: ({ objects: transacciones, error }) => {
                            if (!error) {
                                if (transacciones) {
                                    this.llenarTransacciones(transacciones);
                                    callback(false);
                                }
                                callback(false);
                            }
                        },
                    });
            },
        });
    }
    llenarTransacciones(transacciones) {
        this.transacciones = [];
        transacciones.forEach((transaccion) => this.transacciones.push(new Cl_mTransaccion(transaccion)));
    }
    agregarTransaccion(transaccion) {
        this.transacciones.push(transaccion);
    }
}
