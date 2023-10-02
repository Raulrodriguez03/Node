// !Como das de alta un servidor con node sin utilizar exxpress, manera vieja de hacerlo
// !Ya que es mucho mejor hacerlo con EXPRESS y es mas sensillo

const http = require("http");

http
  .createServer((req, res) => {
    res.setHeader("Content-Disposition", "attachment; filename=lista.csv");
    res.writeHead(200, { "Content-Type": "application/csv" });

    res.write(" id, nombre /n");
    res.write(" 1, Fernando /n");
    res.write(" 2, Raul /n");
    res.write(" 3, Gabriela /n");
    res.write(" 4, Diana /n");
    res.end();
  })
  .listen(8080);

console.log(" Escuchando el puerto 8080");
