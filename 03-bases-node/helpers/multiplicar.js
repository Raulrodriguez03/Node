const fs = require("fs");
const colors = require("colors");

const crearArchivo = async (base = 5, list, hasta = 10) => {
  try {
    let salida = "";

    for (let i = 0; i <= hasta; i++) {
      salida += `${base} x ${i} = ${base * i} \n`;
    }

    if (list) {
      console.log("======================".rainbow);
      console.log(`     TAbla del: ${base}`);
      console.log("======================".rainbow);
      console.log(salida);
    }

    fs.writeFileSync(`./salida/tabla-${base}.txt`, salida);

    return `Tabla-${base}.txt`;
  } catch (error) {
    throw error;
  }

  //     return new Promise( (resolve, reject) => {
  //     fs.writeFileSync( `tabla-${ base }.txt`, salida );
  //
  //     resolve(`Tabla-${ base }.txt creado`);
  // })
};

module.exports = {
  crearArchivo,
};
