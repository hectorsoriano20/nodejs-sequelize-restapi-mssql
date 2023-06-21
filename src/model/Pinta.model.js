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

class Pinta extends Model {}

Pinta.init({
    ID_Pinta: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    Nombre_Apellido_Pinta: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Correo_Pinta: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Tipo_Pinta: {
        type: DataTypes.STRING,
        allowNull: true
    },
    FechaDonacion_Pinta: {
        type: DataTypes.DATE,
        allowNull: true
    },
}, {
    sequelize,
    modelName: "Pinta"
});

module.exports = Pinta;

