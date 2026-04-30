const Task = require("../models/Task");

// @POST /api/tasks — Admin only
const createTask = async (req, res) => {
  const { title, description, status, priority, project, assignedTo } =
    req.body;
  try {
    const task = await Task.create({
      title,
      description,
      status,
      priority,
      project,
      assignedTo,
      createdBy: req.user._id,
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @GET /api/tasks — Admin: all, Member: assigned only
const getTasks = async (req, res) => {
  try {
    let tasks;
    if (req.user.role === "admin") {
      tasks = await Task.find()
        .populate("assignedTo", "name email")
        .populate("project", "name");
    } else {
      tasks = await Task.find({ assignedTo: req.user._id })
        .populate("assignedTo", "name email")
        .populate("project", "name");
    }
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @PUT /api/tasks/:id/status — Member can update status
const updateTaskStatus = async (req, res) => {
  const { status } = req.body;
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    task.status = status;
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @DELETE /api/tasks/:id — Admin only
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createTask, getTasks, updateTaskStatus, deleteTask };