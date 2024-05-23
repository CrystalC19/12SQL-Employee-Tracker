// department table import json data

const sequelize = require ("../connection");
const Department = require ("../Models/department");

const departmentSeedData = require ("./departmentSeedData.json");

const seedDepartmentData = async () => {
    await sequelize.sync({force:true});

    const department = await Department.bulkCreate(departmentSeedData);
    process.exit(0);
};


seedDepartmentData();