// Importing necessary modules
const express = require("express");
const app = express();
const port = 3000;

// Middleware to parse incoming request bodies
app.use(express.json());

// Sample tasks data
const tasks = [
  {
    id: 1,
    title: "Complete Project Proposal",
    dueDate: "2023-11-10",
    status: "In Progress",
  },
  {
    id: 2,
    title: "Review Design Mockups",
    dueDate: "2023-11-15",
    status: "Pending",
  },
  {
    id: 3,
    title: "Update Marketing Strategy",
    dueDate: "2023-11-20",
    status: "Pending",
  },
  {
    id: 4,
    title: "Call with Client",
    dueDate: "2023-11-12",
    status: "Pending",
  },
  {
    id: 5,
    title: "Prepare Presentation",
    dueDate: "2023-11-18",
    status: "In Progress",
  },
  {
    id: 6,
    title: "Send Weekly Report",
    dueDate: "2023-11-25",
    status: "Pending",
  },
  {
    id: 7,
    title: "Code Refactoring",
    dueDate: "2023-11-13",
    status: "In Progress",
  },
  {
    id: 8,
    title: "Meet with Team",
    dueDate: "2023-11-17",
    status: "Pending",
  },
  {
    id: 9,
    title: "Content Creation",
    dueDate: "2023-11-22",
    status: "Pending",
  },
  {
    id: 10,
    title: "Bug Fixing",
    dueDate: "2023-11-28",
    status: "Pending",
  },
];

// Starting the server
app.listen(port);

// Route for the root of the application
app.get("/", (req, res) => {
  res.send("This is the root for task management");
});

// GET API for getting all tasks
app.get("/getAllTasks", (req, res) => {
  try {
    // Sending all tasks as response
    res.send(tasks);
  } catch (error) {
    console.error("Rejected:", error);
    res.status(500).send("Internal Server Error");
  }
});

// GET API for getting task information by id
app.get("/getTaskById/:id", (req, res) => {
  try {
    const taskId = parseInt(req.params.id);
    // Finding the task by id
    const task = tasks.find((task) => task.id === taskId);

    if (!task) {
      // If task not found, return 404 error
      return res.status(404).json({ error: "Task not found" });
    }

    // Sending the task as response
    res.send(task);
  } catch (error) {
    console.error("Rejected:", error);
    res.status(500).send("Internal Server Error");
  }
});

// POST API for adding new task data
app.post("/addTask", (req, res) => {
  try {
    const taskData = req.body;
    // Adding the new task to the tasks array
    tasks.push(taskData);
    // Sending success message along with the added task
    res.send({ message: "Task added successfully", task: taskData });
  } catch (error) {
    console.error("Rejected:", error);
    // Sending internal server error if an error occurs
    res.status(500).send("Internal Server Error");
  }
});

// PUT API for updating an existing task data
app.put("/updateTask", (req, res) => {
  try {
    // Extract the task data from the request body
    const taskData = req.body;
    // Extract the taskId from the request body
    const taskId = taskData.id;
    // Find the index of the task to be updated in the tasks array
    const taskIndex = tasks.findIndex((task) => task.id === taskId);

    // Update the task in the tasks array
    tasks[taskIndex] = taskData;

    // Sending success message along with the updated task
    res.send({ message: "Task updated successfully", task: taskData });
  } catch (error) {
    console.error("Rejected:", error);
    // Sending internal server error if an error occurs
    res.status(500).send("Internal Server Error");
  }
});
