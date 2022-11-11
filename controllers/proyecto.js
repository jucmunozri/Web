const Proyecto = require("../models/proyecto");
const { request, response } = require("express");
const Cliente = require("../models/cliente");
const Universidad = require("../models/universidad");

const getProyectos = async (req, res = response) => {
  try {
    const proyectos = await Proyecto.find()
      .populate({
        path: "cliente",
        match: { estado: true },
      })
      .populate({
        path: "universidad",
        match: { estado: true },
      })
      .populate({
        path: "etapa",
      })
      .populate({
        path: "tipoProyecto",
      });
    // TODO: Hacer el Join
    res.json(proyectos);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      error: "Error: " + e,
    });
  }
};

const createProyecto = async (req = request, res = response) => {
  try {
    const data = req.body;
    const { cliente, universidad } = data;
    // validamos si usuario está activo
    const clienteBD = await Cliente.findOne({
      _id: cliente._id,
      estado: true,
    });
    console.log("cliente retornado", clienteBD);
    if (!clienteBD) {
      return res.status(400).json({
        msj: "No existe el cliente",
      });
    }
    // validamos si la universidad está activa
    const universidadBD = await Universidad.findOne({
      _id: universidad._id,
      estado: true,
    });
    if (!universidadBD) {
      return res.status(400).json({
        msj: "No existe la universidad",
      });
    }
    const proyecto = new Proyecto(data);

    await proyecto.save();
    res.status(201).json(proyecto);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ msj: "Error" });
  }
};

const getProyectoByID = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const proyectoBD = await Proyecto.findById(id).populate({
      path: "cliente",
      match: { estado: true },
    });
    res.json(proyectoBD);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ msj: "Error" });
  }
};

const updateProyectoByID = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const data = req.body;
    // TODO: Coloca validaciones de cliente y universida como en crear
    const proyecto = await Proyecto.findByIdAndUpdate(id, data, { new: true });
    return res.status(201).json(proyecto);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ msj: "Error" });
  }
};

const deleteProyectoByID = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    await Proyecto.findByIdAndDelete(id, { new: true });
    return res.status(204).json({});
  } catch (e) {
    console.log(e);
    return res.status(500).json({ msj: "Error" });
  }
};

module.exports = {
  getProyectos,
  createProyecto,
  getProyectoByID,
  updateProyectoByID,
  deleteProyectoByID,
};
