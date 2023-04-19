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

class Ubicaciones extends Model {}

Ubicaciones.init({
    ID_Ubicaciones: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    FK_BancoSang: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    FK_Local: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    FK_Prov: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    sequelize,
    modelName: "Ubicaciones"
});

module.exports = Ubicaciones;

