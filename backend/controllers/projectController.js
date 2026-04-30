const Project = require("../models/Project");

// @POST /api/projects — Admin only
const createProject = async (req, res) => {
  const { name, description, members } = req.body;
  try {
    const project = await Project.create({
      name,
      description,
      members,
      createdBy: req.user._id,
    });
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @GET /api/projects — All logged in users
const getProjects = async (req, res) => {
  try {
    let projects;
    if (req.user.role === "admin") {
      projects = await Project.find().populate("createdBy", "name email");
    } else {
      projects = await Project.find({ members: req.user._id }).populate(
        "createdBy",
        "name email"
      );
    }
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @GET /api/projects/:id — Single project
const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate(
      "members",
      "name email role"
    );
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @DELETE /api/projects/:id — Admin only
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createProject, getProjects, getProjectById, deleteProject };