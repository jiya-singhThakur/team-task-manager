const express = require("express");
const router = express.Router();
const {
  createProject,
  getProjects,
  getProjectById,
  deleteProject,
} = require("../controllers/projectController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

router.post("/", protect, adminOnly, createProject);
router.get("/", protect, getProjects);
router.get("/:id", protect, getProjectById);
router.delete("/:id", protect, adminOnly, deleteProject);

module.exports = router;