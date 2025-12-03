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
  Transaccion(referencia: string): Cl_mTransaccion | null {
    let Transaccion = this.modelo.Transaccion(referencia);
    if (Transaccion) return new Cl_mTransaccion(Transaccion.toJSON());
    else return null;
  }
  get dtTransaccions(): iTransaccion[] {
    let dtTransaccions = this.modelo.dtTransaccions();
    dtTransaccions.sort((a, b) => a.referencia.localeCompare(b.referencia));
    return dtTransaccions;
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
}