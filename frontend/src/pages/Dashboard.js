import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import API from "../api";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [tasksRes, projectsRes] = await Promise.all([
        API.get("/tasks"),
        API.get("/projects"),
      ]);
      setTasks(tasksRes.data);
      setProjects(projectsRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (taskId, status) => {
    try {
      await API.put(`/tasks/${taskId}/status`, { status });
      setTasks(tasks.map((t) => (t._id === taskId ? { ...t, status } : t)));
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (loading) return <div style={styles.loading}>Loading...</div>;

  return (
    <div style={styles.container}>
      {/* Navbar */}
      <div style={styles.navbar}>
        <h2 style={styles.logo}>📋 Task Manager</h2>
        <div style={styles.navRight}>
          <span style={styles.welcome}>
            👋 {user?.name} ({user?.role})
          </span>
          <button style={styles.logoutBtn} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <div style={styles.content}>
        {/* Stats */}
        <div style={styles.statsRow}>
          <div style={styles.statCard}>
            <h3>{projects.length}</h3>
            <p>Total Projects</p>
          </div>
          <div style={styles.statCard}>
            <h3>{tasks.length}</h3>
            <p>Total Tasks</p>
          </div>
          <div style={styles.statCard}>
            <h3>{tasks.filter((t) => t.status === "done").length}</h3>
            <p>Completed</p>
          </div>
          <div style={styles.statCard}>
            <h3>{tasks.filter((t) => t.status === "todo").length}</h3>
            <p>Pending</p>
          </div>
        </div>

        {/* Projects */}
        <h3 style={styles.sectionTitle}>📁 Projects</h3>
        {projects.length === 0 ? (
          <p style={styles.empty}>No projects yet.</p>
        ) : (
          <div style={styles.projectsGrid}>
            {projects.map((p) => (
              <div key={p._id} style={styles.projectCard}>
                <h4>{p.name}</h4>
                <p>{p.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Tasks */}
        <h3 style={styles.sectionTitle}>✅ Tasks</h3>
        {tasks.length === 0 ? (
          <p style={styles.empty}>No tasks assigned yet.</p>
        ) : (
          <div style={styles.tasksGrid}>
            {tasks.map((task) => (
              <div key={task._id} style={styles.taskCard}>
                <h4>{task.title}</h4>
                <p>{task.description}</p>
                <p>
                  Priority:{" "}
                  <span style={getPriorityStyle(task.priority)}>
                    {task.priority}
                  </span>
                </p>
                <p>
                  Project: {task.project?.name || "N/A"}
                </p>
                <select
                  value={task.status}
                  onChange={(e) =>
                    handleStatusChange(task._id, e.target.value)
                  }
                  style={styles.select}
                >
                  <option value="todo">Todo</option>
                  <option value="in-progress">In Progress</option>
                  <option value="done">Done</option>
                </select>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const getPriorityStyle = (priority) => ({
  color:
    priority === "high"
      ? "red"
      : priority === "medium"
      ? "orange"
      : "green",
  fontWeight: "bold",
});

const styles = {
  container: { minHeight: "100vh", background: "#f0f2f5" },
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#6c63ff",
    padding: "15px 30px",
    color: "#fff",
  },
  logo: { margin: 0 },
  navRight: { display: "flex", alignItems: "center", gap: "15px" },
  welcome: { fontSize: "14px" },
  logoutBtn: {
    padding: "8px 16px",
    background: "#fff",
    color: "#6c63ff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  content: { padding: "30px" },
  statsRow: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "20px",
    marginBottom: "30px",
  },
  statCard: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    textAlign: "center",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
  },
  sectionTitle: { color: "#333", marginBottom: "15px" },
  projectsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
    marginBottom: "30px",
  },
  projectCard: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
  },
  tasksGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
  },
  taskCard: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
  },
  select: {
    marginTop: "10px",
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #ddd",
    width: "100%",
  },
  loading: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    fontSize: "20px",
  },
  empty: { color: "#888", fontStyle: "italic" },
};

export default Dashboard;