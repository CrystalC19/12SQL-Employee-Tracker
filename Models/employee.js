// Structuring employee table

const {Model , Datatypes, DataTypes} = require ("sequelize");
const sequelize = require ("../connection");

class Employee extends Model {}

Employee.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        first_name:{
            
            type: DataTypes.STRING(30),
            allowNull: false
        },
        last_name:{
            type: DataTypes.STRING(30),
            allowNull:false
        },
        role_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references:{
                model: "Role",
                key: "id",
            },

        },

        manager_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
    },{
        sequelize, 
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "Employee",
    }

);

module.exports = Employee;
