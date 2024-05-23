// employee table importing json data


const sequelize = require ("../connection");
const Employee = require ("../Models/employee");

const employeeSeedData = require ("./employeeSeedData.json");

const seedEmployeeData = async() => {
    await sequelize.sync({force: true});
    const employee = await Employee.bulkCreate(employeeSeedData);


    process.exit(0)
}