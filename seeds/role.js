// Role table and importing json Data


const sequelize = require ("../connection");
const Role = require ("../Models/role");
const roleSeedData = require ("./roleSeedData.json");

const seedRoleData = async ()=> {
    await sequelize.sync({force:true});

    const roles= await Role.bulkCreate(roleSeedData);



    process.exit(0);
};



seedRoleData();