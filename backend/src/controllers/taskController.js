const pool = require("../config/db");

const PRIORITIES = ["Low", "Medium", "High"];
const STATUSES = ["Pending", "In Progress", "Completed"];

function validateTask(body) {
  const { title, priority, status } = body;
  if (!title || title.trim() === "") return "Title is required";
  if (title.length > 100) return "Title must be 100 characters or less";
  if (priority && !PRIORITIES.includes(priority)) return "Invalid priority";
  if (status && !STATUSES.includes(status)) return "Invalid status";
  return null;
}

exports.getTasks = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM tasks ORDER BY created_at DESC",
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM tasks WHERE id = ?", 
      [req.params.id,]
    );

    if (rows.length === 0) 
    {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(rows[0]);
  } 
  catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch task" });
  }
};

exports.createTask = async (req, res) => {
  const error = validateTask(req.body);
  if (error) 
    return res.status(400).json({ message: error });

  try {
    const { title, description, priority, status } = req.body;
    const [result] = await pool.query(
      "INSERT INTO tasks (title, description, priority, status) VALUES (?, ?, ?, ?)",
      [
        title.trim(),
        description || "",
        priority || "Medium",
        status || "Pending",
      ],
    );

    const [rows] = await pool.query("SELECT * FROM tasks WHERE id = ?", 
    [
      result.insertId,
    ]);
    res.status(201).json(rows[0]);
  } 
  catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create task" });
  }
};

exports.updateTask = async (req, res) => {
  const error = validateTask(req.body);
  if (error) 
    return res.status(400).json({ message: error });

  try {
    const { title, description, priority, status } = req.body;
    const [result] = await pool.query(
      "UPDATE tasks SET title = ?, description = ?, priority = ?, status = ? WHERE id = ?",
      [
        title.trim(),
        description || "",
        priority || "Medium",
        status || "Pending",
        req.params.id,
      ],
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Task not found" });
    }
    const [rows] = await pool.query("SELECT * FROM tasks WHERE id = ?", [
      req.params.id,
    ]);
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update task" });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM tasks WHERE id = ?", [
      req.params.id,
    ]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete task" });
  }
};
