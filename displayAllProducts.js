// Array of products
products = [
  {
    name: "Thums Up",
    price: 100,
  },
  {
    name: "rice",
    price: 78,
  },
  {
    name: "Mustard Oil",
    price: 250,
  },
];

// Function to display all products
function displayAllProducts() {
  for (let i = 0; i < products.length; i++) {
    console.log(products[i].name, products[i].price);
  }
}

// Export the array and the function
module.exports = {
  products,
  displayAllProducts,
};
