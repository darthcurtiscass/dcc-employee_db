const express = require('express');
const mysql = require('mysql2');
require("dotenv").config()

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
      host: '127.0.0.1',
      // MySQL username,
      user: 'root',
      // TODO: Add MySQL password here
      password: process.env.DB_PASSWORD,
      database: 'movies_db'
    },
    console.log(`Connected to the movies_db database.`)
  );

const mainMenu = [
    {
        type: 'list',
        message: "What would you like to do?",
        name: "choice",
        choices: ["View All Employees", "Add Employee", "Update Employee Role", "View All Roles", 
        "Add Role", "View All Departments", "Add Department", "Quit"]
    }
]

const addEmployee = [
    {
        type: 'input',
        message: "What is the first name of the Employee?",
        name: "firstName",
    },
    {
        type: 'input',
        message: "What is the last name of the Employee?",
        name: "lastName",
    },
    {
        type: 'choice',
        message: "What is the Employee's role?",
        name: "employeeRole",
        choices: []
    },
    {
        type: "choice",
        message: "Who is the Employee's Manager?",
        name: "employeeManager",
        choices: []
    }
]

const addRole = [
    {
        type: "input",
        message: 'What is the name of the Role?',
        name: "newRole",
    },
    {
        type: "input",
        message: "What is the salary of the Role?",
        name: "salary"
    },
]

const addDepartment = [
    {
        type: "input",
        message: "What is the name of the department you would like to add?",
        name: "newDepartment"
    },
]

function viewAllEmployees() {
    db.query()
}