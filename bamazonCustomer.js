//require mysql and inquirer

var mysql = require("mysql");
var inquirer = require("inquirer");

//establish a connection with mysql 
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Primary22",
    databse: "bamazon_db"
});

