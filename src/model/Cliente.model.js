const { Sequelize, Model, DataTypes } = require("sequelize");

const dbDataBase = process.env.DB_DATABASE || "BancoSangre"
const dbUser = process.env.DB_USER || "sa"
const dbPass = process.env.DB_PASSWORD || "12345"
const dbHost = process.env.DB_HOST || "localhost"
const dbDialect= process.env.DB_DIALECT || "mssql"
const dbPort = process.env.DB_NAME || 1433

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

