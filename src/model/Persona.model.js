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

