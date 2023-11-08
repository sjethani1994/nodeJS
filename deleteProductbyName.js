// Import the products array from displayProduct.js
const { products } = require("./displayAllProducts");

// Function to delete a product by its name
function deleteProductbyName(name) {
  const index = products.findIndex((product) => product.name === name);
  if (index !== -1) {
    products.splice(index, 1);
    console.log(`Product with name ${name} deleted successfully.`);
  } else {
    console.log(`Product with name ${name} not found.`);
  }
}

// Export the function
module.exports = {
  deleteProductbyName,
};
