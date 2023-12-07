const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    task: {
      type: String,
      required: true,
    },
    discription: {
      type: String,
    },
    date: {
      type: Date,
    },
    category: {
      name: {
        type: String,
      },
      color: {
        type: String,
      },
      bg: {
        type: String,
      },
      border: {
        type: String,
      },
      text: {
        type: String,
      },
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
