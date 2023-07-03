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

class BancoSangre extends Model {}

BancoSangre.init({
    ID_BancoSangre: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    Nombre_BancoSangre: {
        type: DataTypes.STRING,
        allowNull: true
    },
    FK_Localidad_BancoSangre: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    FK_Provincias_BancoSangre: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    Ubicacion_BancoSangre: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Latitud_BancoSangre: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Longitud_BancoSangre: {
        type: DataTypes.STRING,
        allowNull: true
    },
}, {
    sequelize,
    modelName: "BancoSangre"
});

module.exports = BancoSangre;