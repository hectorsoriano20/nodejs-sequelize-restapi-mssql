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

class DonantePinta extends Model {}

DonantePinta.init({
    ID_DonantePinta: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    FK_Registro_DonantePinta: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    FK_Donante_DonantePinta: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    sequelize,
    modelName: "DonantePinta"
});

module.exports = DonantePinta;

