const router = require("express").Router();
const { faker } = require("@faker-js/faker")

const BancoSangre = require("../model/BancoSangre.model")

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

router.get("/BancoSangre", async (req, res) => {
    try {
        const bancossangre = await BancoSangre.findAll()
    
    if (bancossangre <= 0) return res.status(404).json({
        message: 'No se encontro ningun Banco de Sangre'
    })
    
    res.status(200).json({
        ok: true,
        status: 200,
        body: bancossangre
    })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Ocurrio un error'
        })
    }
});

router.get("/BancoSangre/:ID_BancoSangre", async (req, res) => {
    const id = req.params.ID_BancoSangre;
    try {
        const bancosangre = await BancoSangre.findOne({
            where: {
                ID_BancoSangre: id,
            }
        })
        
        if (bancosangre <= 0) return res.status(404).json({
            message: 'Banco de Sangre no encontrado'
        })
    
        res.status(200).json({
            ok: true,
            status: 200,
            body: bancosangre
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Ocurrio un error'
        })
    }
});

router.post("/BancoSangre/POST", async (req, res) => {
    const dataBancoSangres = req.body
    try {
        await BancoSangre.sync({ alter: true})
        const createBancoSangre = await BancoSangre.create({
            ID_BancoSangre: generarNumerosAleatoriosSinRepetir(),
            Nombre_BancoSangre: dataBancoSangres.Nombre_BancoSangre,
            Ubicacion_BancoSangre: dataBancoSangres.Ubicacion_BancoSangre
            
    })
    res.status(201).json({
        ok: true,
        status: 201,
        message: "Banco de Sangre Creado",
    });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Ocurrio un error'
        })
    }
});

router.put("/BancoSangre/PUT/:ID_BancoSangre", async (req, res) => {
    const id = req.params.ID_BancoSangre;
    const dataBancoSangres = req.body;
    try {
        const updateBancoSangre = await BancoSangre.update({
            Nombre_BancoSangre: dataBancoSangres.Nombre_BancoSangre,
            Ubicacion_BancoSangre: dataBancoSangres.Ubicacion_BancoSangre
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
        console.log(error)
        return res.status(500).json({
            message: 'Ocurrio un error'
        })
    }
});

router.delete("/BancoSangre/DEL/:ID_BancoSangre", async (req, res) => {
    const id = req.params.ID_BancoSangre
    try {
        const deleteBancoSangre = await BancoSangre.destroy({
            where: {
                ID_BancoSangre: id,
            }
        })
    
        if (deleteBancoSangre <= 0) return res.status(404).json({
            message: 'Banco de Sangre no encontrado'
        })
    
        res.status(204).json({
            ok: true,
            status: 204,
            //body: deleteBancoSangre,
            message: 'Banco de Sangre eliminado'
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Ocurrio un error'
        })
    }
});

module.exports = router;