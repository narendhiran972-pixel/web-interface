import { useState, useEffect } from "react";
import { SEED_STUDENTS } from "./data.js";
import Login from "./Login.jsx";
import ReportCard from "./ReportCard.jsx";
import AdminPanel from "./AdminPanel.jsx";

const STORAGE_KEY = "rc_students";
const ADMIN_PASSWORD = "admin123";

function getStudents() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return null;
}

function saveStudents(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export default function App() {
  const [students, setStudents] = useState(() => {
    const stored = getStudents();
    if (stored) return stored;
    saveStudents(SEED_STUDENTS);
    return SEED_STUDENTS;
  });

  const [page, setPage] = useState("home"); // home | report | admin
  const [currentStudent, setCurrentStudent] = useState(null);
  const [currentSem, setCurrentSem] = useState(1);
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);

  useEffect(() => {
    saveStudents(students);
  }, [students]);

  function handleStudentLookup(regNo, sem) {
    const student = students.find((s) => s.id.toLowerCase() === regNo.toLowerCase());
    if (!student) return alert("❌ Student not found! Check the registration number.");
    if (!student.semesters[sem]) return alert(`❌ No data for Semester ${sem}.`);
    setCurrentStudent(student);
    setCurrentSem(Number(sem));
    setPage("report");
  }

  function handleAdminLogin(pwd) {
    if (pwd === ADMIN_PASSWORD) {
      setAdminLoggedIn(true);
      setPage("admin");
    } else {
      alert("❌ Wrong password!");
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg,#1a1a2e,#16213e,#0f3460)", color: "#eee", fontFamily: "Segoe UI,sans-serif" }}>
      <header style={{ background: "rgba(255,255,255,0.05)", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", backdropFilter: "blur(10px)", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }} onClick={() => setPage("home")}>
          <span style={{ fontSize: 28 }}>🎓</span>
          <div>
            <div style={{ fontWeight: 700, fontSize: 18, color: "#e94560" }}>UniReport Portal</div>
            <div style={{ fontSize: 11, color: "#aaa" }}>College Semester Report Card</div>
          </div>
        </div>
        <nav style={{ display: "flex", gap: 12 }}>
          <button onClick={() => setPage("home")} style={navBtn(page === "home")}>Home</button>
          {page === "report" && <button onClick={() => setPage("report")} style={navBtn(true)}>Report Card</button>}
          <button onClick={() => adminLoggedIn ? setPage("admin") : setPage("adminLogin")} style={navBtn(page === "admin" || page === "adminLogin")}>
            {adminLoggedIn ? "⚙ Admin" : "🔒 Admin"}
          </button>
          {adminLoggedIn && <button onClick={() => { setAdminLoggedIn(false); setPage("home"); }} style={{ ...navBtn(false), background: "#e94560" }}>Logout</button>}
        </nav>
      </header>

      <main style={{ padding: "32px 16px", maxWidth: 960, margin: "0 auto" }}>
        {page === "home" && <Login onLookup={handleStudentLookup} />}
        {page === "report" && currentStudent && (
          <ReportCard student={currentStudent} sem={currentSem} onBack={() => setPage("home")} />
        )}
        {page === "adminLogin" && (
          <AdminLogin onLogin={handleAdminLogin} />
        )}
        {page === "admin" && adminLoggedIn && (
          <AdminPanel students={students} setStudents={setStudents} />
        )}
      </main>
    </div>
  );
}

function navBtn(active) {
  return {
    padding: "8px 18px", borderRadius: 8, border: "none", cursor: "pointer",
    background: active ? "#e94560" : "rgba(255,255,255,0.1)",
    color: "#fff", fontWeight: 600, fontSize: 13, transition: "all 0.2s",
  };
}

function AdminLogin({ onLogin }) {
  const [pwd, setPwd] = useState("");
  return (
    <div style={{ maxWidth: 380, margin: "80px auto", background: "rgba(255,255,255,0.07)", borderRadius: 16, padding: 32, boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}>
      <h2 style={{ textAlign: "center", color: "#e94560", marginBottom: 24 }}>🔒 Admin Login</h2>
      <input
        type="password" placeholder="Enter admin password"
        value={pwd} onChange={(e) => setPwd(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onLogin(pwd)}
        style={inputStyle}
      />
      <button onClick={() => onLogin(pwd)} style={btnStyle}>Login</button>
    </div>
  );
}

const inputStyle = { width: "100%", padding: "12px 14px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.08)", color: "#fff", fontSize: 14, marginBottom: 14, boxSizing: "border-box" };
const btnStyle = { width: "100%", padding: "12px", borderRadius: 8, border: "none", background: "#e94560", color: "#fff", fontWeight: 700, fontSize: 15, cursor: "pointer" };
