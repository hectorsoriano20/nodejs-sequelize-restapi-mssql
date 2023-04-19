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

class RolesEmpleado extends Model {}

RolesEmpleado.init({
    ID_Roles: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    Nombre_Empleado: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Contrasena_Empleado: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
}, {
    sequelize,
    modelName: "RolesEmpleado"
});

module.exports = RolesEmpleado;

