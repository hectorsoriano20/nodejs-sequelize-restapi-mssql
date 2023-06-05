const router = require("express").Router();
const { faker } = require("@faker-js/faker")

const Cita = require("../model/Cita.model")

function generarNumerosAleatoriosSinRepetir(cantidad = 1, minimo = 1, maximo = 100) {
    var numeros = [];
    while (numeros.length < cantidad) {
      var numeroAleatorio = Math.floor(Math.random() * (maximo - minimo + 1)) + minimo;
      if (numeros.indexOf(numeroAleatorio) === -1) {
        numeros.push(numeroAleatorio);
      }
    }
    return numeros;
  }

router.get("/Cita", async (req, res) => {
    try {
        const citas = await Cita.findAll()
    
    if (citas <= 0) return res.status(404).json({
        message: 'No se encontro ninguna Cita'
    })
    
    res.status(200).json({
        ok: true,
        status: 200,
        body: citas
    })
    } catch (error) {
        return res.status(500).json({
            message: 'Ocurrio un error'
            
        })
    }
});

router.get("/Cita/:ID_Cita", async (req, res) => {
    const id = req.params.ID_Cita;
    try {
        const cita = await Cita.findOne({
            where: {
                ID_Cita: id,
            }
        })
        
        if (cita <= 0) return res.status(404).json({
            message: 'Cita no encontrada'
        })
    
        res.status(200).json({
            ok: true,
            status: 200,
            body: cita
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Ocurrio un error'
        })
    }
});

router.post("/Cita/POST", async (req, res) => {
    const dataCitas = req.body
    try {
        await Cita.sync({ alter: true})
        const createCita = await Cita.create({
            ID_Cita: generarNumerosAleatoriosSinRepetir(),
            Correo: dataCitas.Correo,
            Fecha_Cita: dataCitas.Fecha_Cita,
            Hora_Cita: dataCitas.Hora_Cita
    })
    res.status(201).json({
        ok: true,
        status: 201,
        message: "Cita Creada",
    });
    } catch (error) {
        return res.status(500).json({
            message: 'Ocurrio un error'
        })
    }
});

router.put("/Cita/PUT/:ID_Cita", async (req, res) => {
    const id = req.params.ID_Cita;
    const dataCitas = req.body;
    try {
        const updateCita = await Cita.update({
            Correo: dataCitas.Correo,
            Fecha_Cita: dataCitas.Fecha_Cita,
            Hora_Cita: dataCitas.Hora_Cita
        }, {
            where: {
                ID_Cita: id,
            }
        })
    
        if (updateCita <= 0) return res.status(404).json({
            message: 'Cita no encontrada'
        })
    
        res.status(200).json({
            ok: true,
            status: 200,
            body: updateCita
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Ocurrio un error'
        })
    }
});

router.delete("/Cita/DEL/:ID_Cita", async (req, res) => {
    const id = req.params.ID_Cita
    try {
        const deleteCita = await Cita.destroy({
            where: {
                ID_Cita: id,
            }
        })
    
        if (deleteCita <= 0) return res.status(404).json({
            message: 'Cita no encontrada'
        })
    
        res.status(204).json({
            ok: true,
            status: 204,
            body: deleteCita
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Ocurrio un error'
        })
    }
});

module.exports = router;