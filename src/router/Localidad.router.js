const router = require("express").Router();
const { faker } = require("@faker-js/faker")

const Localidad = require("../model/Localidad.model")

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

router.get("/Localidad", async (req, res) => {
    try {
        const localidades = await Localidad.findAll()
    
    if (localidades <= 0) return res.status(404).json({
        message: 'No se encontro ninguna Localidad'
    })
    
    res.status(200).json({
        ok: true,
        status: 200,
        body: localidades
    })
    } catch (error) {
        return res.status(500).json({
            message: 'Ocurrio un error'
        })
    }
});

router.get("/Localidad/:ID_Localidad", async (req, res) => {
    const id = req.params.ID_Localidad;
    try {
        const localidad = await Localidad.findOne({
            where: {
                ID_Localidad: id,
            }
        })
        
        if (localidad <= 0) return res.status(404).json({
            message: 'Localidad no encontrada'
        })
    
        res.status(200).json({
            ok: true,
            status: 200,
            body: localidad
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Ocurrio un error'
        })
    }
});

router.post("/Localidad", async (req, res) => {
    const dataLocalidades = req.body
    try {
        await Localidad.sync({ alter: true})
        const createLocalidad = await Localidad.create({
            ID_Localidad: generarNumerosAleatoriosSinRepetir(),
            Nombre_Localidad: dataLocalidades.Nombre_Localidad
    })
    res.status(201).json({
        ok: true,
        status: 201,
        message: "Localidad Creada",
    });
    } catch (error) {
        return res.status(500).json({
            message: 'Ocurrio un error'
        })
    }
});

router.put("/Localidad/:ID_Localidad", async (req, res) => {
    const id = req.params.ID_Localidad;
    const dataLocalidades = req.body;
    try {
        const updateLocalidad = await Localidad.update({
            Nombre_Localidad: dataBancoSangres.Localidad
        }, {
            where: {
                ID_Localidad: id,
            }
        })
    
        if (updateLocalidad <= 0) return res.status(404).json({
            message: 'Localidad no encontrada'
        })
    
        res.status(200).json({
            ok: true,
            status: 200,
            body: updateLocalidad
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Ocurrio un error'
        })
    }
});

router.delete("/Localidad/:ID_Localidad", async (req, res) => {
    const id = req.params.ID_Localidad
    try {
        const deleteLocalidad = await Localidad.destroy({
            where: {
                ID_Localidad: id,
            }
        })
    
        if (deleteLocalidad <= 0) return res.status(404).json({
            message: 'Localidad no encontrada'
        })
    
        res.status(204).json({
            ok: true,
            status: 204,
            body: deleteLocalidad
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Ocurrio un error'
        })
    }
});

module.exports = router;