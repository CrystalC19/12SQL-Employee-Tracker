// Role table structure

const {Model, DataTypes} = require ("sequelize");
const sequelize = require ("../connection");

class Role extends Model {}

Role.init(

    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title:{
            type: DataTypes.STRING(30),
            allowNull:false
        },
        salary:{
            type:DataTypes.DECIMAL,
            allowNull:false
        },
        department_id: {
            type:DataTypes.INTEGER,
            references:{
                model:"Department",
                key:"id",
            },
        },
    },
    {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "Role",

}

);



module.exports= Role;