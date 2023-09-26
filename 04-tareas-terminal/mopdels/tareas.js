require("colors");
const Tarea = require("./tarea");

// Siempre que lquieras llamas una intancia necesitas el .this
class Tareas {
  _listado = {};

  get listadoArr() {
    // !Geters parte de JS (aun no se bien para que se utiliza)
    const listado = [];
    Object.keys(this._listado).forEach((key) => {
      const tarea = this._listado[key];
      listado.push(tarea);
    });

    return listado;
  }

  constructor() {
    // Dar de alta a tu instancia declarada
    this._listado = {};
  }

  borrarTarea(id = "") {
    if (this._listado[id]) {
      delete this._listado[id];
    }
  }

  cargarTareasFromArray(tareas = []) {
    tareas.forEach((tarea) => {
      this._listado[tarea.id] = tarea;
    });
  }

  crearTareas(desc = "") {
    //una funcion dentro de tu clase
    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
  }

  listadoCompleto() {
    console.log();
    this.listadoArr.forEach((tarea, i) => {
      const idx = `${i + 1}`.green;
      const { desc, completadoEn } = tarea;
      const estado = completadoEn ? "Completada".green : "Pendiente".red;

      console.log(`${idx} ${desc} :: ${estado}`);
    });

    // this.listadoArr.forEach((tarea, index) => {
    //   console.log(
    //     `${`${index + 1}.`.green} ${tarea.desc} :: ${
    //       tarea.completadoEn ? "Completada".green : "Pendiente".red
    //     }`
    //   );
    // });
  }

  listarPendientesCompletadas(completadas = true) {
    console.log();
    let i = 1;

    this.listadoArr.forEach((tarea) => {
      const { desc, completadoEn } = tarea;
      const estado = completadoEn ? "Completada".green : "Pendiente".red;

      if (completadas) {
        if (completadoEn) {
          console.log(`${i + ".".green} ${desc} :: ${completadoEn.green}`);
          i++;
        }
      } else {
        if (!completadoEn) {
          console.log(`${i + ".".green} ${desc} :: ${estado}`);
          i++;
        }
      }
    });
  }

  toggleCompletadas(ids = []) {
    ids.forEach((id) => {
      const tarea = this._listado[id];
      if (!tarea.completadoEn) {
        tarea.completadoEn = new Date().toISOString();
      }
    });

    this.listadoArr.forEach((tarea) => {
      if (!ids.includes(tarea.id)) {
        this._listado[tarea.id].completadoEn = null;
      }
    });
  }
}

module.exports = Tareas;
