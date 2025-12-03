import Cl_Controlador from "./Cl_Controlador.js";
import Cl_mBanco from "./Cl_mBanco.js";
import Cl_mTransaccion, { iTransaccion } from "./Cl_mTransaccion.js";
import Cl_vBanco from "./Cl_vBanco.js";

export default class Main {
  constructor() {
    let modelo = new Cl_mBanco();
    modelo.cargar((error: string | false) => {
      if (error) alert(error);
      if (error) throw new Error(error);
      let vista = new Cl_vBanco();
      let controlador = new Cl_Controlador(modelo, vista);
      vista.controlador = controlador;
      vista.refresh();
    });
  }
}