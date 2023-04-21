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

