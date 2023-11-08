// Import the products array from displayProduct.js
const { products } = require("./displayAllProducts");

// Function to add a new product to the products array
function addNewProduct(name, price) {
  const product = {};
  product.name = name;
  product.price = price;
  products.push(product);
}

// Export the function
module.exports = {
  addNewProduct
};
