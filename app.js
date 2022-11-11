const express = require("express");

const app = express(); // se crea instancia de express

const fileUpload = require("express-fileupload");
const cors = require("cors");
/**
 * importación de rutas
 */
const tipoProyecto = require("./routes/tipoProyecto");
const etapas = require("./routes/etapas");
const universidad = require("./routes/universidad");
const cliente = require("./routes/cliente");
const proyecto = require("./routes/proyecto");
/**
 * middlewares
 */
//middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use(cors());
/**
 * Utilizar sustantivos en plural para una URI
 */
app.use("/api/tipoproyectos", tipoProyecto);
app.use("/api/etapas", etapas);
app.use("/api/universidades", universidad);
app.use("/api/clientes", cliente);
app.use("/api/proyectos", proyecto);

app.get("*", (req, res) => {
  return res.status(404).json({
    msj: "pagina no encontrada",
  });
});

module.exports = app;
