const ProductModel = require("../models/product.model");
const stripe = require("stripe")(
  "sk_test_51Oool4SIiKMrNAexO7BpxRwBUSGcvMc0IBTtyb2XYzumcbDaCi2oMj7VK9nxj52guTmTsssJAFkGoRKaWw8YfYO400Zwq9xQ5Y"
);
const placeOrderSession = async (req, res) => {
  const { product, amount, name, email, address, shipping } = req.body;
  const unitAmount = Math.round(amount * 100);

  const lineItems = [
    {
      price_data: {
        currency: "inr",
        product_data: {
          name: product.length > 1 ? "Multile Products" : product[0].title, // Assuming product is an array with one item
        },
        unit_amount: unitAmount,
      },
      quantity: 1,
    },
  ];

  const customer = await stripe.customers.create({
    name: name,
    email: email,
  });

  const customerUpdated = await stripe.customers.update(customer.id, {
    address: {
      city: address.city,
      country: address.country,
      line1: address.line1, // Assuming line1 is available in the request body
      line2: address.line2,
      postal_code: address.postal_code,
      state: address.state,
    },
    shipping: {
      name: name,
      address: {
        line1: "510 Townsend St",
        postal_code: "98140",
        city: "San Francisco",
        state: "CA",
        country: "US",
      },
    },
  });

  const session = await stripe.checkout.sessions.create({
    customer: customer.id,
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/failure",
  });

  return res.json({ id: session.id });
};

// Function to place order and delete products from the database
const placeOrder = async (req, res) => {
  const { productIds } = req.body;
  try {
    // Delete orders corresponding to each productId
    const deletedOrders = await Promise.all(
      productIds.map(async (productId) => {
        const order = await ProductModel.findByIdAndDelete(productId);
        return order;
      })
    );

    // Respond with success message and deleted orders
    res.json({
      success: true,
      message: "Orders placed successfully and database updated",
      deletedOrders,
    });
  } catch (error) {
    // Handle errors if any
    res
      .status(500)
      .json({ success: false, message: "Failed to delete orders", error });
  }
};

module.exports = {
  placeOrderSession,
  placeOrder,
};
