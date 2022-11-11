const { Router } = require("express");
const {
  createUniversidad,
  getUniversidades,
  getUniversidadByID,
  updateUniversidadByID,
  deleteUniversidadByID,
} = require("../controllers/universidad");

const router = Router();

router.post("/", createUniversidad);

router.get("/", getUniversidades);

router.get("/:id", getUniversidadByID);

router.put("/:id", updateUniversidadByID);

router.delete("/:id", deleteUniversidadByID);

module.exports = router;
