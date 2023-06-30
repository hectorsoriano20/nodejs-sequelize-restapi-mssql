const router = require("express").Router();
var nodemailer = require("nodemailer");
var cors = require('cors');

// Define las opciones de cors aquí
var corsOptions = {
    origin: '*',  // reemplaza esto con el origen que deseas permitir
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

router.post("/send-email", cors(corsOptions), (req, res) => {
    const dataEmail = req.body;
    const Email_Formulario = dataEmail.Email_Formulario;
    const Nombre_Persona = dataEmail.Nombre_Persona;
    const Apellido_Persona = dataEmail.Apellido_Persona;
    
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
            console.log('Error sending mail: ', error);
            res.status(500).send(error.message);
        } else {
            console.log("Email enviado.");
            res.status(200).jsonp("Email Sent");
        }
    });
});

router.post("/send-cita-email", cors(corsOptions), (req, res) => {
    const dataEmail = req.body;
    const Correo = dataEmail.Correo;
    const Nombre_Cita = dataEmail.Nombre_Cita;
    
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
        to: Correo,
        subject: "Notificación de Creación de Solicitud de Donación de Pinta de Sangre",
        text: "Estimado/a " + Nombre_Cita + ", le informamos que hemos recibido correctamente su solicitud de donación, estaremos revisando su solicitud y nos pondremos en contacto con usted."
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if(error) {
            console.log('Error sending mail: ', error);
            res.status(500).send(error.message);
        } else {
            console.log("Email enviado.");
            res.status(200).jsonp("Email Sent");
        }
    });
});

router.post("/send-compra-email", cors(corsOptions), (req, res) => {
    const dataEmail = req.body;
    const Correo_Compra = dataEmail.Correo_Compra;
    const Nombre_Comprador = dataEmail.Nombre_Comprador;
    
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
            console.log('Error sending mail: ', error);
            res.status(500).send(error.message);
        } else {
            console.log("Email enviado.");
            res.status(200).jsonp("Email Sent");
        }
    });
});

module.exports = router;
