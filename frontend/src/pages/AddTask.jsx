import { useState } from "react";
import { useNavigate } from "react-router";
import { createTask } from "../services/api";
import { showSuccess, showError } from "../utils/alert";
import TaskForm from "../components/TaskForm";


function AddTask() {
  const navigate = useNavigate(); 
  const [saving, setSaving] = useState(false);

  async function handleSave(formData) {
    try {
      setSaving(true);
      await createTask(formData);
      showSuccess("Task created successfully");
      navigate("/"); 
    } catch (err) {
      showError(err.response?.data?.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  }

  return <TaskForm onSave={handleSave} saving={saving} />;
}

export default AddTask;