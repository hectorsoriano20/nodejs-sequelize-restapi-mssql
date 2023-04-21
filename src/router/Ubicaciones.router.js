const router = require("express").Router();
const { faker } = require("@faker-js/faker")

const Ubicaciones = require("../model/Ubicaciones.model");

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

router.get("/Ubicaciones", async (req, res) => {
    try {
        const ubicaciones = await Ubicaciones.findAll()
    
    if (ubicaciones <= 0) return res.status(404).json({
        message: 'No se encontro ninguna Ubicacion'
    })
    
    res.status(200).json({
        ok: true,
        status: 200,
        body: ubicaciones
    })
    } catch (error) {
        return res.status(500).json({
            message: 'Ocurrio un error'
        })
    }
});

router.get("/Ubicaciones/:ID_Ubicaciones", async (req, res) => {
    const id = req.params.ID_Ubicaciones;
    try {
        const ubicacion = await Ubicaciones.findOne({
            where: {
                ID_Ubicaciones: id,
            }
        })
        
        if (ubicacion <= 0) return res.status(404).json({
            message: 'Ubicacion no encontrada'
        })
    
        res.status(200).json({
            ok: true,
            status: 200,
            body: ubicacion
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Ocurrio un error'
        })
    }
});

router.post("/Ubicaciones/POST", async (req, res) => {
    const dataUbicaciones = req.body
    try {
        await Ubicaciones.sync({ alter: true})
        const createUbicaciones = await Ubicaciones.create({
            ID_Ubicaciones: generarNumerosAleatoriosSinRepetir(),
            
    })
    res.status(201).json({
        ok: true,
        status: 201,
        message: "Ubicacion Creada",
    });
    } catch (error) {
        return res.status(500).json({
            message: 'Ocurrio un error'
        })
    }
});

router.put("/Ubicaciones/PUT/:ID_Ubicaciones", async (req, res) => {
    const id = req.params.ID_Ubicaciones;
    const dataUbicaciones = req.body;
    try {
        const updateUbicaciones = await Ubicaciones.update({
        }, {
            where: {
                ID_Ubicaciones: id,
            }
        })
    
        if (updateUbicaciones <= 0) return res.status(404).json({
            message: 'Ubicacion no encontrada'
        })
    
        res.status(200).json({
            ok: true,
            status: 200,
            body: updateUbicaciones
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Ocurrio un error'
        })
    }
});

router.delete("/Ubicaciones/DEL/:ID_Ubicaciones", async (req, res) => {
    const id = req.params.ID_Ubicaciones
    try {
        const deleteUbicaciones = await Ubicaciones.destroy({
            where: {
                ID_Ubicaciones: id,
            }
        })
    
        if (deleteUbicaciones <= 0) return res.status(404).json({
            message: 'Ubicacion no encontrada'
        })
    
        res.status(204).json({
            ok: true,
            status: 204,
            body: deleteUbicaciones
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Ocurrio un error'
        })
    }
});

module.exports = router;