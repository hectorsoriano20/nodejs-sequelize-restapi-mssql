const router = require("express").Router();
const { faker } = require("@faker-js/faker")

const Pinta = require("../model/Pinta.model")
const BancoYPinta = require("../model/BancoYPinta.model")

function generarNumerosAleatoriosSinRepetir(cantidad = 1, minimo = 1, maximo = 400) {
    var numeros = [];
    while (numeros.length < cantidad) {
      var numeroAleatorio = Math.floor(Math.random() * (maximo - minimo + 1)) + minimo;
      if (numeros.indexOf(numeroAleatorio) === -1) {
        numeros.push(numeroAleatorio);
      }
    }
    return numeros;
  }

router.get("/Pinta", async (req, res) => {
    try {
        const pintas = await Pinta.findAll()
    
    if (pintas <= 0) return res.status(404).json({
        message: 'No se encontro ninguna Pinta'
    })
    
    res.status(200).json({
        ok: true,
        status: 200,
        body: pintas
    })
    } catch (error) {
        return res.status(500).json({
            message: 'Ocurrio un error'
        })
    }
});

router.get("/Pinta/:ID_Pinta", async (req, res) => {
    const id = req.params.ID_Pinta;
    try {
        const pinta = await Pinta.findOne({
            where: {
                ID_Pinta: id,
            }
        })
        
        if (pinta <= 0) return res.status(404).json({
            message: 'Pinta no encontrada'
        })
    
        res.status(200).json({
            ok: true,
            status: 200,
            body: pinta
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Ocurrio un error'
        })
    }
});

router.get("/Pinta/Tipo/:Tipo_Pinta", async (req, res) => {
    const pintas = req.params.Tipo_Pinta;
    try {
        const pinta = await Pinta.findAll({
            where: {
                Tipo_Pinta: pintas,
            }
        })
        
        if (pinta <= 0) return res.status(404).json({
            message: 'Pinta no encontrada'
        })
    
        res.status(200).json({
            ok: true,
            status: 200,
            body: pinta
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Ocurrio un error'
        })
    }
});

router.get("/Pinta/Cedula/:Cedula_Persona", async (req, res) => {
    const cedulas = req.params.Cedula_Persona;
    try {
        const cedula = await Pinta.findAll({
            where: {
                Cedula_Persona: cedulas,
            }
        })
        
        if (cedula <= 0) return res.status(404).json({
            message: 'Cedula no encontrada'
        })
    
        res.status(200).json({
            ok: true,
            status: 200,
            body: cedula
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Ocurrio un error'
        })
    }
});

router.post("/Pinta/POST", async (req, res) => {
    const dataPintas = req.body;
    const idGenerado = generarNumerosAleatoriosSinRepetir(); // Guardamos el ID generado
    try {
        await Pinta.sync({ alter: true});
        await Pinta.create({
            ID_Pinta: idGenerado, // Usamos el ID generado
            Nombre_Apellido_Pinta: dataPintas.Nombre_Apellido_Pinta,
            Correo_Pinta: dataPintas.Correo_Pinta,
            Tipo_Pinta: dataPintas.Tipo_Pinta,
            FechaDonacion_Pinta: dataPintas.FechaDonacion_Pinta,
            Cedula_Persona: dataPintas.Cedula_Persona,
            Nombre_BancoSangre: dataPintas.Nombre_BancoSangre,
            Estado_Pinta: dataPintas.Estado_Pinta
        });

        await BancoYPinta.sync({ alter: true});
        await BancoYPinta.create({
            ID_BancoYPinta: idGenerado, // Usamos el mismo ID generado
            Nombre_BancoSangre: dataPintas.Nombre_BancoSangre,
            Nombre_Apellido_Pinta: dataPintas.Nombre_Apellido_Pinta,
            Tipo_Pinta: dataPintas.Tipo_Pinta,
            FechaDonacion_Pinta: dataPintas.FechaDonacion_Pinta,
            Estado_Pinta: dataPintas.Estado_Pinta,
            
        });

        res.status(201).json({
            ok: true,
            status: 201,
            message: "Pinta Agregada",
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Ocurrio un error'
        });
    }
});



router.put("/Pinta/PUT/:ID_Pinta", async (req, res) => {
    const id = req.params.ID_Pinta;
    const dataPintas = req.body;
    try {
        const updatePinta = await Pinta.update({
            Nombre_Apellido_Pinta: dataPintas.Nombre_Apellido_Pinta,
            Correo_Pinta: dataPintas.Correo_Pinta,
            Tipo_Pinta: dataPintas.Tipo_Pinta,
            FechaDonacion_Pinta: dataPintas.FechaDonacion_Pinta,
            Cedula_Persona: dataPintas.Cedula_Persona,
            Nombre_BancoSangre: dataPintas.Nombre_BancoSangre,
            Estado_Pinta: dataPintas.Estado_Pinta
        }, {
            where: {
                ID_Pinta: id,
            }
        })

        const updateBancoYPinta = await BancoYPinta.update({
            Nombre_BancoSangre: dataPintas.Nombre_BancoSangre,
            Tipo_Pinta: dataPintas.Tipo_Pinta,
            Estado_Pinta: dataPintas.Estado_Pinta
        }, {
            where: {
                ID_BancoYPinta: id,
            }
        })

        if (updatePinta[0] <= 0 || updateBancoYPinta[0] <= 0) {
            return res.status(404).json({
                message: 'Pinta no encontrada'
            })
        }
    
        res.status(200).json({
            ok: true,
            status: 200,
            message: "Pinta Actualizada",
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Ocurrio un error'
        })
    }
});


router.delete("/Pinta/DEL/:ID_Pinta", async (req, res) => {
    const id = req.params.ID_Pinta
    try {
        const deletePinta = await Pinta.destroy({
            where: {
                ID_Pinta: id,
            }
        })
    
        if (deletePinta <= 0) return res.status(404).json({
            message: 'Pinta no encontrada'
        })
    
        res.status(204).json({
            ok: true,
            status: 204,
            message: "Pinta Eliminada"
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Ocurrio un error'
        })
    }
});

module.exports = router;