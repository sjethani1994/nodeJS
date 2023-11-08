// Importing necessary functions from respective files
const { displayAllProducts } = require("./displayAllProducts"); // Importing the displayAllProducts function
const { findProductByName } = require("./findProductByName"); // Importing the findProductByName function
const { addNewProduct } = require("./addProducts"); // Importing the addNewProduct function
const { deleteProductbyName } = require("./deleteProductbyName"); // Importing the deleteProductbyName function

// Adding a new product
addNewProduct("sugar", 56);

// Displaying all products
displayAllProducts();

// Finding a product by name
findProductByName("sugar");

// Deleting a product by name
deleteProductbyName("sugar");
