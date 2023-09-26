require("colors");

const { guardarDB, leerDB } = require("./helpers/guardarArchivo");
const {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mostrarListadoChecklist,
} = require("./helpers/inquirer");
const Tareas = require("./mopdels/tareas");
console.clear();

const main = async () => {
  let opt = "";
  const tareas = new Tareas();

  const tareasDB = leerDB();

  if (tareasDB) {
    // Establecer las tareas
    tareas.cargarTareasFromArray(tareasDB);
  }

  do {
    // Imprimir el menu
    opt = await inquirerMenu();

    switch (opt) {
      case "1":
        // Espera la funcion que lee el input introducido y lo guarda como desc
        const desc = await leerInput("Descripcion: ");
        // Ingresa la tarea en el listado de tareas
        tareas.crearTareas(desc);
        break;

      case "2":
        // Imprime el listado de tareas
        tareas.listadoCompleto();
        break;

      case "3":
        // Imprime el listado de tareas completadas
        tareas.listarPendientesCompletadas();
        break;

      case "4":
        // Imprime el listado de tareas pendientes
        tareas.listarPendientesCompletadas((completadas = false));
        break;

      case "5":
        // Completado || Pendiente
        const ids = await mostrarListadoChecklist(tareas.listadoArr);
        tareas.toggleCompletadas(ids);
        break;

      case "6":
        const id = await listadoTareasBorrar(tareas.listadoArr);
        if (id !== "0") {
          const ok = await confirmar("Estas seguro?");
          if (ok) {
            tareas.borrarTarea(id);
            console.log("Tarea borrada");
          }
        }
        break;

      default:
        break;
    }

    guardarDB(tareas.listadoArr);

    if (opt !== "0") await pausa();
  } while (opt !== "0");
};

main();
