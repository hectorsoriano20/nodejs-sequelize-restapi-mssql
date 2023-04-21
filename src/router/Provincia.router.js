const router = require("express").Router();
const { faker } = require("@faker-js/faker")

const Provincia = require("../model/Provincia.model")

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

router.get("/Provincia", async (req, res) => {
    try {
        const provincias = await Provincia.findAll()
    
    if (provincias <= 0) return res.status(404).json({
        message: 'No se encontro ninguna Provincia'
    })
    
    res.status(200).json({
        ok: true,
        status: 200,
        body: provincias
    })
    } catch (error) {
        return res.status(500).json({
            message: 'Ocurrio un error'
        })
    }
});

router.get("/Provincia/:ID_Provincias", async (req, res) => {
    const id = req.params.ID_Provincias;
    try {
        const provincia = await Provincia.findOne({
            where: {
                ID_Provincias: id,
            }
        })
        
        if (provincia <= 0) return res.status(404).json({
            message: 'Provincia no encontrada'
        })
    
        res.status(200).json({
            ok: true,
            status: 200,
            body: provincia
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Ocurrio un error'
        })
    }
});

router.post("/Provincia/POST", async (req, res) => {
    const dataProvincias = req.body
    try {
        await Provincia.sync({ alter: true})
        const createProvincia = await Provincia.create({
            ID_Provincias: generarNumerosAleatoriosSinRepetir(),
            Nombre_Provincia: dataProvincias.Nombre_Provincia,
            Ubicacion_Provincia: dataProvincias.Ubicacion_Provincia
    })
    res.status(201).json({
        ok: true,
        status: 201,
        message: "Provincia Creada",
    });
    } catch (error) {
        return res.status(500).json({
            message: 'Ocurrio un error'
        })
    }
});

router.put("/Provincia/PUT/:ID_Provincias", async (req, res) => {
    const id = req.params.ID_Provincias;
    const dataProvincias = req.body;
    try {
        const updateProvincia = await Provincia.update({
            Nombre_Provincia: dataProvincias.Nombre_Provincia,
            Ubicacion_Provincia: dataProvincias.Ubicacion_Provincia
        }, {
            where: {
                ID_Provincias: id,
            }
        })
    
        if (updateProvincia <= 0) return res.status(404).json({
            message: 'Provincia no encontrada'
        })
    
        res.status(200).json({
            ok: true,
            status: 200,
            body: updateProvincia
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Ocurrio un error'
        })
    }
});

router.delete("/Provincia/DEL/:ID_Provincias", async (req, res) => {
    const id = req.params.ID_Provincias
    try {
        const deleteProvincia = await Provincia.destroy({
            where: {
                ID_Provincias: id,
            }
        })
    
        if (deleteProvincia <= 0) return res.status(404).json({
            message: 'Provincia no encontrada'
        })
    
        res.status(204).json({
            ok: true,
            status: 204,
            body: deleteProvincia
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Ocurrio un error'
        })
    }
});

module.exports = router;