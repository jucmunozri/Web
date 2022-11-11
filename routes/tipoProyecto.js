const { Router } = require("express");
const {
  createTipoProyecto,
  getTiposProyecto,
  getTipoProyectoByID,
  updateTipoProyectoByID,
  deleteTipoProyectoByID,
} = require("../controllers/tipoProyecto");

const router = Router();

router.post("/", createTipoProyecto);

router.get("/", getTiposProyecto);

router.get("/:id", getTipoProyectoByID);

router.put("/:id", updateTipoProyectoByID);

router.delete("/:id", deleteTipoProyectoByID);

module.exports = router;
