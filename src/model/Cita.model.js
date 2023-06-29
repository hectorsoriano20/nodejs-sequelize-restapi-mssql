require('dotenv').config();
const { Sequelize, Model, DataTypes } = require("sequelize");

const dbDataBase = process.env.DB_DATABASE
const dbUser = process.env.DB_USER
const dbPass = process.env.DB_PASSWORD
const dbHost = process.env.DB_HOST
const dbDialect= process.env.DB_DIALECT
const dbPort = process.env.DB_PORT

const sequelize = new Sequelize(dbDataBase, dbUser, dbPass, {
    host: dbHost,
    dialect: dbDialect,
    port: dbPort,
});

class Cita extends Model {}

Cita.init({
    ID_Cita: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    Cedula_Cita: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Nombre_Cita: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Correo: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Tipo_Sangre_Cita: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Fecha_Cita: {
        type: DataTypes.DATE,
        allowNull: true
    },
    Hora_Cita: {
        type: DataTypes.TIME,
        allowNull: true
    },
    Estado_Cita: {
        type: DataTypes.STRING,
        allowNull: true
    },
}, {
    sequelize,
    modelName: "Cita"
});

module.exports = Cita;

