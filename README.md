# 📋 Team Task Manager

A full-stack web application where users can create projects, assign tasks, and track progress with role-based access control (Admin/Member).

## 🔗 Live Links

- **Frontend (Live):** https://incredible-khapse-c74ecc.netlify.app
- **Backend API:** https://team-task-manager-production-2133.up.railway.app
- **GitHub Repo:** https://github.com/jiya-singhThakur/team-task-manager

---

## 🚀 Key Features

- **Authentication** — Signup & Login with JWT-based session management
- **Role-Based Access Control** — Admin can create/delete projects & tasks; Members can only view and update status
- **Project Management** — Admin can create projects and add members to teams
- **Task Management** — Create tasks, assign to team members, set priority & due date
- **Status Tracking** — Tasks can be moved between Todo → In Progress → Done
- **Dashboard** — Overview of total projects, tasks, completed, pending, and overdue tasks
- **Overdue Detection** — Automatically flags tasks past their due date that aren't completed

---

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router DOM
- Axios
- Deployed on **Netlify**

### Backend
- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs for password hashing
- Deployed on **Railway**

---

## 📁 Project Structure

```
team-task-manager/
├── frontend/
│   ├── src/
│   │   ├── pages/         # Login, Register, Dashboard
│   │   ├── components/    # Reusable UI components
│   │   ├── context/       # Auth context
│   │   └── api.js         # Axios instance
│   └── package.json
│
└── backend/
    ├── config/            # MongoDB connection
    ├── controllers/       # Auth, Project, Task logic
    ├── middleware/        # JWT protect + adminOnly
    ├── models/            # User, Project, Task schemas
    ├── routes/            # API routes
    └── server.js
```

---

## 🔐 API Endpoints

### Auth
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/auth/register` | Public | Register new user |
| POST | `/api/auth/login` | Public | Login user |

### Projects
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/projects` | All | Get all projects |
| POST | `/api/projects` | Admin | Create project |
| GET | `/api/projects/:id` | All | Get project by ID |
| PUT | `/api/projects/:id/members` | Admin | Add member to project |
| DELETE | `/api/projects/:id` | Admin | Delete project |

### Tasks
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/tasks` | All | Get tasks (admin: all, member: own) |
| POST | `/api/tasks` | Admin | Create task |
| PUT | `/api/tasks/:id/status` | All | Update task status |
| DELETE | `/api/tasks/:id` | Admin | Delete task |
| GET | `/api/tasks/users` | All | Get users for assignment |
| GET | `/api/tasks/overdue` | All | Get overdue tasks |

---
## ⚙️ Local Setup

### Prerequisites
- Node.js v18+
- MongoDB Atlas account

### Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in `/backend`:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

```bash
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

---
## 👤 Test Credentials

You can register directly on the live app. Select **Admin** role to access full features, or **Member** to test restricted access.

---

## 📌 Roles & Permissions

| Feature | Admin | Member |
|---------|-------|--------|
| Create Project | ✅ | ❌ |
| Delete Project | ✅ | ❌ |
| Add Member to Project | ✅ | ❌ |
| Create Task | ✅ | ❌ |
| Assign Task | ✅ | ❌ |
| Delete Task | ✅ | ❌ |
| Update Task Status | ✅ | ✅ |
| View Dashboard | ✅ | ✅ |
| View Overdue Tasks | ✅ | ✅ (own only) |

---

## 👩‍💻 Developer

**Jiya Singh**
- GitHub: [@jiya-singhThakur](https://github.com/jiya-singhThakur)
