import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import EmptyState from "../components/EmptyState";
import TaskList from "../components/TaskList";
import { deleteTask, getTasks, updateTask } from "../services/api";
import { showError, showSuccess } from "../utils/alert";


const FILTERS = ["All", "Pending", "In Progress", "Completed"];

function Home() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("All");

  async function fetchTasks() {
    try {
      setLoading(true);
      setError("");
      const res = await getTasks();
      setTasks(res.data);
    } catch (err) {
      console.error(err);
      setError("Could not load tasks. Please check that the backend is running.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let ignore = false;

    async function startFetching() {
      try {
        setError("");
        const res = await getTasks();
        if (!ignore) {
          setTasks(res.data);
        }
      } catch (err) {
        console.error(err);
        if (!ignore) {
          setError("Could not load tasks. Please check that the backend is running.");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    startFetching();

    return () => {
      ignore = true;
    };
  }, []);

  async function handleStatusChange(task, newStatus) {
    try {
      const res = await updateTask(task.id, {
        title: task.title,
        description: task.description,
        priority: task.priority,
        status: newStatus,
      });
      setTasks(tasks.map((t) => (t.id === task.id ? res.data : t)));
      showSuccess(`Status changed to ${newStatus}`);
    } catch (err) {
      console.error(err);
      showError("Failed to update status");
    }
  }

  async function handleDelete(task) {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `"${task.title}" will be deleted permanently.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it",
      showLoaderOnConfirm: true,
      allowOutsideClick: () => !Swal.isLoading(),
      preConfirm: async () => {
        try {
          await deleteTask(task.id);
        } catch {
          Swal.showValidationMessage("Failed to delete task. Try again.");
        }
      },
    });

    if (result.isConfirmed) {
      setTasks(tasks.filter((t) => t.id !== task.id));
      showSuccess("Task deleted successfully");
    }
  }

  const visibleTasks =
    filter === "All" ? tasks : tasks.filter((t) => t.status === filter);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold sm:text-4xl">My Tasks</h1>
        <p className="text-lg mt-2 ">
          Total {tasks.length} task{tasks.length !== 1 && "s"}
        </p>
      </div>

      <div className="tabs tabs-box mb-6 max-w-full overflow-x-auto">
        {FILTERS.map((f) => (
          <button
            key={f}
            className={`text-[16px] tab ${filter === f ? "tab-active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : error ? (
        <div role="alert" className="alert alert-error">
          <span>{error}</span>
          <button className="btn btn-sm" onClick={fetchTasks}>
            Retry
          </button>
        </div>
      ) : visibleTasks.length === 0 ? (
        <EmptyState isFiltered={filter !== "All"} />
      ) : (
        <TaskList
          tasks={visibleTasks}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
}

export default Home;