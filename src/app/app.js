const express = require('express');
const morgan = require("morgan");
const cors = require('cors');
const app = express();


const routerBancoSangre = require("../router/BancoSangre.router")
const routerCliente = require("../router/Cliente.router")
const routerDonante = require("../router/Donante.router")
const routerDonantePinta = require("../router/DonantePinta.router")
const routerEmpleado = require("../router/Empleado.router")
const routerLocalidad = require("../router/Localidad.router")
const routerPersona = require("../router/Persona.router")
const routerProvincia = require("../router/Provincia.router")
const routerRegistro = require("../router/Registro.router")
const routerRolesEmpleado = require("../router/RolesEmpleado.router")
const routerUbicaciones = require("../router/Ubicaciones.router")
const routerCita = require("../router/Cita.router")
const routerEmail = require("../router/Email.router")
const routerCompraSangre = require("../router/CompraSangre.router")
const routerPinta = require("../router/Pinta.router")

app.use(cors());
app.use(morgan("dev"))

app.get('/', (req, res) => {
    res.send('GESTION ESCRLATA API');
});
app.use(express.json())
app.use("/api/v1", routerBancoSangre)
app.use("/api/v1", routerCliente)
app.use("/api/v1", routerDonante)
app.use("/api/v1", routerDonantePinta)
app.use("/api/v1", routerEmpleado)
app.use("/api/v1", routerLocalidad)
app.use("/api/v1", routerPersona)
app.use("/api/v1", routerProvincia)
app.use("/api/v1", routerRegistro)
app.use("/api/v1", routerRolesEmpleado)
app.use("/api/v1", routerUbicaciones)
app.use("/api/v1", routerCita)
app.use("/api/v1", routerEmail)
app.use("/api/v1", routerCompraSangre)
app.use("/api/v1", routerPinta)



app.use((req, res, next) => {
    res.status(404).json({
        message: 'No se encontro el Endpoint'
    })
})

module.exports = app;