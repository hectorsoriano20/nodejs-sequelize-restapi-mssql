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

class Empleado extends Model {}

Empleado.init({
    ID_Empleado: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    FK_Persona_Empleado: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    FK_Ubicaciones_Empleados: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    Rol_Empleado: {
        type: DataTypes.STRING,
        allowNull: true
    },
}, {
    sequelize,
    modelName: "Empleado"
});

module.exports = Empleado;

