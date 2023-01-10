const express = require('express');
const { default: inquirer } = require('inquirer');
const mysql = require('mysql2');
const QueryString = require('qs');
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
      database: 'employee_db'
    },
    console.log(`Connected to the database.`)
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

const addEmployees = [
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

const addRoles = [
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

const addDepartments = [
    {
        type: "input",
        message: "What is the name of the department you would like to add?",
        name: "newDepartment"
    },
]

function option () {
    inquirer
        .prompt(mainMenu)

        .then((data) => {
            if(data.choice === "View All Employees") {
                viewAllEmployees()
            }
            if(data.choice === "Add Employee") {
                addEmployee()
            }
            if(data.choice === "Update Employee Role") {
                updateEmployeeRole()
            }
            if(data.choice === "View All Roles") {
                viewAllRoles()
            }
            if(data.choice === "Add Role") {
                addRole()
            }
            if(data.choice === "View All Departments") {
                viewAllDepartments()
            }
            if(data.choice === "Add Department") {
                addDepartment()
            }
            if(data.chocie === "Quit") {
                quit()
            }
        })
}

function addEmployee() {
//use class to create new Employee
}

function addRole() {
//use class to create new Role
}

function addDepartment() {
//use class to create new Department
}


function viewAllEmployees() {
    db.query('SELECT e.id, e.first_name, e.last_name, r.title, r.salary, d.department_name, e.manager_id FROM employee e JOIN roles r ON e.role_id = r.id JOIN department d ON d.id = r.department_id;');
}