const router = require("express").Router();
const { faker } = require("@faker-js/faker")

const CompraSangre = require("../model/CompraSangre.model")

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

router.get("/CompraSangre", async (req, res) => {
    try {
        const comprasangre = await CompraSangre.findAll()
    
    if (comprasangre <= 0) return res.status(404).json({
        message: 'No se encontro ningun Comprador de Sangre'
    })
    
    res.status(200).json({
        ok: true,
        status: 200,
        body: comprasangre
    })
    } catch (error) {
        return res.status(500).send(error.message);
    }
});

router.get("/CompraSangre/:ID_CompraSangre", async (req, res) => {
    const id = req.params.ID_CompraSangre;
    try {
        const comprasangre = await CompraSangre.findOne({
            where: {
                ID_CompraSangre: id,
            }
        })
        
        if (comprasangre <= 0) return res.status(404).json({
            message: 'No se encontro ningun Comprador de Sangre'
        })
    
        res.status(200).json({
            ok: true,
            status: 200,
            body: comprasangre
        })
    } catch (error) {
        return res.status(500).send(error.message);
    }
});

router.post("/CompraSangre/POST", async (req, res) => {
    const dataCompraSangres = req.body
    try {
        await CompraSangre.sync({ alter: true})
        const createCompraSangre = await CompraSangre.create({
            ID_CompraSangre: generarNumerosAleatoriosSinRepetir(),
            Cedula_Comprador: dataCompraSangres.Cedula_Comprador,
            Nombre_Comprador: dataCompraSangres.Nombre_Comprador,
            Correo_Compra: dataCompraSangres.Correo_Compra,
            Telefono_Compra: dataCompraSangres.Telefono_Compra,
            Grupo_Sanguineo_Compra: dataCompraSangres.Grupo_Sanguineo_Compra,
            Cedula_Donante: dataCompraSangres.Cedula_Donante,
            Nombre_Donante: dataCompraSangres.Nombre_Donante,
            Grupo_Sanguineo_Donante: dataCompraSangres.Grupo_Sanguineo_Donante,
            Edad_Donante: dataCompraSangres.Edad_Donante,
            Estatus_Compra: dataCompraSangres.Estatus_Compra,
    })
    res.status(201).json({
        ok: true,
        status: 201,
        message: "Comprador Creado",
    });
    } catch (error) {
        return res.status(500).send(error.message);
    }
});

router.put("/CompraSangre/PUT/:ID_CompraSangre", async (req, res) => {
    const id = req.params.ID_CompraSangre;
    const dataCompraSangres = req.body;
    try {
        const updateCompraSangre = await CompraSangre.update({
            Cedula_Comprador: dataCompraSangres.Cedula_Comprador,
            Nombre_Comprador: dataCompraSangres.Nombre_Comprador,
            Correo_Compra: dataCompraSangres.Correo_Compra,
            Telefono_Compra: dataCompraSangres.Telefono_Compra,
            Grupo_Sanguineo_Compra: dataCompraSangres.Grupo_Sanguineo_Compra,
            Cedula_Donante: dataCompraSangres.Cedula_Donante,
            Nombre_Donante: dataCompraSangres.Nombre_Donante,
            Grupo_Sanguineo_Donante: dataCompraSangres.Grupo_Sanguineo_Donante,
            Edad_Donante: dataCompraSangres.Edad_Donante,
            Estatus_Compra: dataCompraSangres.Estatus_Compra,
        }, {
            where: {
                ID_CompraSangre: id,
            }
        })
    
        if (updateCompraSangre <= 0) return res.status(404).json({
            message: 'Comprador no encontrado'
        })
    
        res.status(200).json({
            ok: true,
            status: 200,
            body: updateCompraSangre
        })
    } catch (error) {
        return res.status(500).send(error.message);
    }
});

router.delete("/CompraSangre/DEL/:ID_CompraSangre", async (req, res) => {
    const id = req.params.ID_CompraSangre
    try {
        const deleteCompraSangre = await CompraSangre.destroy({
            where: {
                ID_CompraSangre: id,
            }
        })
    
        if (deleteCompraSangre <= 0) return res.status(404).json({
            message: 'Comprador no encontrado'
        })
    
        res.status(204).json({
            ok: true,
            status: 204,
            //body: deleteBancoSangre,
            message: 'Comprador eliminado'
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error.message);
    }
});

module.exports = router;