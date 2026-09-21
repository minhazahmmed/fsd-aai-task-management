import { Link, NavLink } from "react-router";
import { FiCheckSquare, FiPlus } from "react-icons/fi";

function navClass({ isActive }) {
  return `btn btn-sm ${isActive ? "btn-primary" : "btn-ghost"}`;
}

function Header() {
  return (
    <header className="sticky top-0 z-40 bg-base-100 shadow-sm">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold">
          <FiCheckSquare className="text-primary" />
          TaskFlow
        </Link>

        <nav className="flex items-center gap-2">
          <NavLink to="/" end className={navClass}>
            Tasks
          </NavLink>
          <NavLink to="/tasks/new" className={navClass}>
            <FiPlus /> New Task
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;