// Importing the Models folder , sequelize, and inquirer

const { Department , Role , Employee} = require ('./Models');

const sequelize = require ("./connection");
const inquirer = require('inquirer');


sequelize.sync({force:false}). then (()=>{
    mapFinderOptions();
});

// prompting options for the user

function options(){
    inquirer.prompt([
        {
            type: "list",
            message: `Pick an option`,
            choices:[
                "View Departments",
                "View Roles",
                "View Employees",
                "Add Department",
                "Add Role",
                "Add Employee",
                "Update Employee Role"
            ],
            name:"employeeTracker"
// taking in the choices, checking then loads function
    },]);
    (answer) => {
        switch(answer.employeeTracker){
            case "View Departments":
                viewDepartments();
                break;
            case "View Roles":
                viewRoles();
                break;
            case "View Employees":
                viewEmployees();
                break;
            case "Add Department":
                addDepartment();
                break;
            case "Add Role":
                addRole();
                break;
            case "Add Employee":
                addEmployee();
                break;
            default:
                updateEmployeeRole();
             

        }
    };
}

// Viewing Departments, Roles, Employees

// View all departments
const viewDepartments = async () => {
    const departments = await Department.findAll({ raw: true });
    console.table(departments);
    options();
  };
  
  // View all roles
  const viewRoles = async () => {
    const roles = await Role.findAll({
      raw: true,
      include: [{ model: Department }],
    });
    const formattedRoles = roles.map((role) => ({
      id: role.id,
      title: role.title,
      salary: role.salary,
      department: role.Department.name,
    }));
    console.table(formattedRoles);
    options();
  };
  
  // View all employees
  const viewEmployees = async () => {
    const employees = await Employee.findAll({
      raw: true,
      include: [{ model: Role, include: [{ model: Department }] }],
    });
    const employeeLookup = {};
    employees.forEach((employee) => {
      employeeLookup[employee.id] = `${employee.first_name} ${employee.last_name}`;
    });
    const formattedEmployees = employees.map((employee) => ({
      id: employee.id,
      first_name: employee.first_name,
      last_name: employee.last_name,
      title: employee.Role.title,
      department: employee.Role.Department.name,
      salary: employee.Role.salary,
      manager: employeeLookup[employee.manager_id],
    }));
    console.table(formattedEmployees);
    options();
  };

  // Adding department, role, employee, prompt user for input

  
const promptUser = async (questions) => {
    return await inquirer.prompt(questions);
  };
  
  // add data to the database and fire off prompts
  const addToDatabase = async (model, data) => {
    await model.create(data);
    options();
  };
  
  // Add department
  const addDepartment = async () => {
    const { addDepartment } = await promptUser([
      {
        type: "input",
        message: "What would you like to name the department?",
        name: "addDepartment",
      },
    ]);
    await addToDatabase(Department, { name: addDepartment });
  };
  
  // Add role
  const addRole = async () => {
    const departments = await Department.findAll({
      attributes: ["id", "name"],
      raw: true,
    });
  
    const { title, salary, department_id } = await promptUser([
      {
        type: "input",
        message: "What is the name of the role?",
        name: "title",
      },
      {
        type: "input",
        message: "What would you like the salary to be?",
        name: "salary",
      },
      {
        type: "list",
        message: "What department would you like to add this new role to?",
        name: "department_id",
        choices: departments.map((department) => ({
          name: department.name,
          value: department.id,
        })),
      },
    ]);
  
    await addToDatabase(Role, { title, salary, department_id });
  };
  
  // Add employee
  const addEmployee = async () => {
    const roles = await Role.findAll({
      attributes: ["id", "title"],
      raw: true,
    });
  
    const managers = await Employee.findAll({
      attributes: ["id", "first_name", "last_name"],
      raw: true,
    });
  
    const choices = managers.map((manager) => ({
      name: `${manager.first_name} ${manager.last_name}`,
      value: manager.id,
    }));
    choices.push({ name: "Null Manager", value: null });
  
    const { first_name, last_name, role_id, manager_id } = await promptUser([
      {
        type: "input",
        message: "What is the first name of the new employee?",
        name: "first_name",
      },
      {
        type: "input",
        message: "What is the last name of the new employee?",
        name: "last_name",
      },
      {
        type: "list",
        message: "What is the role of the new employee?",
        name: "role_id",
        choices: roles.map((role) => ({
          name: role.title,
          value: role.id,
        })),
      },
      {
        type: "list",
        message: "What manager would you like to assign to the new employee?",
        name: "manager_id",
        choices,
      },
    ]);
  
    await addToDatabase(Employee, { first_name, last_name, role_id, manager_id });
  };
  
  //Update data

  
const updateEmployeeRole = async () => {
    // Fetch employees and roles
    const employees = await Employee.findAll({
      attributes: ["id", "first_name", "last_name"],
      raw: true,
    });
  
    const roles = await Role.findAll({
      attributes: ["id", "title"],
      raw: true,
    });
  
    // Prompt user to select employee and new role
    const { id, role_id } = await inquirer.prompt([
      {
        type: "list",
        message: "Who is the employee whose role you would like to update?",
        name: "id",
        choices: employees.map((employee) => ({
          name: `${employee.first_name} ${employee.last_name}`,
          value: employee.id,
        })),
      },
      {
        type: "list",
        message: "What is the updated role you would like to assign to this employee?",
        name: "role_id",
        choices: roles.map((role) => ({
          name: role.title,
          value: role.id,
        })),
      },
    ]);
  
    // Update employee role in the database
    await Employee.update({ role_id }, { where: { id } });
  
    // Fire off prompts after updating database
    options();
  };