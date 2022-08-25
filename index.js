const mysql = require('mysql2');
const inquirer = require('inquirer');
const utils = require('util');

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root', 
        password: 'password',
        database: 'employees_db'
    },
    );
    
    // Start screen
    init = () => {    
    inquirer.prompt ([
        {
            type: "list",
            message: "What would you like to do?",
            name: "userChoice",
            choices: [
                "View all Departments",
                "View all Roles",
                "View all Employees",
                "Add a Department",
                "Add a Role",
                "Add an Employee",
                "Update an Employee",
                "Quit"
            ]
        }
    ]) .then((answer)=> {
        switch(answer.userChoice) {
            // Call the appropriate function based on user input
            case "View all Departments" :
              viewDepartments();
              break;
            case "View all Roles":
              viewRoles();
              break;
            case "View all Employees":
              viewEmployees();
              break;
            case "Add a Department":
              addDepartment();
              break;
            case "Add a Role":
              addRole();
              break;
            case "Add an Employee":
              addEmployee();
              break;
            case "Update an Employee":
              updateEmployee();
              break;
            
            default: quitApp();
          }
    })
}

//  View all departments
viewDepartments = () => {
    db.query('SELECT * FROM department', function (err, results) {
        if (err){
            console.error(err)
        } else {
        console.table(results);
        init();
        }
      });
}

// View all roles
viewRoles = () => {
    db.query('SELECT * FROM roles', function (err, results) {
        if (err){
            console.error(err)
        } else {
        console.table(results);
        init();
        }
      });
}

// View all employees
viewEmployees = () => {
    db.query('SELECT * FROM employee', function (err, results) {
        if (err){
            console.error(err)
        } else {
        console.table(results);
        init();
        }
      });
}

// Create a new department
addDepartment = () => {
    inquirer.prompt ([
        {
            type: "input",
            message: "What is the name of Department?",
            name: "departmentName"
        }
    ]) .then((answer) => {
        db.query(`INSERT INTO department (name) VALUES (?)`, answer.departmentName, (err, result) => {
            if (err) {
              console.log(err);
            }
            console.table(result);
            init();
          });
    })
}

// Create a new role
addRole = () => {
    db.query('SELECT * FROM department', function (err, results) {
        if (err){
            console.error(err)
        } else {
        const departmentsArray = results.map(function (department){
            return {
                name: department.name,
                value: department.id
            }
        })
        inquirer.prompt ([
            {
                type: "input",
                message: "What is the name of the role?",
                name: "roleName"
            },
            {
                type: "input",
                message: "What is this role's salary?",
                name: "roleSalary"
            },
            {
                type: "list",
                message: "Which department will this role be assigned?",
                name: "roleDepartment",
                choices: departmentsArray
            }
            ]) .then((answer) => {
            db.query(`INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`, [answer.roleName, answer.roleSalary, answer.roleDepartment], (err, result) => {
                if (err) {
                  console.log(err);
                }
                console.table(result);
                init();
              });
            })
        }
      });
}

// Create new Employee
addEmployee = () => {
    db.query('SELECT * FROM employee', function (err, results) {
        if (err){
            console.error(err)
        } else {
            // map results
            const employeesArray = results.map(function(employee){
                return {
                    name: employee.first_name,
                    value: employee.id
                } 
            }) 
    db.query('SELECT * FROM roles', function (err, results) {
        if (err){
            console.error(err)
        } else {
            // map results
            const roleArray = results.map(function(roles){
                return {
                    name: roles.title,
                    value: roles.id
                } 
            }) 
                inquirer.prompt ([
                    {
                    type: "input",
                    message: "What is the Employee's first name?",
                    name: "employeeFirstName"
                },
                {
                    type: "input",
                    message: "what is the Employee's last name?",
                    name: "employeeLastName"
                },
                {
                    type: "list",
                    message: "What is the Employee's role?",
                    name: "employeeRole",
                    choices: roleArray
                },
                {
                    type: "list",
                    message: "Who is this Employee's manager?",
                    name: "employeeManager",
                    choices: employeesArray
                }
            ]).then((answer) => {
                db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, [answer.employeeFirstName, answer.employeeLastName, answer.employeeRole, answer.employeeManager], (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    console.table(result);
                    init();
                })
            })
        }
    })
}
})
};
// Update Employee Role
updateEmployee = () => {
    // Query SELECT * FROM employee
   db.query('SELECT * FROM employee', function (err, results) {
    if (err){
        console.error(err)
    } else {
        const employeesArray = results.map(function(employee){
            return {
                name: employee.first_name,
                value: employee.id
            }
        })
        // inquirer
            // Which employee to update?
            // Employee list as array options
            // SELECT * FROM role
                // roles list = array options
    }
   })
}

// QUIT Node App
function quitApp() {
    db.end();
}

init();