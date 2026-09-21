import { useState } from "react";
import { Link } from "react-router";

function TaskForm({ task, onSave, saving }) {
  const [form, setForm] = useState({
    title: task?.title || "",
    description: task?.description || "",
    priority: task?.priority || "Medium",
    status: task?.status || "Pending",
  });
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function validate() {
    const newErrors = {};
    if (form.title.trim() === "") {
      newErrors.title = "Title is required";
    } else if (form.title.length > 100) {
      newErrors.title = "Title must be 100 characters or less";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault(); 
    if (validate()) {
      onSave(form);
    }
  }

  return (
    <div className="mx-auto max-w-xl">
      <div className="card bg-base-100 shadow-md">
        <form onSubmit={handleSubmit} className="card-body gap-4">
          <h1 className="card-title text-2xl">
            {task ? "Edit Task" : "Create New Task"}
          </h1>

          <div>
            <label htmlFor="title" className="mb-1 block text-sm font-medium">
              Title *
            </label>
            <input
              id="title"
              name="title"
              type="text"
              className={`input w-full ${errors.title ? "input-error" : ""}`}
              placeholder="e.g. Design login page"
              value={form.title}
              onChange={handleChange}
            />
            <div className="mt-1 flex justify-between text-xs">
              <span className="text-error">{errors.title}</span>
              <span className="text-base-content/50">{form.title.length}/100</span>
            </div>
          </div>

          <div>
            <label htmlFor="description" className="mb-1 block text-sm font-medium">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              className="textarea w-full"
              rows="3"
              placeholder="Write some details..."
              value={form.description}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="priority" className="mb-1 block text-sm font-medium">
                Priority
              </label>
              <select
                id="priority"
                name="priority"
                className="select w-full"
                value={form.priority}
                onChange={handleChange}
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>

            <div>
              <label htmlFor="status" className="mb-1 block text-sm font-medium">
                Status
              </label>
              <select
                id="status"
                name="status"
                className="select w-full"
                value={form.status}
                onChange={handleChange}
              >
                <option>Pending</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
            </div>
          </div>

          <div className="card-actions justify-end">
            <Link to="/" className="btn">
              Cancel
            </Link>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : task ? (
                "Update Task"
              ) : (
                "Create Task"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskForm;