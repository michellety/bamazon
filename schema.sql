-- Drops the bamazon_db if it currently exists --
DROP DATABASE IF EXISTS bamason_db;

-- Creates the database --
CREATE DATABASE bamazon_db;

-- Applies the following code to the database --
USE bamazon_db;

-- Creates the table "products" --
-- Columns for id, product name, department name, cost to customer, stock quantity --
CREATE TABLE products (
    item_id             INTEGER AUTO_INCREMENT PRIMARY KEY,
    product_name        VARCHAR(30) NOT NULL,
    department_name     VARCHAR(30) NOT NULL,
    price               INTEGER(10) NOT NULL,
    stock_quantity      INTEGER(10)
);

-- Add data into the table --
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("metal straw", "kitchen", 5.50, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("reusable bag", "home", 3.00, 500);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("recycled paper", "art", 1.00, 3000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("large container", "kitchen", 5.00, 500);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("medium container", "kitchen", 4.50, 500);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("small container", "kitchen", 3.50, 500);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("frut bowl", "home", 10.00, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("botanical shampoo", "bath", 13.25, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("botanical conditioner", "bath", 15.50, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("rain water tank", "garden", 50.50, 400);

-- Select the entire table -- 
SELECT * FROM products;