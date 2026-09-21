import { Link } from "react-router";
import { FiInbox, FiPlus } from "react-icons/fi";

function EmptyState({ isFiltered }) {
  return (
    <div className="flex flex-col items-center rounded-box bg-base-100 px-4 py-16 text-center shadow">
      <FiInbox className="mb-4 text-6xl text-base-content/30" />
      <h2 className="text-xl font-semibold">
        {isFiltered ? "No tasks in this category" : "No tasks yet"}
      </h2>
      <p className="mb-6 mt-1 text-base-content/60">
        {isFiltered
          ? "Try selecting a different filter."
          : "Create your first task to get started."}
      </p>
      {!isFiltered && (
        <Link to="/tasks/new" className="btn btn-primary">
          <FiPlus /> Add Task
        </Link>
      )}
    </div>
  );
}

export default EmptyState;