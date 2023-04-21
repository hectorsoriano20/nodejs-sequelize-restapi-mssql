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

class Localidad extends Model {}

Localidad.init({
    ID_Localidad: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    Nombre_Localidad: {
        type: DataTypes.STRING,
        allowNull: true
    },
    FK_Provincias_Localidad: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    
}, {
    sequelize,
    modelName: "Localidad"
});

module.exports = Localidad;

