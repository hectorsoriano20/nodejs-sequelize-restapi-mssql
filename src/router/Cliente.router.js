const router = require("express").Router();
const { faker } = require("@faker-js/faker")

const Cliente = require("../model/Cliente.model")

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

router.get("/Cliente", async (req, res) => {
    try {
        const clientes = await Cliente.findAll()
    
    if (clientes <= 0) return res.status(404).json({
        message: 'No se encontro ningun Cliente'
    })
    
    res.status(200).json({
        ok: true,
        status: 200,
        body: clientes
    })
    } catch (error) {
        return res.status(500).json({
            message: 'Ocurrio un error'
        })
    }
});

router.get("/Cliente/:ID_Cliente", async (req, res) => {
    const id = req.params.ID_Cliente;
    try {
        const cliente = await Cliente.findOne({
            where: {
                ID_Cliente: id,
            }
        })
        
        if (cliente <= 0) return res.status(404).json({
            message: 'Cliente no encontrado'
        })
    
        res.status(200).json({
            ok: true,
            status: 200,
            body: cliente
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Ocurrio un error'
        })
    }
});

router.post("/Cliente/POST", async (req, res) => {
    const dataClientes = req.body
    try {
        await Cliente.sync({ alter: true})
        const createBancoSangre = await Cliente.create({
            ID_Cliente: generarNumerosAleatoriosSinRepetir(),
            TipoSangre: dataClientes.TipoSangre,
            EnfermedadCrono: dataClientes.EnfermedadCrono
    })
    res.status(201).json({
        ok: true,
        status: 201,
        message: "Cliente Creado",
    });
    } catch (error) {
        return res.status(500).json({
            message: 'Ocurrio un error'
        })
    }
});

router.put("/Cliente/PUT/:ID_Cliente", async (req, res) => {
    const id = req.params.ID_Cliente;
    const dataClientes = req.body;
    try {
        const updateCliente = await Cliente.update({
            TipoSangre: dataClientes.TipoSangre,
            EnfermedadCrono: dataClientes.EnfermedadCrono,
        }, {
            where: {
                ID_Cliente: id,
            }
        })
    
        if (updateCliente <= 0) return res.status(404).json({
            message: 'Cliente no encontrado'
        })
    
        res.status(200).json({
            ok: true,
            status: 200,
            body: updateCliente
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Ocurrio un error'
        })
    }
});

router.delete("/Cliente/DEL/:ID_Cliente", async (req, res) => {
    const id = req.params.ID_Cliente
    try {
        const deleteCliente = await Cliente.destroy({
            where: {
                ID_Cliente: id,
            }
        })
    
        if (deleteCliente <= 0) return res.status(404).json({
            message: 'Cliente no encontrado'
        })
    
        res.status(204).json({
            ok: true,
            status: 204,
            body: deleteCliente
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Ocurrio un error'
        })
    }
});

module.exports = router;