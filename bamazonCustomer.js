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
        // make a connection query with mysql database and the products table
        connection.query("SELECT * FROM products WHERE ?",
        // the collumn name in the table is item_id
            { item_id: idRequest }, function (err, results) {
                
                var remainingStock = results[0].stock_quantity;
                console.log("remaining: " + remainingStock);
                
                //check if the stock quantity is equal or less than the requested quantity
                console.log("requested stock: " + quantityRequest);
                //check the available quantity against the requested value
                if (quantityRequest > remainingStock) {
                    console.log("insufficient stock");
                    //call the ask function to begin the questions again
                    ask();
                } else if (quantityRequest <= remainingStock) {
                    // if the stock is greater, fulfill the order 
                    var updatedStock = parseInt(remainingStock) - parseInt(quantityRequest);
                    // console.log("Updated stock: " + updatedStock);
                    //update the database to show the new quantitiy
                    connection.query("UPDATE products SET ? WHERE ?", 
                    [{stock_quantity: updatedStock}, {item_id: idRequest}],
                    function(error) {
                        if(error) throw err;
                        console.log("Updated stock, now remaining : " + updatedStock);

                        //calculate the total cost of the order
                        var total = parseInt(quantityRequest) * results[0].price;
                        console.log("Order total: $ " + total);
                        //call the ask function to begin the questions again
                        ask();
                    })
                }
            })
    });

};




