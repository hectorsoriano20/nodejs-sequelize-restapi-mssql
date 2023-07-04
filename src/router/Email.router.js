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

    var mailOptions1 = {
        from: "Remitente",
        to: Email_Formulario,
        subject: "Notificación de Creación de Usuario",
        text: "Estimado/a " + Nombre_Persona + " " + Apellido_Persona + ",\n\nLe informamos que sus datos han sido actualizados correctamente. Puede proceder a Iniciar Sesión en nuestra Web y utilizar nuestros servicios"

    };

    var mailOptions2 = {
        from: "Remitente",
        to: "hectorricardo.car@gmail.com",
        subject: "Notificación de Creación de Usuario",
        text: "Un nuevo usuario se ha registrado en la plataforma. Favor revisar los datos de registro y corroborar la información."
    };

    transporter.sendMail(mailOptions1, (error, info) => {
        if(error) {
            console.log('Error sending mail: ', error);
            res.status(500).send(error.message);
        } else {
            console.log("Primer correo enviado.");
            transporter.sendMail(mailOptions2, (error2, info2) => {
                if (error2) {
                    console.log('Error sending second mail: ', error2);
                    res.status(500).send(error2.message);
                } else {
                    console.log("Segundo correo enviado.");
                    res.status(200).jsonp("Emails Sent");
                }
            });
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

    var mailOptions1 = {
        from: "Remitente",
        to: Correo,
        subject: "Notificación de Creación de Solicitud de Donación de Pinta de Sangre",
        text: "Estimado/a " + Nombre_Cita + ",\n\nLe informamos que hemos recibido correctamente su solicitud de donación, estaremos revisando los datos y nos pondremos en contacto con usted."
    };

    var mailOptions2 = {
        from: "Remitente",
        to: "hectorricardo.car@gmail.com", 
        subject: "Notificación de Creación de Solicitud de Donación de Pinta de Sangre", 
        text: "Se ha registrado una nueva solicitud de Donación de Pinta de Sangre. Favor revisar los detalles de la misma y actualizar el estado."
    };

    transporter.sendMail(mailOptions1, (error, info) => {
        if(error) {
            console.log('Error sending mail: ', error);
            res.status(500).send(error.message);
        } else {
            console.log("Primer correo enviado.");
        }
    });

    transporter.sendMail(mailOptions2, (error, info) => {
        if(error) {
            console.log('Error sending mail: ', error);
            res.status(500).send(error.message);
        } else {
            console.log("Segundo correo enviado.");
            res.status(200).jsonp("Ambos correos enviados");
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

    var mailOptions1 = {
        from: "Remitente",
        to: Correo_Compra,
        subject: "Notificación de Creación de Solicitud de Compra de Pinta de Sangre",
        text: "Estimado/a " + Nombre_Comprador + ",\n\nLe informamos que hemos recibido correctamente su formulario de compra, estaremos revisando su solicitud y nos pondremos en contacto con usted."
    };

    var mailOptions2 = {
        from: "Remitente",
        to: "hectorricardo.car@gmail.com",
        subject: "Notificación de Creación de Solicitud de Compra de Pinta de Sangre",
        text: "Se ha registrado una nueva solicitud de Compra de Pinta de Sangre. Favor revisar los detalles de la misma y actualizar el estado."
    };

    transporter.sendMail(mailOptions1, (error, info) => {
        if(error) {
            console.log('Error sending mail: ', error);
            res.status(500).send(error.message);
        } else {
            console.log("Primer correo enviado.");
        }
    });

    transporter.sendMail(mailOptions2, (error, info) => {
        if(error) {
            console.log('Error sending mail: ', error);
            res.status(500).send(error.message);
        } else {
            console.log("Segundo correo enviado.");
            res.status(200).jsonp("Ambos correos enviados");
        }
    });
});

router.post("/send-contacto-email", cors(corsOptions), (req, res) => {
    const dataEmail = req.body;
    const Email_Formulario = dataEmail.Email_Formulario;
    const Nombre_Persona = dataEmail.Nombre_Persona;
    const Asunto_Formulario = dataEmail.Asunto_Formulario;
    const Mensaje_Formulario = dataEmail.Mensaje_Formulario;
    
    var transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "cuentacuatro1379@gmail.com",
            pass: "fzrkylhbloueminp",
        },
    });

    var mailOptions1 = {
        from: "Remitente",
        to: Email_Formulario,
        subject: "Confirmación de envío de mensaje: " + Asunto_Formulario,
        text: `Estimado/a ${Nombre_Persona},\n\nLe informamos que hemos recibido su mensaje. Estaremos revisando y le daremos respuesta en los próximos días.`
    };

    var mailOptions2 = {
        from: "Remitente",
        to: "hectorricardo.car@gmail.com",
        subject: Asunto_Formulario,
        text: `${Nombre_Persona} ha enviado el siguiente mensaje:\n\n${Mensaje_Formulario}`
    };

    transporter.sendMail(mailOptions1, (error, info) => {
        if(error) {
            console.log('Error sending mail: ', error);
            res.status(500).send(error.message);
        } else {
            console.log("Primer correo enviado.");
            transporter.sendMail(mailOptions2, (error2, info2) => {
                if (error2) {
                    console.log('Error sending second mail: ', error2);
                    res.status(500).send(error2.message);
                } else {
                    console.log("Segundo correo enviado.");
                    res.status(200).jsonp("Emails Sent");
                }
            });
        }
    });
});

module.exports = router;

