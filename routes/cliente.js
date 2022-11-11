const { Router } = require("express");
const {
  createCliente,
  getClientes,
  getClienteByID,
  updateClienteByID,
  deleteClienteByID,
} = require("../controllers/cliente");

const router = Router();

router.post("/", createCliente);

router.get("/", getClientes);

router.get("/:id", getClienteByID);

router.put("/:id", updateClienteByID);

router.delete("/:id", deleteClienteByID);

module.exports = router;
