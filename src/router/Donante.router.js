const router = require("express").Router();
const { faker } = require("@faker-js/faker")

const Donante = require("../model/Donante.model")

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

router.get("/Donante", async (req, res) => {
    try {
        const donantes = await Donante.findAll()
    
    if (donantes <= 0) return res.status(404).json({
        message: 'No se encontro ningun Donante'
    })
    
    res.status(200).json({
        ok: true,
        status: 200,
        body: donantes
    })
    } catch (error) {
        return res.status(500).json({
            message: 'Ocurrio un error'
        })
    }
});

router.get("/Donante/:ID_Donante", async (req, res) => {
    const id = req.params.ID_Donante;
    try {
        const donante = await Donante.findOne({
            where: {
                ID_Donante: id,
            }
        })
        
        if (donante <= 0) return res.status(404).json({
            message: 'Donante no encontrado'
        })
    
        res.status(200).json({
            ok: true,
            status: 200,
            body: donante
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Ocurrio un error'
        })
    }
});

router.post("/Donante", async (req, res) => {
    const dataDonantes = req.body
    try {
        await Donante.sync({ alter: true})
        const createDonante = await Donante.create({
            ID_Donante: generarNumerosAleatoriosSinRepetir(),
            TipoSangre_Donante: dataDonantes.TipoSangre_Donante,
            Enfermedades: dataDonantes.Enfermedades,
            EnfermedadesProhibida: dataDonantes.EnfermedadesProhibida,
            Pintas_Donante: dataDonantes.Pintas_Donante,
    })
    res.status(201).json({
        ok: true,
        status: 201,
        message: "Donante Creado",
    });
    } catch (error) {
        return res.status(500).json({
            message: 'Ocurrio un error'
        })
    }
});

router.put("/Donante/:ID_Donante", async (req, res) => {
    const id = req.params.ID_Donante;
    const dataDonantes = req.body;
    try {
        const updateDonante = await Donante.update({
            TipoSangre_Donante: dataDonantes.TipoSangre_Donante,
            Enfermedades: dataDonantes.Enfermedades,
            EnfermedadesProhibida: dataDonantes.EnfermedadesProhibida,
            Pintas_Donante: dataDonantes.Pintas_Donante,
        }, {
            where: {
                ID_Donante: id,
            }
        })
    
        if (updateDonante <= 0) return res.status(404).json({
            message: 'Donante no encontrado'
        })
    
        res.status(200).json({
            ok: true,
            status: 200,
            body: updateDonante
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Ocurrio un error'
        })
    }
});

router.delete("/Donante/:ID_Donante", async (req, res) => {
    const id = req.params.ID_BancoSangre
    try {
        const deleteDonante = await Donante.destroy({
            where: {
                ID_Donante: id,
            }
        })
    
        if (deleteDonante <= 0) return res.status(404).json({
            message: 'Donante no encontrado'
        })
    
        res.status(204).json({
            ok: true,
            status: 204,
            body: deleteDonante
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Ocurrio un error'
        })
    }
});

module.exports = router;