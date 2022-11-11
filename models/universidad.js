const { Schema, model } = require("mongoose");

const UniversidadSchema = Schema({
  nombre: {
    type: String,
    required: [true, "Nombre marca requerido"],
  },
  direccion: {
    type: String,
  },
  telefono: {
    type: Number,
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

module.exports = model("Universidad", UniversidadSchema);
