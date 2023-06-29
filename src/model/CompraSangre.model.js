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

class CompraSangre extends Model {}

CompraSangre.init({
    ID_CompraSangre: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    Cedula_Comprador: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Nombre_Comprador: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Correo_Compra: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Telefono_Compra: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Grupo_Sanguineo_Compra: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Cedula_Donante: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Nombre_Donante: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Grupo_Sanguineo_Donante: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Edad_Donante: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Estatus_Compra: {
        type: DataTypes.STRING,
        allowNull: true
    },
}, {
    sequelize,
    modelName: "CompraSangre"
});

module.exports = CompraSangre;

