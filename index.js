const mysql2 = require('mysql2');
const inquirer = require('inquirer');
const utils = require('util');

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root', 
        password: '',
        database: ''
    },
);

db.query = utils.promisify(db.query);

//  View all departments
    // SELECT * FROM department

// View all roles
    // SELECT * FROM role

// View all employees
    // SELECT * FROM employee

// prompt the user for the name of the department
    // THEN Run the query
    // INSERT INTO department (name)
    // VALUES (Sales);

        // THEN ask the user what they want to do next

// Create a new role
    // Get the existing departments from the 'department' table

    // THEN prompt the user for "title" "salary" and "department" for the role
        // THEN run the query
        // INSERT INTO role (title, salary, department_id)
        // VALUES (?, ?, ?);

        // THEN ask the user what they want to do next
