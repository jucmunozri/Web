const { Router } = require("express");
const {
  createEtapa,
  getEtapas,
  getEtapaByID,
  updateEtapaByID,
  deleteEtapaByID,
} = require("../controllers/etapas");

const router = Router();

router.post("/", createEtapa);

router.get("/", getEtapas);

router.get("/:id", getEtapaByID);

router.put("/:id", updateEtapaByID);

router.delete("/:id", deleteEtapaByID);

module.exports = router;
