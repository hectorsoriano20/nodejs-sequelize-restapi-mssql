const router = require("express").Router();
const { faker } = require("@faker-js/faker")

const Empleado = require("../model/Empleado.model")

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

router.get("/Empleado", async (req, res) => {
    try {
        const empleados = await Empleado.findAll()
    
    if (empleados <= 0) return res.status(404).json({
        message: 'No se encontro ningun Empleado'
    })
    
    res.status(200).json({
        ok: true,
        status: 200,
        body: empleados
    })
    } catch (error) {
        return res.status(500).json({
            message: 'Ocurrio un error'
        })
    }
});

router.get("/Empleado/:ID_Empleado", async (req, res) => {
    const id = req.params.ID_Empleado;
    try {
        const empleado = await Empleado.findOne({
            where: {
                ID_Empleado: id,
            }
        })
        
        if (empleado <= 0) return res.status(404).json({
            message: 'Empleado no encontrado'
        })
    
        res.status(200).json({
            ok: true,
            status: 200,
            body: empleado
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Ocurrio un error'
        })
    }
});

router.post("/Empleado/POST", async (req, res) => {
    const dataEmpleados = req.body
    try {
        await Empleado.sync({ alter: true})
        const createEmpleado = await Empleado.create({
            ID_Empleado: generarNumerosAleatoriosSinRepetir(),
            Rol_Empleado: dataEmpleados.Rol_Empleado
    })
    res.status(201).json({
        ok: true,
        status: 201,
        message: "Empleado Creado",
    });
    } catch (error) {
        return res.status(500).json({
            message: 'Ocurrio un error'
        })
    }
});

router.put("/Empleado/PUT/:ID_Empleado", async (req, res) => {
    const id = req.params.ID_Empleado;
    const dataEmpleados = req.body;
    try {
        const updateEmpleado = await Empleado.update({
            Rol_Empleado: dataEmpleados.Rol_Empleado,
        }, {
            where: {
                ID_Empleado: id,
            }
        })
    
        if (updateEmpleado <= 0) return res.status(404).json({
            message: 'Empleado no encontrado'
        })
    
        res.status(200).json({
            ok: true,
            status: 200,
            body: updateEmpleado
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Ocurrio un error'
        })
    }
});

router.delete("/Empleado/DEL/:ID_Empleado", async (req, res) => {
    const id = req.params.ID_Empleado
    try {
        const deleteEmpleado = await Empleado.destroy({
            where: {
                ID_Empleado: id,
            }
        })
    
        if (deleteEmpleado <= 0) return res.status(404).json({
            message: 'Empleado no encontrado'
        })
    
        res.status(204).json({
            ok: true,
            status: 204,
            body: deleteEmpleado
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Ocurrio un error'
        })
    }
});

module.exports = router;