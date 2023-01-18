const { createHook } = require('async_hooks');
const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');
// const Connection = require('mysql2/typings/mysql/lib/Connection');
const QueryString = require('qs');
require("dotenv").config()
// const Employee = require('./lib/Employee.class')

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
      host: '127.0.0.1',
      user: 'root',
      password: process.env.DB_PASSWORD,
      database: 'employee_db'
    },
    console.log(`Connected to the database.`)
  );
  let employeeNames = []
  let departmentNames = []
  let roleNames = []
  let managerNames = []
  let roleNameChoices = []
  

const mainMenu = [
    {
        type: 'list',
        message: "What would you like to do?",
        name: "choice",
        choices: ["View All Employees", "View All Departments", "View All Roles", "Add Employee", "Add Department", "Add Role", "Update Employee Role", "Quit"]
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
        type: 'list',
        message: "What is the Employee's role?",
        name: "employeeRole",
        choices: roleNames
    },
    {
        type: "list",
        message: "Who is the Employee's Manager?",
        name: "employeeManager",
        choices: managerNames
    }
]

const addRoles = [
    {
        type: "input",
        message: 'What is the name of the Role?',
        name: "title",
    },
    {
        type: "input",
        message: "What is the salary of the Role?",
        name: "salary"
    },
    {
        type: 'list',
        message: 'What department does the role belong to?',
        name: 'roleDepartment',
        choices: departmentNames
    }
]

const addDepartments = [
    {
        type: "input",
        message: "What is the name of the department you would like to add?",
        name: "newDepartment",
    },
]



function option() {
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

function getDepartment() {
    return db.promise().query('SELECT * FROM department;')
}


function getManagers() {
    return db.promise().query('SELECT first_name, last_name FROM employee WHERE manager_id;')
}


function getRoles() {
    return db.promise().query('SELECT * FROM roles;')
}

function getEmployees() {
    return db.promise().query('SELECT first_name, last_name, id FROM employee;')  
}

function addEmployee() {
    getRoles()
        .then((data) => {
            let rArray = data[0]
            for(var i = 0; i < rArray.length; i++) {
                let role = rArray[i].title
                roleNames.push(role)
            }
                getManagers()
                .then((data) => {
                    let mArray = data[0]
                    for(var i = 0; i < mArray.length; i++) {
                        let manager = mArray[i].first_name + ' ' + mArray[i].last_name
                        managerNames.push(manager)
                    }
                })
        })
        

    inquirer
        .prompt(addEmployees)

        .then((data) => {
            // const employee = new Employee(data.firstName, data.lastName, data.role, data.manager)
            const managerName = data.employeeManager.split(' ')
            db.query(`SELECT (SELECT id FROM roles WHERE roles.title = '${data.employeeRole}') role_id,
            (SELECT id FROM employee WHERE first_name = '${managerName[0]}' AND last_name = '${managerName[1]}') manager_id;`, function(err, results){
                if(err) throw err
                
                console.log(results)
                console.log("Captured ids successfully")
                db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${data.firstName}', '${data.lastName}', ${results[0].role_id}, ${results[0].manager_id});`, function(err, results){
                    if(err) throw err
                    console.log("Insert successful");
                })
            })
            option();
        })
}

function addRole() {
    getDepartment()
        .then((data) => {
        let dArray = data[0]
        for (var i = 0; i < dArray.length; i++) {
         let department = dArray[i].department_name
         departmentNames.push(department)
        }})
    inquirer
        .prompt(addRoles)
        
        .then((data) => {
            db.query(`SELECT id department_id FROM department WHERE department.department_name = '${data.roleDepartment}';`, function(err, results) {
                if(err) throw err


                db.query(`INSERT INTO roles (title, salary, department_id) VALUES ('${data.title}', ${data.salary}, ${results[0].department_id});`, function(err, results){
                    if(err) throw err
                    console.log('Insert successful');
                })
                
            })
            option(); 
        })
}

function addDepartment() {
    inquirer
        .prompt(addDepartments)

        .then((data) => {
            db.query(`INSERT INTO department (department_name) VALUES ('${data.newDepartment}');`, function(err, results) {
                if(err) throw err
                console.log("department insert successful")
                
            })
            option();
        })
}
//use to view all employees
function viewAllEmployees() {
    db.query(`SELECT e.id, e.first_name, e.last_name, r.title, r.salary, d.department_name,
    (SELECT em.first_name FROM employee em WHERE em.id = e.manager_id) manager_firstname,
    (SELECT em.last_name FROM employee em WHERE em.id = e.manager_id) manager_lastname
    FROM employee e JOIN roles r
    ON e.role_id = r.id
    JOIN department d
    ON d.id = r.department_id;`, function(err, results) {
        console.table(results);
    })
    option();
}
//use to viewA all departments
function viewAllDepartments() {
    db.query(`SELECT * FROM department;`, function(err, results) {
        if(err) throw err
        console.table(results);
    })
    option();
}

function viewAllRoles() {
    db.query(`SELECT * FROM roles;`, function(err, results) {
        if(err) throw err
        console.table(results);
    })
    option();
}

async function updateEmployeeRole() {
    employeeNames = []
    const employeeArray = await getEmployees()
    for (var i = 0; i < employeeArray[0].length; i++) {
        const emp = employeeArray[0][i].first_name + ' ' + employeeArray[0][i].last_name
        employeeNames.push(emp)
        // console.log(employee)
    }
    const rArray = await getRoles()
    for (var i = 0; i < rArray[0].length; i++) {
        let role = rArray[0][i].title
        roleNameChoices.push(role)
    }
    console.log(employeeNames)

    const updateEmployee = [
        {
            type: "list",
            message: "Which employee's role would you like to update?",
            name: "updatedEmployee",
            choices: employeeNames
        },
        {
            type: "list",
            message: "Which role do you want to assign to the employee?",
            name: "newRoleChoice",
            choices: roleNameChoices
        }
    ]
    inquirer
        .prompt(updateEmployee)
            
        .then((data) => {
            const empUpdate = data.updatedEmployee.split(' ')
            db.query(`SELECT (SELECT id FROM roles WHERE roles.title = '${data.newRoleChoice}') role_id,
            (SELECT id FROM employee WHERE first_name = '${empUpdate[0]}' AND last_name = '${empUpdate[1]}') emp_id;`, function(err, results){
                if(err) throw err
                console.log(results[0])

                db.query(`UPDATE employee SET role_id = ${results[0].role_id} WHERE role_id = ${results[0].emp_id};`, function(err, results){
                    if(err) throw err

                    console.log("Update successful")
                }) 
            })
            option(); 
        })   
}

function quit() {

}

option();