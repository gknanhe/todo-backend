const User = require("../models/user");
const Todo = require("../models/todo");

module.exports.createTodo = async (req, res) => {
  try {
    const { userId, ...todoData } = req.body;
    console.log(req.body);
    // Check if the user exists (optional, depending on your requirements)
    const userExists = await User.exists({ _id: userId });
    if (!userExists) {
      return res.status(404).json({ error: "User not found" });
    }

    // Create a new instance of the Todo model with the user reference
    const newTodo = new Todo({
      ...todoData,
      user: userId,
      createdAt: new Date(),
    });

    // Save the todo to the database
    const savedTodo = await Todo.create(newTodo);

    // Associate the todo with the user
    await User.findByIdAndUpdate(userId, { $push: { todos: savedTodo._id } });

    // Send a response back to the client with the saved todo
    res.status(201).json(savedTodo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.fetchTodo = async (req, res) => {
  console.log("getting here");
  try {
    // Get the user ID from the request (you need to have it in your request, e.g., from the authentication middleware)
    const userId = req.query.userId; // Adjust based on your authentication setup

    // Find the user by ID
    // const user = await User.findById(userId)

    //   .populate("todos")
    //   .sort("-createdAt");

    const user = await User.findById(userId).populate({
      path: "todos",
      options: { sort: { createdAt: -1 } },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // console.log(user);
    // Extract the todos from the user
    const todos = user.todos;
    // console.log(todos);
    return res.status(200).json({ todos });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.deleteTodo = async (req, res) => {
  try {
    // console.log(req.body);
    // Get the user ID from the request (you need to have it in your request, e.g., from the authentication middleware)
    const userId = req.body.userId; // Adjust based on your authentication setup

    // Get the todo ID from the request parameters
    const todoId = req.body.todoId;

    // Check if the user exists
    const userExists = await User.exists({ _id: userId });
    if (!userExists) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the todo exists and belongs to the user
    const todo = await Todo.findOne({ _id: todoId, user: userId });
    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    // Remove the todo from the user's todos array
    await User.findByIdAndUpdate(userId, { $pull: { todos: todoId } });

    // Delete the todo from the Todo collection
    await Todo.findByIdAndDelete(todoId);

    // Send a success response
    res
      .status(200)
      .json({ deleted: true, message: "Todo deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.editTodo = async (req, res) => {
  try {
    console.log(req.body, "editing");
    // Get the user ID from the request (you need to have it in your request, e.g., from the authentication middleware)
    const userId = req.body.userId; // Adjust based on your authentication setup

    // Get the todo ID from the request parameters
    const todoId = req.body.todo._id;

    // Get the user ID from the request (you need to have it in your request, e.g., from the authentication middleware)
    // const userId = req.query.userId; // Adjust based on your authentication setup

    // // Get the todo ID from the request parameters
    // const todoId = req.params.todoId;

    // Check if the user exists
    const userExists = await User.exists({ _id: userId });
    if (!userExists) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the todo exists and belongs to the user
    const todo = await Todo.findOne({ _id: todoId, user: userId });
    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    // Update the todo with the new data
    const updatedTodo = await Todo.findByIdAndUpdate(
      todoId,
      { ...req.body.todo },
      { new: true }
    );

    // Send the updated todo as a response
    return res.status(200).json({ success: true, todo: updatedTodo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.markTodo = async (req, res) => {
  try {
    console.log(req.body, "editing");
    // Get the user ID from the request (you need to have it in your request, e.g., from the authentication middleware)
    const userId = req.body.userId; // Adjust based on your authentication setup

    // Get the todo ID from the request parameters
    const todoId = req.body.todoId;

    // Check if the user exists
    const userExists = await User.exists({ _id: userId });
    if (!userExists) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the todo exists and belongs to the user
    const todo = await Todo.findOne({ _id: todoId, user: userId });
    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    // Toggle the 'completed' field of the todo
    todo.completed = !todo.completed;

    // Save the updated todo
    const updatedTodo = await todo.save();

    // Send the updated todo as a response

    // Send the updated todo as a response
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
