const fs = require("fs");

const axios = require("axios");
const { leerDB } = require("../../04-tareas-terminal/helpers/guardarArchivo");
require("colors");

class Busquedas {
  historial = [];
  dbpath = "./db/database.json";

  constructor() {
    //TODO: leer DB si existe
    this.leerDB();
  }

  get paramsMapbox() {
    return {
      limit: 5,
      language: "es",
      access_token: process.env.MAPBOX_KEY,
    };
  }

  get historialCapitalizado() {
    return this.historial.map((lugar) => {
      let separate = lugar.split(" ");
      separate = separate.map(
        (palabra) => palabra[0].toUpperCase() + palabra.substring(1)
      );

      return separate.join(" ");
    });
  }

  async ciudad(lugar = "") {
    try {
      //peticion http
      const instance = axios.create({
        baseURL: ` https:api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json?`,
        params: this.paramsMapbox,
      });

      const resp = await instance.get();
      return resp.data.features.map((lugar) => ({
        id: lugar.id,
        nombre: lugar.place_name,
        lng: lugar.center[0],
        lat: lugar.center[1],
      }));
    } catch (error) {
      return [];
    }
  }

  get paramsWheather() {
    return {
      appid: process.env.OPENWETHER_KEY,
      units: "metric",
      lang: "es",
    };
  }

  async climaLugar(lat, lon) {
    try {
      // peticion http
      const instance = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather`,
        params: { ...this.paramsWheather, lat, lon },
      });

      const resp = await instance.get();
      const { weather, main } = resp.data;

      return {
        desc: `${weather[0].description}`.magenta,
        min: `${main.temp_min + "°C"}`.cyan,
        max: `${main.temp_max + "°C"}`.red,
        temp: `${main.temp + "°C".green}`.green,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async agregarHistorial(lugar = "") {
    if (this.historial.includes(lugar.toLowerCase())) {
      return;
    }
    this.historial = this.historial.splice(0, 4);

    this.historial.unshift(lugar);

    //Gravar en DB
    this.guardarDB();
  }

  guardarDB() {
    const payload = {
      historal: this.historial,
    };
    fs.writeFileSync(this.dbpath, JSON.stringify(payload));
  }

  leerDB() {
    // Debe de existir...
    if (!fs.existsSync(this.dbpath)) return;

    const info = fs.readFileSync(this.dbpath, { encoding: "utf-8" });
    const data = JSON.parse(info);

    this.historial = data.historal;
  }
}

module.exports = Busquedas;
