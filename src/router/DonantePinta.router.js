const router = require("express").Router();
const { faker } = require("@faker-js/faker")

const DonantePinta = require("../model/DonantePinta.model")

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

router.get("/DonantePinta", async (req, res) => {
    try {
        const donantespinta = await DonantePinta.findAll()
    
    if (donantespinta <= 0) return res.status(404).json({
        message: 'No se encontro ningun Donante'
    })
    
    res.status(200).json({
        ok: true,
        status: 200,
        body: donantespinta
    })
    } catch (error) {
        return res.status(500).json({
            message: 'Ocurrio un error'
        })
    }
});

router.get("/DonantePinta/:ID_DonantePinta", async (req, res) => {
    const id = req.params.ID_DonantePinta;
    try {
        const donantepinta = await DonantePinta.findOne({
            where: {
                ID_DonantePinta: id,
            }
        })
        
        if (donantepinta <= 0) return res.status(404).json({
            message: 'Donante no encontrado'
        })
    
        res.status(200).json({
            ok: true,
            status: 200,
            body: donantepinta
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Ocurrio un error'
        })
    }
});

router.post("/DonantePinta/POST", async (req, res) => {
    const dataDonantePintas = req.body
    try {
        await DonantePinta.sync({ alter: true})
        const createDonantePinta = await DonantePinta.create({
            ID_DonantePinta: generarNumerosAleatoriosSinRepetir()
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

/* router.put("/DonantePinta/:ID_DonantePinta", async (req, res) => {
    const id = req.params.ID_DonantePinta;
    const dataBancoSangres = req.body;
    try {
        const updateDonantePinta = await DonantePinta.update({
            Nombre_BancoSangre: dataBancoSangres.Nombre_BancoSangre
        }, {
            where: {
                ID_BancoSangre: id,
            }
        })
    
        if (updateBancoSangre <= 0) return res.status(404).json({
            message: 'Banco de Sangre no encontrado'
        })
    
        res.status(200).json({
            ok: true,
            status: 200,
            body: updateBancoSangre
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Ocurrio un error'
        })
    }
}); */

router.delete("/DonantePinta/DEL/:ID_DonantePinta", async (req, res) => {
    const id = req.params.ID_DonantePinta
    try {
        const deleteDonantePinta = await DonantePinta.destroy({
            where: {
                ID_DonantePinta: id,
            }
        })
    
        if (deleteDonantePinta <= 0) return res.status(404).json({
            message: 'Donante no encontrado'
        })
    
        res.status(204).json({
            ok: true,
            status: 204,
            body: deleteDonantePinta
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Ocurrio un error'
        })
    }
});

module.exports = router;