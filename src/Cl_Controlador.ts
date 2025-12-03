import Cl_mTransaccion , { iTransaccion } from "./Cl_mTransaccion.js"; 
import Cl_mBanco from "./Cl_mBanco.js";
import Cl_vBanco from "./Cl_vBanco.js"
import { opcionFicha } from "./tools/core.tools.js";
export default class Cl_Controlador {
  public modelo: Cl_mBanco;
  public vista: Cl_vBanco;
  constructor(modelo: Cl_mBanco, vista: Cl_vBanco) {
    this.modelo = modelo;
    this.vista = vista;
  }
  agregarTransaccion({
    transaccionData,
    callback,
  }: {
    transaccionData: iTransaccion;
    callback: Function;
  }): void {
    this.modelo.agregarTransaccion({
      transaccion: new Cl_mTransaccion(transaccionData),
      callback: (error: string | false) => {
        callback(error);
      },
    });
  }
  transaccionesRegistradas(): iTransaccion[] {
    return this.modelo.listar();
  }
   editarTransaccion({
    transaccionData,
    callback,
  }: {
    transaccionData: iTransaccion;
    callback: (error: string | boolean) => void;
  }): void {
    this.modelo.editarTransaccion({
      transaccionData,
      callback,
    });
  }
}
