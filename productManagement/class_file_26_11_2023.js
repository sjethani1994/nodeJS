const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { Schema } = mongoose;
const port = 3000;

// Middleware to parse incoming request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Add this line if handling form data

async function connectToDB() {
  try {
    await mongoose.connect(
      "mongodb+srv://sjethani651:Sjethani%4094@hatch.zcgjpl5.mongodb.net/",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
}

connectToDB()
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });

// // Global error handling for MongoDB connection
// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "MongoDB connection error:"));
// db.once("open", () => {
//   console.log("Connected to MongoDB!");
//   // Your code for interacting with the database goes here
// });

const userSchema = new Schema({
  name: { type: String },
  password: { type: String },
  email: { type: String, unique: true },
});
const userModel = mongoose.model("LearningUser", userSchema);

app.get("/getInfo", async (req, res) => {
  try {
    const result = await userModel.find({});
    res.json(result); // Send the result as a JSON response
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" }); // Send an error response
  }
});

app.post("/addInfo", async (req, res) => {
  const { name, password, email } = req.body;
  console.log(name, password, email);

  // Assuming userModel is a Mongoose model
  // const insertData = new userModel({ name, password, email });

  try {
    //   const result = await insertData.save();
    const insertData = await userModel.create({ name, password, email });
    console.log("Data saved to MongoDB!");
    res.json({ message: "Data saved to MongoDB!", insertData });
  } catch (error) {
    console.error("Error saving data to MongoDB:", error.message);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on Port ${port}`);
});
