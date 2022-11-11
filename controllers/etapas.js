const Etapa = require("../models/etapas");
const { request, response } = require("express");
/**
 * Crea una etapa
 */
const createEtapa = async (req = request, res = response) => {
  try {
    //console.log(req.body)
    const nombre = req.body.nombre ? req.body.nombre.toUpperCase() : "";
    const etapaBD = await Etapa.findOne({ nombre });
    if (etapaBD) {
      return res.status(400).json({ msg: "Ya existe nombre" });
    }
    const datos = {
      nombre,
    };
    const etapa = new Etapa(datos);
    console.log(etapa);
    await etapa.save();
    res.status(201).json(etapa);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      msg: e,
    });
  }
};

/**
 * Consulta todas las etapas del proyecto
 */
const getEtapas = async (req = request, res = response) => {
  try {
    console.log(req.query);
    const estado = req.query.estado;
    const query = { estado: estado };
    const etapasDB = await Etapa.find(query);
    return res.json(etapasDB);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ msg: e });
  }
};

/**
 *  Consulta una etapa por su ID
 */
const getEtapaByID = async (req = request, res = response) => {
  try {
    console.log(req.params);
    const id = req.params.id;
    const query = { _id: id };
    const etapaDB = await Etapa.findOne(query);
    return res.json(etapaDB);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ msg: e });
  }
};

/**
 * Actualiza una etapa por su ID
 */
const updateEtapaByID = async (req = request, res = response) => {
  try {
    console.log(req.body);
    console.log(req.params);
    const data = req.body;
    const id = req.params.id;
    data.fechaActualizacion = new Date();
    const etapa = await Etapa.findByIdAndUpdate(id, data, { new: true });
    return res.json(etapa);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ msg: e });
  }
};

/**
 * Borra una etapa por su ID
 */
const deleteEtapaByID = async (req = request, res = response) => {
  try {
    console.log(req.params);
    const id = req.params.id;
    const etapaDB = await Etapa.findById(id);
    if (!etapaDB) {
      return res.status(404).json({ msg: "No existe esta etapa" });
    }
    await Etapa.findByIdAndDelete(id);
    return res.status(204).json({ msg: "Borrado", id });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ msg: e });
  }
};

module.exports = {
  createEtapa,
  getEtapas,
  getEtapaByID,
  updateEtapaByID,
  deleteEtapaByID,
};
