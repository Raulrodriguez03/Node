require("dotenv").config();
require("colors");

const {
  leerInput,
  inquirerMenu,
  pausa,
  listarLugares,
} = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");

const main = async () => {
  const busquedas = new Busquedas();
  let opt;

  do {
    console.clear();

    opt = await inquirerMenu();

    switch (opt) {
      case 1:
        //Mostrar mensaje
        const busqueda = await leerInput("Ciudad: ");

        //Busacar los lugares
        const lugares = await busquedas.ciudad(busqueda);

        //Seleccionar el lugar
        const id = await listarLugares(lugares);
        if (id !== 0) {
          const luagarSel = lugares.find((l) => l.id === id);

          //Guardar en DB
          busquedas.agregarHistorial(luagarSel.nombre);

          // Clima

          const clima = await busquedas.climaLugar(
            luagarSel.lat,
            luagarSel.lng
          );

          // Mostrar resultados
          console.clear();
          console.log("\nInformacion de la ciudad\n".green);
          console.log("Ciudad: ", luagarSel.nombre);
          console.log("Lat: ", luagarSel.lat);
          console.log("Lng: ", luagarSel.lng);
          console.log("Temperatura: ", clima.temp);
          console.log("Minima: ", clima.min);
          console.log("Maxima: ", clima.max);
          console.log("Como esta el clima: ", clima.desc);
        }
        break;

      case 2:
        busquedas.historialCapitalizado.forEach((lugar, i) => {
          const idx = `${i + 1}.`.green;
          console.log(`${idx} ${lugar} `);
        });
        break;

      default:
        break;
    }

    if (opt !== 0) {
      await pausa();
    }
  } while (opt !== 0);
};

main();
