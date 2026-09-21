import { Link } from "react-router";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

const PRIORITY_STYLES = {
  Low: "badge-success",
  Medium: "badge-warning",
  High: "badge-error",
};

const STATUSES = ["Pending", "In Progress", "Completed"];

function TaskCard({ task, onDelete, onStatusChange }) {
  const date = new Date(task.created_at).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const isCompleted = task.status === "Completed";

  return (
    <div className="card  bg-base-100 shadow-md">
      <div className="card-body gap-3">
        <div className="flex items-start justify-between gap-2">
          <h2
            className={`card-title wrap-break-words text-lg ${
              isCompleted ? "line-through opacity-70" : ""
            }`}
          >
            {task.title}
          </h2>
          <span className={`badge ${PRIORITY_STYLES[task.priority]}`}>
            {task.priority}
          </span>
        </div>

        <p className="wrap-break-words text-sm ">
          {task.description || "No description"}
        </p>

        <p className="">Created: {date}</p>

        <div className="card-actions items-center justify-between">
          <select
            className="select select-[14px] w-40"
            value={task.status}
            onChange={(e) => onStatusChange(task, e.target.value)}
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <div className="flex gap-1">
            <Link
              to={`/tasks/${task.id}/edit`}
              className="btn btn-ghost btn-lg btn-square"
              aria-label="Edit task"
            >
              <FiEdit2 />
            </Link>
            <button
              className="btn btn-ghost btn-lg btn-square text-error"
              onClick={() => onDelete(task)}
              aria-label="Delete task"
            >
              <FiTrash2 />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;