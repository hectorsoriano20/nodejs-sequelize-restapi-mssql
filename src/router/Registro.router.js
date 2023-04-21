const router = require("express").Router();
const { faker } = require("@faker-js/faker")

const Registro = require("../model/Registro.model")

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

router.get("/Registro", async (req, res) => {
    try {
        const registros = await Registro.findAll()
    
    if (registros <= 0) return res.status(404).json({
        message: 'No se encontro ningun Registro'
    })
    
    res.status(200).json({
        ok: true,
        status: 200,
        body: registros
    })
    } catch (error) {
        return res.status(500).json({
            message: 'Ocurrio un error'
        })
    }
});

router.get("/Registro/:ID_Registro", async (req, res) => {
    const id = req.params.ID_Registro;
    try {
        const registro = await Registro.findOne({
            where: {
                ID_Registro: id,
            }
        })
        
        if (registro <= 0) return res.status(404).json({
            message: 'Registro no encontrado'
        })
    
        res.status(200).json({
            ok: true,
            status: 200,
            body: registro
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Ocurrio un error'
        })
    }
});

router.post("/Registro/POST", async (req, res) => {
    const dataRegistros = req.body
    try {
        await Registro.sync({ alter: true})
        const createRegistro = await Registro.create({
            ID_Registro: generarNumerosAleatoriosSinRepetir(),
            pinta_registro_Donante: dataRegistros.pinta_registro_Donante
            
    })
    res.status(201).json({
        ok: true,
        status: 201,
        message: "Registro Creado",
    });
    } catch (error) {
        return res.status(500).json({
            message: 'Ocurrio un error'
        })
    }
});

router.put("/Registro/PUT/:ID_Registro", async (req, res) => {
    const id = req.params.ID_Registro;
    const dataRegistros = req.body;
    try {
        const updateRegistro = await Registro.update({
            pinta_registro_Donante: dataRegistros.pinta_registro_Donante
        }, {
            where: {
                ID_Registro: id,
            }
        })
    
        if (updateRegistro <= 0) return res.status(404).json({
            message: 'Registro no encontrado'
        })
    
        res.status(200).json({
            ok: true,
            status: 200,
            body: updateRegistro
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Ocurrio un error'
        })
    }
});

router.delete("/Registro/DEL/:ID_Registro", async (req, res) => {
    const id = req.params.ID_Registro
    try {
        const deleteRegistro = await Registro.destroy({
            where: {
                ID_Registro: id,
            }
        })
    
        if (deleteRegistro <= 0) return res.status(404).json({
            message: 'Registro no encontrado'
        })
    
        res.status(204).json({
            ok: true,
            status: 204,
            body: deleteRegistro
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Ocurrio un error'
        })
    }
});

module.exports = router;