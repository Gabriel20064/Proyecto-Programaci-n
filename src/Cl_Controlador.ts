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
  addTransaccion({
    dtTransaccion,
    callback,
  }: {
    dtTransaccion: iTransaccion;
    callback: (error: string | false) => void;
  }): void {
    this.modelo.addTransaccion({
      dtTransaccion,
      callback,
    });
  }
  editTransaccion({
    dtTransaccion,
    callback,
  }: {
    dtTransaccion: iTransaccion;
    callback: (error: string | boolean) => void;
  }): void {
    this.modelo.editTransaccion({
      dtTransaccion,
      callback,
    });
  }
  deleteTransaccion({
    referencia,
    callback,
  }: {
    referencia: string;
    callback: (error: string | boolean) => void;
  }): void {
    this.modelo.deleteTransaccion({
      referencia,
      callback,
    });
  }
  transaccion(referencia: string): Cl_mTransaccion | null {
    let transaccion = this.modelo.transaccion(referencia);
    if (transaccion) return new Cl_mTransaccion(transaccion.toJSON());
    else return null;
  }
  get dtTransacciones(): iTransaccion[] {
    let dtTransacciones = this.modelo.dtTransacciones();
    dtTransacciones.sort((a, b) => a.referencia.localeCompare(b.referencia));
    return dtTransacciones;
  }
  activarVista({
    vista,
    opcion,
    objeto,
  }: {
    vista: string;
    opcion?: opcionFicha;
    objeto?: Cl_mTransaccion;
  }): void {
    this.vista.activarVista({ vista, opcion, objeto });
  }
transaccionesRegistradas(): Cl_mTransaccion[] {
    let dtTransacciones = this.modelo.dtTransacciones();
    let transacciones: Cl_mTransaccion[] = [];
    dtTransacciones.forEach((transaccion) => {
      transacciones.push(new Cl_mTransaccion(transaccion));
    });
    return transacciones;
  }
  agregarTransaccion() {
    this.activarVista({ vista: "transaccion", opcion: opcionFicha.add });
  }
}