const TipoProyecto = require("../models/tipoProyecto");
const { request, response } = require("express");
/**
 * Crea un tipo de equipo
 */
const createTipoProyecto = async (req = request, res = response) => {
  try {
    //console.log(req.body)
    const nombre = req.body.nombre ? req.body.nombre.toUpperCase() : "";
    const tipoProyectoBD = await TipoProyecto.findOne({ nombre });
    if (tipoProyectoBD) {
      return res.status(400).json({ msg: "Ya existe nombre" });
    }
    const datos = {
      nombre,
    };
    //const datos = req.body
    const tipoProyecto = new TipoProyecto(datos);
    console.log(tipoProyecto);
    await tipoProyecto.save();
    res.status(201).json(tipoProyecto);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      msg: e,
    });
  }
};

/**
 * Consulta todos los tipos de proyectos
 */
const getTiposProyecto = async (req = request, res = response) => {
  try {
    console.log(req.query);
    const estado = req.query.estado;
    const query = { estado: estado };
    const tipoproyectosDB = await TipoProyecto.find(query);
    return res.json(tipoproyectosDB);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ msg: e });
  }
};

/**
 *  Consulta un tipo proyecto por su ID
 */
const getTipoProyectoByID = async (req = request, res = response) => {
  try {
    console.log(req.params);
    const id = req.params.id;
    const query = { _id: id };
    const tipoproyectoDB = await TipoProyecto.findOne(query);
    return res.json(tipoproyectoDB);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ msg: e });
  }
};

/**
 * Actualiza un tipo de equipo por su ID
 */
const updateTipoProyectoByID = async (req = request, res = response) => {
  try {
    console.log(req.body);
    console.log(req.params);
    const data = req.body;
    const id = req.params.id;
    data.fechaActualizacion = new Date();
    console.log(data);
    const tipoProyecto = await TipoProyecto.findByIdAndUpdate(id, data, {
      new: true,
    });
    return res.json(tipoProyecto);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ msg: e });
  }
};

/**
 * Borra un tipo de proyecto por su ID
 */
const deleteTipoProyectoByID = async (req = request, res = response) => {
  try {
    console.log(req.params);
    const id = req.params.id;
    const tipoproyectoDB = await TipoProyecto.findById(id);
    if (!tipoproyectoDB) {
      return res.status(404).json({ msg: "No existe el tipo de proyecto" });
    }
    await TipoProyecto.findByIdAndDelete(id);
    return res.status(204).json({ msg: "Borrado", id });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ msg: e });
  }
};

module.exports = {
  createTipoProyecto,
  getTiposProyecto,
  getTipoProyectoByID,
  updateTipoProyectoByID,
  deleteTipoProyectoByID,
};
