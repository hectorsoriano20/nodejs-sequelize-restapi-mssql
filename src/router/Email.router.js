const router = require("express").Router();
var nodemailer = require("nodemailer");
var express = require("express");
var app = express();

router.post("/send-email", (req, res) => {
    
    const dataEmail = req.body
    Email_Formulario = dataEmail.Email_Formulario
    Nombre_Persona = dataEmail.Nombre_Persona
    Apellido_Persona = dataEmail.Apellido_Persona
    
    var transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "cuentacuatro1379@gmail.com",
            pass: "fzrkylhbloueminp",
        },
    });

    var mailOptions = {
        from: "Reminente",
        to: Email_Formulario,
        subject: "Notificación de Creación de Usuario",
        text: "Estimado/a " + Nombre_Persona + " " + Apellido_Persona + ", le informamos que su cuenta ha sido creada correctamente."
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if(error) {
            res.status(500).send(error.message);
        } else {
            console.log("Email enviado.");
            res.status(200).jsonp("Email Sent");
        }
    })
})

module.exports = router;
