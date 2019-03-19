//require mysql and inquirer
var mysql = require("mysql");
var inquirer = require("inquirer");

//create variable to connect with mysql and the bamazon_db database  
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Primary22",
    database: "bamazon_db"
});

//establish a connection
connection.connect(function (error) {
    if (error) {
        throw error;
    }
    //if no  errror show connection
    console.log("Connected! id: " + connection.threadId);

    displayProducts();

});


function displayProducts() {
    //display the table of products 
    connection.query("SELECT * FROM products", function (error, data) {
        if (error) {
            throw error;
        }
        console.log("Product Inventory:");
        console.table(data);
        //call the ask function to get user input
        ask();
    })
};
// connection.end();


//function which uses inquirer to get the user to enter product id and quantity
function ask() {
    inquirer.prompt([
        {   ///ask the user for the id of the product they would like to buy
            type: "input",
            name: "productName",
            message: "What is the item_id for the product you would like to purchase?"
        },

        {   //ask the user for the quantity
            type: "input",
            name: "quantityRequest",
            message: "What is the quantity you would like to purchase?"
        }

    ]).then(function (answer) {
        // console.log(answer.productName, answer.quantityRequest);
        var idRequest = answer.productName;
        var quantityRequest = answer.quantityRequest;

        connection.query("SELECT stock_quantity FROM products WHERE ?",
            { item_id: idRequest }, function (err, results) {
                console.log("results " + results);
                var remainingStock = results[0].stock_quantity;
                console.log("remaining: " + remainingStock);
                var total = parseInt(quantityRequest) * parseInt(results[0].price);
                //check if the stock quantity is equal or less than the requested quantity
                console.log("requested stock: " + quantityRequest);

                if (quantityRequest > remainingStock) {
                    console.log("insufficient stock");
                } else if (quantityRequest <= remainingStock) {
                    var updatedStock = parseInt(remainingStock) - parseInt(quantityRequest);

                    console.log(total);
                    console.log("updated stock: " + updatedStock);

                    // connection.query("UPDATE products SET ? WHERE ?"), 
                    // [{stock_quantity: updatedStock}, {item_id: idRequest}],

                    // function(error) {
                    //     if(error) throw err;
                    //     console.log("updated stock to : " + updatedStock);
                    // }
                }
            })
    });

};


//check the quantity available 
//if insufficient: display infufficent 
//if sufficient amount, update the SQL database and show the purchase price
