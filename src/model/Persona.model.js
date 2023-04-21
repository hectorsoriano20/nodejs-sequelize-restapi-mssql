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

class Persona extends Model {}

Persona.init({
    ID_Persona: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    Nombre_Persona: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Apellido_Persona: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Edad_Persona: {
        type: DataTypes.STRING,
        allowNull: true
    },
    FechaNacimiento_Persona: {
        type: DataTypes.DATE,
        allowNull: true
    },
    Correo_Persona: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Numero_Persona: {
        type: DataTypes.STRING,
        allowNull: true
    },
    FK_BancoSangre_Persona: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
}, {
    sequelize,
    modelName: "Persona"
});

module.exports = Persona;

