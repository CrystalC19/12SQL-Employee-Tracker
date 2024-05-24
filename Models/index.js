const Department = require("./department")
const Role = require ("./role");
const Employee = require ("./employee")


Role.belongsTo(Department, {
    foreignKey: "department_id",
    onDelete:"CASCADE",
});

Department.hasMany(Role,{
    foreignKey: "department_id",
    onDelete: "CASCADE",
});

Employee.belongsTo(Role,{
    foreignKey: "role_id",
    onDelete: "CASCADE",
});

Role.hasOne(Employee,{
    foreignKey: "role_id",
    onDelete: "CASCADE",
});

Employee.hasOne(Employee,{
    foreignKey: "manager_id",
    onDelete:"CASCADE",
});



// Export table

module.exports = {Department, Role , Employee}