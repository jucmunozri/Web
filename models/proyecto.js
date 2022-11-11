const { Schema, model } = require("mongoose");

const ProyectoSchema = Schema({
  numero: {
    type: String,
    required: [true, "numero requerido"],
    unique: [true, "proyecto en uso"],
  },
  titulo: {
    type: String,
    required: [true, "titulo requerido"],
  },
  fechaInicio: {
    type: Date,
  },
  fechaEntrega: {
    type: Date,
  },
  valor: {
    type: Number,
  },
  cliente: {
    type: Schema.Types.ObjectId,
    ref: "Cliente",
    required: true,
  },
  universidad: {
    type: Schema.Types.ObjectId,
    ref: "Universidad",
    required: true,
  },
  etapa: {
    type: Schema.Types.ObjectId,
    ref: "Etapa",
    required: true,
  },
  tipoProyecto: {
    type: Schema.Types.ObjectId,
    ref: "TipoProyecto",
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

module.exports = model("Proyecto", ProyectoSchema);
