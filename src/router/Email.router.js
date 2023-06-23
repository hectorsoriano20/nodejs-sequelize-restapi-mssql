const router = require("express").Router();
var nodemailer = require("nodemailer");
var express = require("express");
var app = express();

router.post("/send-email", (req, res) => {
    
    const dataEmail = req.body;
    Email_Formulario = dataEmail.Email_Formulario;
    Nombre_Persona = dataEmail.Nombre_Persona;
    Apellido_Persona = dataEmail.Apellido_Persona;
    
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
        from: "Remitente",
        to: Email_Formulario,
        subject: "Notificación de Creación de Usuario",
        text: "Estimado/a " + Nombre_Persona + " " + Apellido_Persona + ", le informamos que su cuenta ha sido creada correctamente."
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if(error) {
            console.log('Error sending mail: ', error); // Line added for debugging
            res.status(500).send(error.message);
        } else {
            console.log("Email enviado.");
            res.status(200).jsonp("Email Sent");
        }
    });
});

router.post("/send-compra-email", (req, res) => {
    
    const dataEmail = req.body;
    Correo_Compra = dataEmail.Correo_Compra;
    Nombre_Comprador = dataEmail.Nombre_Comprador;
    
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
        from: "Remitente",
        to: Correo_Compra,
        subject: "Notificación de Creación de Solicitud de Compra de Pinta de Sangre",
        text: "Estimado/a " + Nombre_Comprador + ", le informamos que hemos recibido correctamente su formulario de compra, estaremos revisando su solicitud y nos pondremos en contacto con usted."
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if(error) {
            console.log('Error sending mail: ', error); // Line added for debugging
            res.status(500).send(error.message);
        } else {
            console.log("Email enviado.");
            res.status(200).jsonp("Email Sent");
        }
    });
});

module.exports = router;
