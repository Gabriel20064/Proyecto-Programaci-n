
import Cl_mTransaccion, { iTransaccion } from "./Cl_mTransaccion.js";
import Cl_mBanco from "./Cl_mBanco.js";
import Cl_vBanco from "./Cl_vBanco.js";
import { opcionFicha } from "./tools/core.tools";
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
    codigo,
    callback,
  }: {
    codigo: string;
    callback: (error: string | boolean) => void;
  }): void {
    this.modelo.deleteTransaccion({
      codigo,
      callback,
    });
  }
  transaccion(codigo: string): Cl_mTransaccion | null {
    let transaccion = this.modelo.transaccion(codigo);
    if (transaccion) return new Cl_mTransaccion(transaccion.toJSON());
    else return null;
  }
  get dtMaterias(): iMateria[] {
    let dtMaterias = this.modelo.dtMaterias();
    dtMaterias.sort((a, b) => a.codigo.localeCompare(b.codigo));
    return dtMaterias;
  }
  get dtEstudiantes(): iEstudiante[] {
    let dtEstudiantes = this.modelo.dtEstudiantes();
    dtEstudiantes.sort((a, b) => a.cedula - b.cedula);
    return dtEstudiantes;
  }
  activarVista({
    vista,
    opcion,
    objeto,
  }: {
    vista: string;
    opcion?: opcionFicha;
    objeto?: Cl_mMateria;
  }): void {
    this.vista.activarVista({ vista, opcion, objeto });
  }
}