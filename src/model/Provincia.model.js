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

class Provincia extends Model {}

Provincia.init({
    ID_Provincias: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    Nombre_Provincia: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Ubicacion_Provincia: {
        type: DataTypes.STRING,
        allowNull: true
    },
}, {
    sequelize,
    modelName: "Provincia"
});

module.exports = Provincia;

