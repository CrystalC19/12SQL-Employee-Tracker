const Sequelize = require("sequelize");
require("dotenv").config();



var sequelize = new Sequelize(
    process.env.DB_Name,
    process.env.DB_User,
    process.env.DB_Password,
    {
        host:"localhost",
        dialect: "mysql",
        port:3001
    }
);

module.exports = sequelize