const { Sequelize } = require('sequelize');
require("dotenv").config();



const sequelize = new Sequelize(
    process.env.DB_Name,
    process.env.DB_User,
    process.env.DB_Password,
    {
        host:"localhost",
        dialect: "mysql",
        port:3001
    }
);
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
module.exports = sequelize