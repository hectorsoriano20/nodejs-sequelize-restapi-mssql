const router = require("express").Router();
const { faker } = require("@faker-js/faker")

const Persona = require("../model/Persona.model")

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

router.get("/Persona", async (req, res) => {
    try {
        const personas = await Persona.findAll()
    
    if (personas <= 0) return res.status(404).json({
        message: 'No se encontro ninguna Persona'
    })
    
    res.status(200).json({
        ok: true,
        status: 200,
        body: personas
    })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Ocurrio un error'
        })
    }
});

router.get("/Persona/:ID_Persona", async (req, res) => {
    const id = req.params.ID_Persona;
    try {
        const persona = await Persona.findOne({
            where: {
                ID_Persona: id,
            }
        })
        
        if (persona <= 0) return res.status(404).json({
            message: 'Persona no encontrada'
        })
    
        res.status(200).json({
            ok: true,
            status: 200,
            body: persona
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Ocurrio un error'
        })
    }
});

router.get("/Persona/Tipo/:Estado_Persona", async (req, res) => {
    const pintas = req.params.Estado_Persona;
    try {
        const pinta = await Persona.findAll({
            where: {
                Estado_Persona: pintas,
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

router.post("/Persona/POST", async (req, res) => {
    const dataPersonas = req.body
    try {
        await Persona.sync({ alter: true})
        const createPersona = await Persona.create({
            ID_Persona: generarNumerosAleatoriosSinRepetir(),
            Nombre_Persona: dataPersonas.Nombre_Persona,
            Apellido_Persona: dataPersonas.Apellido_Persona,
            Edad_Persona: dataPersonas.Edad_Persona,
            FechaNacimiento_Persona: dataPersonas.FechaNacimiento_Persona,
            Correo_Persona: dataPersonas.Correo_Persona,
            Numero_Persona: dataPersonas.Numero_Persona,
            Contrasena_Persona: dataPersonas.Contrasena_Persona,
            Tipo_Sangre_Persona: dataPersonas.Tipo_Sangre_Persona,
            Estado_Persona: dataPersonas.Estado_Persona,
    })
    res.status(201).json({
        ok: true,
        status: 201,
        message: "Persona Creada",
    });
    } catch (error) {
        return res.status(500).json({
            message: 'Ocurrio un error'
        })
    }
});

router.put("/Persona/PUT/:ID_Persona", async (req, res) => {
    const id = req.params.ID_Persona;
    const dataPersonas = req.body;
    try {
        const updatePersona = await Persona.update({
            Nombre_Persona: dataPersonas.Nombre_Persona,
            Apellido_Persona: dataPersonas.Apellido_Persona,
            Edad_Persona: dataPersonas.Edad_Persona,
            FechaNacimiento_Persona: dataPersonas.FechaNacimiento_Persona,
            Correo_Persona: dataPersonas.Correo_Persona,
            Numero_Persona: dataPersonas.Numero_Persona,
            Contrasena_Persona: dataPersonas.Contrasena_Persona,
            Tipo_Sangre_Persona: dataPersonas.Tipo_Sangre_Persona,
            Estado_Persona: dataPersonas.Estado_Persona,
        }, {
            where: {
                ID_Persona: id,
            }
        })
    
        if (updatePersona <= 0) return res.status(404).json({
            message: 'Persona no encontrada'
        })
    
        res.status(200).json({
            ok: true,
            status: 200,
            body: updatePersona
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Ocurrio un error'
        })
    }
});

router.delete("/Persona/DEL/:ID_Persona", async (req, res) => {
    const id = req.params.ID_Persona
    try {
        const deletePersona = await Persona.destroy({
            where: {
                ID_Persona: id,
            }
        })
    
        if (deletePersona <= 0) return res.status(404).json({
            message: 'Persona no encontrada'
        })
    
        res.status(204).json({
            ok: true,
            status: 204,
            body: deletePersona
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Ocurrio un error'
        })
    }
});

module.exports = router;