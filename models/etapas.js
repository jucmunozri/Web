const { Schema, model } = require("mongoose");

const EtapasSchema = Schema({
  nombre: {
    type: String,
    required: [true, "Nombre de etapa requerido"],
  },
  estado: {
    type: Boolean,
    default: true,
    required: true,
  },
  fechaCreacion: {
    type: Date,
    default: new Date(),
  },
  fechaActualizacion: {
    type: Date,
    default: new Date(),
  },
});

module.exports = model("Etapas", EtapasSchema);
