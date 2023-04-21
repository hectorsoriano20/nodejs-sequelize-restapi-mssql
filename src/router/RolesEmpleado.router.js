const router = require("express").Router();
const { faker } = require("@faker-js/faker")

const RolesEmpleado = require("../model/RolesEmpleado.model")

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

router.get("/RolesEmpleado", async (req, res) => {
    try {
        const rolesempleados = await RolesEmpleado.findAll()
    
    if (rolesempleados <= 0) return res.status(404).json({
        message: 'No se encontro ningun Rol'
    })
    
    res.status(200).json({
        ok: true,
        status: 200,
        body: rolesempleados
    })
    } catch (error) {
        return res.status(500).json({
            message: 'Ocurrio un error'
        })
    }
});

router.get("/RolesEmpleado/:ID_Roles", async (req, res) => {
    const id = req.params.ID_Roles;
    try {
        const rolesempleado = await RolesEmpleado.findOne({
            where: {
                ID_Roles: id,
            }
        })
        
        if (rolesempleado <= 0) return res.status(404).json({
            message: 'Rol no encontrado'
        })
    
        res.status(200).json({
            ok: true,
            status: 200,
            body: rolesempleado
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Ocurrio un error'
        })
    }
});

router.post("/RolesEmpleado/POST", async (req, res) => {
    const dataRolesEmpleados = req.body
    try {
        await RolesEmpleado.sync({ alter: true})
        const createRolesEmpleado = await RolesEmpleado.create({
            ID_Roles: generarNumerosAleatoriosSinRepetir(),
            Nombre_Empleado: dataRolesEmpleados.Nombre_Empleado,
            Contrasena_Empleado: dataRolesEmpleados.Contrasena_Empleado
    })
    res.status(201).json({
        ok: true,
        status: 201,
        message: "Rol Creado",
    });
    } catch (error) {
        return res.status(500).json({
            message: 'Ocurrio un error'
        })
    }
});

router.put("/RolesEmpleado/PUT/:ID_Roles", async (req, res) => {
    const id = req.params.ID_Roles;
    const dataRolesEmpleados = req.body;
    try {
        const updateRolesEmpleado = await RolesEmpleado.update({
            Nombre_Empleado: dataRolesEmpleados.Nombre_Empleado,
            Contrasena_Empleado: dataRolesEmpleados.Contrasena_Empleado
        }, {
            where: {
                ID_Roles: id,
            }
        })
    
        if (updateRolesEmpleado <= 0) return res.status(404).json({
            message: 'Rol no encontrado'
        })
    
        res.status(200).json({
            ok: true,
            status: 200,
            body: updateRolesEmpleado
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Ocurrio un error'
        })
    }
});

router.delete("/RolesEmpleado/DEL/:ID_Roles", async (req, res) => {
    const id = req.params.ID_Roles
    try {
        const deleteRolesEmpleado = await RolesEmpleado.destroy({
            where: {
                ID_Roles: id,
            }
        })
    
        if (deleteRolesEmpleado <= 0) return res.status(404).json({
            message: 'Rol no encontrado'
        })
    
        res.status(204).json({
            ok: true,
            status: 204,
            body: deleteRolesEmpleado
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Ocurrio un error'
        })
    }
});

module.exports = router;