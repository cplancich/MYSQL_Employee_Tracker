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
    

    
    init = () => {
        // inquirer prompt
        // Ask the user what they want to do
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
              // code block
          }
    })
        // Call the appropriate function based off user input
}

//  View all departments
viewDepartments = () => {
    db.query('SELECT * FROM department', function (err, results) {
        if (err){
            console.error(err)
        } else {
        console.log(results);
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
        console.log(results);
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
        console.log(results);
        init();
        }
      });
}

// Create a new department
// prompt the user for the name of the department

    // THEN Run the query
    // INSERT INTO department (name)
    // VALUES (Sales);

        // THEN ask the user what they want to do next

// Create a new role
const createRole =  () => {
// Get the existing departments from the 'department' table
    const roles =  db.query ("SELECT * FROM roles");

    console.table(roles);
    // THEN prompt the user for "title" "salary" and "department" for the role

    // const roleChoices = roles.map( role => ({
    //     name: role.title,
    //     value: role.id
    // }) )
    
    console.log(roles);
    console.log(roleChoices);
    
    const answers =  inquirer.prompt([
        // THEN run the query
        {
            message: "",
            name: "",
            type: "",
        }
    ]);

     db.query(
            "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",
            [answers.title, answers.salary, answers.department_id]
    );
}
    // THEN ask the user what they want to do next

// ADD Employee

// UPDATE Employee Role

// QUIT Node App

init();