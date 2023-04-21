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

class Cliente extends Model {}

Cliente.init({
    ID_Cliente: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    FK_Persona_Cliente: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    TipoSangre: {
        type: DataTypes.STRING,
        allowNull: true
    },
    EnfermedadCrono: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize,
    modelName: "Cliente"
});

module.exports = Cliente;

