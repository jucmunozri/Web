const { Router } = require("express");

const {
  getProyectos,
  createProyecto,
  getProyectoByID,
  updateProyectoByID,
  deleteProyectoByID,
} = require("../controllers/proyecto");

const router = Router();

router.get("/", getProyectos);

router.post("/", createProyecto);

router.get("/:id", getProyectoByID);

router.put("/:id", updateProyectoByID);

router.delete("/:id", deleteProyectoByID);

module.exports = router;
