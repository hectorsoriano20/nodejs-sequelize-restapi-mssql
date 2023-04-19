const { Sequelize, Model, DataTypes } = require("sequelize");

const dbDataBase = process.env.DB_DATABASE || "BancoSangre"
const dbUser = process.env.DB_USER || "sa"
const dbPass = process.env.DB_PASSWORD || "12345"
const dbHost = process.env.DB_HOST || "localhost"
const dbDialect= process.env.DB_DIALECT || "mssql"
const dbPort = process.env.DB_PORT || 1433

const sequelize = new Sequelize(dbDataBase, dbUser, dbPass, {
    host: dbHost,
    dialect: dbDialect,
    port: dbPort,
});

class Donante extends Model {}

Donante.init({
    ID_Donante: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    FK_Persona_Donante: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    TipoSangre_Donante: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Enfermedades: {
        type: DataTypes.STRING,
        allowNull: true
    },
    EnfermedadesProhibida: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Pintas_Donante: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize,
    modelName: "Donante"
});

module.exports = Donante;

