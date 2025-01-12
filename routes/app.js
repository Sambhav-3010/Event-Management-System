const express = require("express");
const router = express.Router();
const Task = require("../models/taskModel");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/tasks/new", (req, res) => {
  res.render("taskForm");
});

router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.render("taskDisplay", { tasks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error fetching tasks." });
  }
});

router.post("/tasks", async (req, res) => {
  try {
    const { name, description, scheduledTime, status } = req.body;
    const newTask = new Task({ name, description, scheduledTime, status });
    await newTask.save();
    res.redirect("/api/tasks");
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while creating the task.");
  }
});

router.post("/update", async (req, res) => {
  const { taskId, newStatus } = req.body;
  try {
    await Task.findByIdAndUpdate(taskId, { status: newStatus });
    res.redirect("/api/tasks");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating task status");
  }
});

router.post("/remove", async (req, res) => {
  const { taskId } = req.body;
  try {
    await Task.findByIdAndDelete(taskId);
    res.redirect("/api/tasks");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting task");
  }
});

module.exports = router;
