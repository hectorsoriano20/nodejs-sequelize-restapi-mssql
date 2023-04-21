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

