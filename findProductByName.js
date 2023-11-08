// Import the products array from displayProduct.js
const { products } = require("./displayAllProducts");

// Function to find a product by its name
function findProductByName(productName) {
  const result = products.filter((item) => item.name === productName);
  console.log(result);
}

// Export the function
module.exports = {
  findProductByName
};
