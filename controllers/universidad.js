const Universidad = require("../models/universidad");
const { request, response } = require("express");

const createUniversidad = async (req = request, res = response) => {
  try {
    const data = req.body;
    const telefono = data.telefono;
    console.log(data);
    const universidadBD = await Universidad.findOne({ telefono });
    if (universidadBD) {
      return res.status(400).json({ msg: "Ya existe la universidad" });
    }
    const universidad = new Universidad(data);
    console.log(universidad);
    await universidad.save();
    return res.status(201).json(universidad);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ e });
  }
};

const getUniversidades = async (req = request, res = response) => {
  try {
    console.log(req.query);
    const estado = req.query.estado;
    const query = { estado: estado };
    const universidades = await Universidad.find(query);
    return res.json(universidades);
  } catch (e) {
    return res.status(500).json({ msj: e });
  }
};

const getUniversidadByID = async (req = request, res = response) => {
  try {
    const id = req.params.id;
    const universidadDB = await Universidad.findById(id);
    return res.json(universidadDB);
  } catch (e) {
    return res.status(500).json({ msj: e });
  }
};

const updateUniversidadByID = async (req = request, res = response) => {
  try {
    const id = req.params.id;
    const data = req.body;
    console.log(data);
    console.log(id);
    data.fechaActualizacion = new Date();
    console.log(data);
    const universidad = await Universidad.findByIdAndUpdate(id, data, {
      new: true,
    });
    return res.status(201).json(universidad);
  } catch (e) {
    return res.status(500).json({ msj: e });
  }
};

const deleteUniversidadByID = async (req = request, res = response) => {
  try {
    const id = req.params.id;
    const universidadBD = await Universidad.findById(id);
    if (!universidadBD) {
      return res.status(404).json({ msj: "No existe la universidad" });
    }
    await Universidad.findByIdAndDelete(id);
    return res.status(204).json({});
  } catch (e) {
    return res.status(500).json({ msj: e });
  }
};

module.exports = {
  createUniversidad,
  getUniversidades,
  getUniversidadByID,
  updateUniversidadByID,
  deleteUniversidadByID,
};
