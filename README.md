<div align="center">

# TaskFlow — Project & Task Management Portal

**A clean, modern, and responsive task management interface.**

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-Build_Tool-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-Styling-06B6D4?logo=tailwindcss&logoColor=white)
![DaisyUI](https://img.shields.io/badge/DaisyUI-Components-5A0EF8?logo=daisyui&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker&logoColor=white)


</div>

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Available Scripts](#-available-scripts)
- [Running with Docker](#-running-with-docker)
- [Contributing](#-contributing)


---

## 🔍 Overview

**TaskFlow** is a full-stack task management application. This repository contains the **frontend client**, built with React and Vite and styled with Tailwind CSS and DaisyUI. It lets users create, organize, filter, and track daily tasks through a fast and intuitive interface that works on desktop, tablet, and mobile.

---

## ✨ Features

| Feature | Description |
| --- | --- |
| **Dashboard View** | Shows total task counts with dynamic filtering: *All*, *Pending*, *In Progress*, and *Completed*. |
| **Task Cards** | Clean card layout with priority badges (*Low*, *Medium*, *High*), descriptions, and creation dates. |
| **Inline Status Update** | Update a task's status from a dropdown, with instant success toast notifications. |
| **Interactive Modals** | SweetAlert2 dialogs for delete confirmation and real-time validation warnings. |
| **Responsive Design** | Fully adaptive layout for desktop, tablet, and mobile screens. |

---

## 🛠️ Tech Stack

| Category | Technology |
| --- | --- |
| **Framework** | [React](https://react.dev/) (bootstrapped with [Vite](https://vitejs.dev/)) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/), [DaisyUI](https://daisyui.com/) |
| **Icons** | [React Icons](https://react-icons.github.io/react-icons/) |
| **Alerts & Modals** | [SweetAlert2](https://sweetalert2.github.io/) |
| **HTTP Client** | [Axios](https://axios-http.com/) |
| **Routing** | [React Router](https://reactrouter.com/) |

---

## 📂 Project Structure

```text
frontend/
├── src/
│   ├── components/      # Reusable UI components (TaskCard, TaskList, EmptyState, Navbar)
│   ├── pages/           # Application pages (Home, AddTask, EditTask)
│   ├── services/        # Axios API setup and request functions
│   ├── utils/           # Utility helpers (toast and alert functions)
│   ├── App.jsx          # Root component and router configuration
│   └── main.jsx         # Application entry point
├── Dockerfile           # Frontend container configuration
├── package.json         # Dependencies and scripts
└── vite.config.js       # Vite configuration
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) **v18 or higher**
- npm (included with Node.js)

### Installation

1. **Navigate to the frontend directory**

```bash
   cd frontend
```

2. **Install dependencies**

```bash
   npm install
```

3. **Start the development server**

```bash
   npm run dev
```

4. **Open the app in your browser**

```
   http://localhost:5173
```

---

## 🔐 Environment Variables

Create a `.env` file in the `frontend/` directory to configure the API connection:

```env
VITE_API_URL=http://localhost:5000/api
```

> **Note:** Vite only exposes variables prefixed with `VITE_`. Adjust the URL to match your backend.

---

## 📜 Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the Vite development server. |
| `npm run build` | Builds the app for production. |
| `npm run preview` | Previews the production build locally. |
| `npm run lint` | Runs the linter (if configured). |

---

## 🐳 Running with Docker

The frontend is containerized and designed to run as part of a multi-container setup.

| Setting | Value |
| --- | --- |
| **Port** | `5173` |
| **Base Image** | `node:18-alpine` |

### Run the frontend individually

```bash
docker build -t taskflow-frontend .
docker run -p 5173:5173 taskflow-frontend
```

### Run the full stack (frontend + backend + database)

From the **root directory** of the project:

```bash
docker compose up --build
```

> **Tip:** For the Vite dev server to be reachable from outside the container, it must run with the `--host` flag (for example, `npm run dev -- --host`). Make sure your `Dockerfile` uses it.

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

---

<div align="center">

Made by **Minhaz Ahmmed**

🌐 [Portfolio](https://minhazahmmed.vercel.app)

💻 [GitHub](https://github.com/minhazahmmed)

🔗 [LinkedIn](https://www.linkedin.com/in/minhaz-ahmmed)

</div>