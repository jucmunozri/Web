const Cliente = require("../models/cliente");
const { request, response } = require("express");
/**
 * Crear cliente
 */
const createCliente = async (req = request, res = response) => {
  try {
    const data = req.body;
    const email = data.email;
    console.log(data);
    const clienteBD = await Cliente.findOne({ email });
    if (clienteBD) {
      return res.status(400).json({ msg: "Ya existe el cliente" });
    }
    const cliente = new Cliente(data);
    console.log(cliente);
    await cliente.save();
    return res.status(201).json(cliente);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ e });
  }
};

/**
 * Consulta todos los clientes
 */
// const getClientes = async (req = request, res = response) => {
//   try {
//     console.log(req.query);
//     const estado = req.query.estado;
//     const query = { estado: estado };
//     const clientes = await Cliente.find(query);
//     return res.json(clientes);
//   } catch (e) {
//     return res.status(500).json({ msj: e });
//   }
// };

/**
 *  Consulta un cliente por su ID
 */
// const getClienteByID = async (req = request, res = response) => {
//   try {
//     const id = req.params.id;
//     const filter = { _id: id };
//     const clienteDB = await Cliente.findOne(filter);
//     return res.json(clienteDB);
//   } catch (e) {
//     return res.status(500).json({ msj: e });
//   }
// };

/**
 * Actualiza un cliente por su ID
 */
const updateClienteByID = async (req = request, res = response) => {
  try {
    const id = req.params.id;
    const data = req.body;
    console.log(data);
    console.log(id);
    data.fechaActualizacion = new Date();
    console.log(data);
    const cliente = await Cliente.findByIdAndUpdate(id, data, { new: true });
    return res.status(201).json(cliente);
  } catch (e) {
    return res.status(500).json({ msj: e });
  }
};

/**
 * Borra un cliente por su ID
 */
const deleteClienteByID = async (req = request, res = response) => {
  try {
    const id = req.params.id;
    const clienteBD = await Cliente.findById(id);
    if (!clienteBD) {
      return res.status(404).json({ msj: "No existe el cliente" });
    }
    await Cliente.findByIdAndDelete(id);
    return res.status(204).json({ msj: "Borrado " });
  } catch (e) {
    return res.status(500).json({ msj: e });
  }
};

module.exports = {
  createCliente,
  // getClientes,
  // getClienteByID,
  updateClienteByID,
  deleteClienteByID,
};
