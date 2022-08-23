const mysql2 = require('mysql2');
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

db.query = utils.promisify(db.query);

//  View all departments
    // SELECT * FROM department

// View all roles
    // SELECT * FROM roles

// View all employees
    // SELECT * FROM employee

// Create a new department
// prompt the user for the name of the department

    // THEN Run the query
    // INSERT INTO department (name)
    // VALUES (Sales);

        // THEN ask the user what they want to do next

// Create a new role
const createRole = async () => {
// Get the existing departments from the 'department' table
    const role = await db.query ("SELECT * FROM roles");
    // THEN prompt the user for "title" "salary" and "department" for the role
    console.log(role);


    const answers = inquirer.createPromptModule([
        // THEN run the query
        {
            message: "",
            name: "",
            type: "",
        }
    ])
    // INSERT INTO role (title, salary, department_id)
    // VALUES (?, ?, ?);
    
    // THEN ask the user what they want to do next
}

// ADD Employee

// UPDATE Employee Role

// QUIT Node App

createRole();