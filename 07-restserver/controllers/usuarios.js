const { response, request } = require("express");

const usuariosGet = (req = request, res = response) => {
  // http://localhost:8080/api/usuarios?q=hola&apikey=132541535&page=10&limit=2
  const { q, nombre = "No name", apikey, page = 1, limit } = req.query;

  res.json({
    msg: "get API - controlador",
    nombre,
    q,
    apikey,
    page,
    limit,
  });
};

const usuariosPost = (req, res = response) => {
  // http://localhost:8080/api/usuarios
  const body = req.body;

  res.json({
    msg: "post API - controlador",
    body,
  });
};

const usuariosPut = (req, res = response) => {
  // http://localhost:8080/api/usuarios/10
  const id = req.params.id;

  res.json({
    msg: "put API - controlador",
    id,
  });
};

const usuariosPatch = (req, res = response) => {
  res.json({
    msg: "patch API - controlador",
  });
};

const usuariosDelete = (req, res = response) => {
  res.json({
    msg: "delete API - controlador",
  });
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
};
