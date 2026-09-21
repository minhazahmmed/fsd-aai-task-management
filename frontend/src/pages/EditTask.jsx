import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router";
import { getTaskById, updateTask } from "../services/api";

import TaskForm from "../components/TaskForm";
import { showError, showSuccess } from "../utils/alert";

function EditTask() {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadTask() {
      try {
        const res = await getTaskById(id);
        setTask(res.data);
      } catch (err) {
        if (err.response?.status === 404) {
          setError("This task does not exist.");
        } else {
          setError("Could not load the task. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    }
    loadTask();
  }, [id]);

  async function handleSave(formData) {
    try {
      setSaving(true);
      await updateTask(id, formData);
      showSuccess("Task updated successfully");
      navigate("/");
    } catch (err) {
      showError(err.response?.data?.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div role="alert" className="alert alert-error">
        <span>{error}</span>
        <Link to="/" className="btn btn-sm">
          Back to tasks
        </Link>
      </div>
    );
  }

  return <TaskForm task={task} onSave={handleSave} saving={saving} />;
}

export default EditTask;