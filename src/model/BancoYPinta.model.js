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

class BancoYPinta extends Model {}

BancoYPinta.init({
    ID_BancoYPinta: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    Nombre_BancoSangre: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Tipo_Pinta: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Estado_Pinta: {
        type: DataTypes.STRING,
        allowNull: true
    },
    
}, {
    sequelize,
    modelName: "BancoYPinta"
});

module.exports = BancoYPinta;

