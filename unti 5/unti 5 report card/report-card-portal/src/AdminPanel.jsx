import { useState } from "react";
import { calcSGPA } from "./data.js";

const DEPTS = ["CSE", "ECE", "MECH", "CIVIL", "IT", "AIDS"];

export default function AdminPanel({ students, setStudents }) {
  const [view, setView] = useState("list"); // list | edit | add
  const [editStudent, setEditStudent] = useState(null);
  const [search, setSearch] = useState("");

  function deleteStudent(id) {
    if (!confirm("Delete this student?")) return;
    setStudents((prev) => prev.filter((s) => s.id !== id));
  }

  function saveStudent(updated) {
    setStudents((prev) => {
      const exists = prev.find((s) => s.id === updated.id);
      if (exists) return prev.map((s) => (s.id === updated.id ? updated : s));
      return [...prev, updated];
    });
    setView("list");
  }

  const filtered = students.filter(
    (s) => s.name.toLowerCase().includes(search.toLowerCase()) || s.id.toLowerCase().includes(search.toLowerCase())
  );

  if (view === "edit" || view === "add") {
    return <StudentEditor student={editStudent} onSave={saveStudent} onCancel={() => setView("list")} isNew={view === "add"} existingIds={students.map((s) => s.id)} />;
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
        <h2 style={{ margin: 0, color: "#e94560" }}>⚙ Admin Panel</h2>
        <div style={{ display: "flex", gap: 10 }}>
          <input placeholder="Search student..." value={search} onChange={(e) => setSearch(e.target.value)} style={inputSm} />
          <button onClick={() => { setEditStudent({ id: "", name: "", department: "CSE", semesters: {} }); setView("add"); }} style={btnPrimary}>
            + Add Student
          </button>
        </div>
      </div>

      <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "rgba(233,69,96,0.15)" }}>
              <th style={th}>Reg No</th>
              <th style={{ ...th, textAlign: "left" }}>Name</th>
              <th style={th}>Dept</th>
              <th style={th}>Semesters</th>
              <th style={th}>CGPA</th>
              <th style={th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((s) => {
              const allGrades = Object.values(s.semesters).flatMap((sem) => sem.map((x) => x.grade));
              const cgpa = allGrades.length ? (allGrades.reduce((a, b) => a + b, 0) / allGrades.length).toFixed(2) : "-";
              return (
                <tr key={s.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ ...td, fontFamily: "monospace", color: "#aaa" }}>{s.id}</td>
                  <td style={{ ...td, textAlign: "left", fontWeight: 600 }}>{s.name}</td>
                  <td style={td}><span style={deptBadge(s.department)}>{s.department}</span></td>
                  <td style={td}>{Object.keys(s.semesters).length}</td>
                  <td style={{ ...td, fontWeight: 700, color: "#e94560" }}>{cgpa}</td>
                  <td style={td}>
                    <button onClick={() => { setEditStudent(JSON.parse(JSON.stringify(s))); setView("edit"); }} style={btnEdit}>Edit</button>
                    <button onClick={() => deleteStudent(s.id)} style={btnDel}>Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && <div style={{ padding: 32, textAlign: "center", color: "#666" }}>No students found.</div>}
      </div>
      <div style={{ marginTop: 12, color: "#666", fontSize: 12 }}>Total: {students.length} students</div>
    </div>
  );
}

function StudentEditor({ student, onSave, onCancel, isNew, existingIds }) {
  const [data, setData] = useState(student);
  const [activeSem, setActiveSem] = useState(Object.keys(student.semesters)[0] || null);
  const [newSem, setNewSem] = useState("");

  function setField(key, val) {
    setData((prev) => ({ ...prev, [key]: val }));
  }

  function addSemester() {
    const n = parseInt(newSem);
    if (!n || n < 1 || n > 8) return alert("Enter a semester between 1-8");
    if (data.semesters[n]) return alert("Semester already exists");
    const updated = { ...data, semesters: { ...data.semesters, [n]: [{ name: "Subject 1", grade: 8.0 }] } };
    setData(updated);
    setActiveSem(String(n));
    setNewSem("");
  }

  function removeSemester(s) {
    if (!confirm(`Remove Semester ${s}?`)) return;
    const sems = { ...data.semesters };
    delete sems[s];
    setData({ ...data, semesters: sems });
    setActiveSem(Object.keys(sems)[0] || null);
  }

  function updateSubjectName(si, val) {
    const sems = { ...data.semesters };
    sems[activeSem] = sems[activeSem].map((sub, i) => i === si ? { ...sub, name: val } : sub);
    setData({ ...data, semesters: sems });
  }

  function updateSubjectGrade(si, val) {
    const g = Math.min(10, Math.max(0, parseFloat(val) || 0));
    const sems = { ...data.semesters };
    sems[activeSem] = sems[activeSem].map((sub, i) => i === si ? { ...sub, grade: g } : sub);
    setData({ ...data, semesters: sems });
  }

  function addSubject() {
    const sems = { ...data.semesters };
    sems[activeSem] = [...(sems[activeSem] || []), { name: "New Subject", grade: 8.0 }];
    setData({ ...data, semesters: sems });
  }

  function removeSubject(si) {
    const sems = { ...data.semesters };
    sems[activeSem] = sems[activeSem].filter((_, i) => i !== si);
    setData({ ...data, semesters: sems });
  }

  function handleSave() {
    if (!data.id.trim()) return alert("Reg No is required");
    if (!data.name.trim()) return alert("Name is required");
    if (isNew && existingIds.includes(data.id)) return alert("Registration number already exists!");
    onSave(data);
  }

  const semKeys = Object.keys(data.semesters).sort((a, b) => a - b);
  const currentSubs = activeSem ? (data.semesters[activeSem] || []) : [];
  const sgpa = calcSGPA(currentSubs);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
        <h2 style={{ margin: 0, color: "#e94560" }}>{isNew ? "➕ Add Student" : "✏ Edit Student"}</h2>
        <button onClick={onCancel} style={btnGhost}>← Cancel</button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 20 }}>
        <div>
          <label style={labelStyle}>Registration No</label>
          <input value={data.id} onChange={(e) => setField("id", e.target.value)} disabled={!isNew} style={{ ...inputSm, width: "100%", opacity: isNew ? 1 : 0.6 }} />
        </div>
        <div>
          <label style={labelStyle}>Full Name</label>
          <input value={data.name} onChange={(e) => setField("name", e.target.value)} style={{ ...inputSm, width: "100%" }} />
        </div>
        <div>
          <label style={labelStyle}>Department</label>
          <select value={data.department} onChange={(e) => setField("department", e.target.value)} style={{ ...inputSm, width: "100%", cursor: "pointer" }}>
            {DEPTS.map((d) => <option key={d} value={d} style={{ background: "#1a1a2e" }}>{d}</option>)}
          </select>
        </div>
      </div>

      {/* Semester Tabs */}
      <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: 20, marginBottom: 16, border: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16, alignItems: "center" }}>
          <span style={{ color: "#aaa", fontSize: 13 }}>Semesters:</span>
          {semKeys.map((s) => (
            <div key={s} style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <button onClick={() => setActiveSem(s)} style={{ padding: "6px 14px", borderRadius: 8, border: "none", cursor: "pointer", background: activeSem === s ? "#e94560" : "rgba(255,255,255,0.1)", color: "#fff", fontWeight: 600, fontSize: 12 }}>
                Sem {s}
              </button>
              <button onClick={() => removeSemester(s)} title="Remove semester" style={{ background: "rgba(233,69,96,0.2)", border: "none", color: "#e94560", borderRadius: 4, cursor: "pointer", padding: "2px 6px", fontSize: 11 }}>✕</button>
            </div>
          ))}
          <div style={{ display: "flex", gap: 6, marginLeft: 8 }}>
            <input type="number" min={1} max={8} value={newSem} onChange={(e) => setNewSem(e.target.value)} placeholder="1-8" style={{ ...inputSm, width: 60 }} />
            <button onClick={addSemester} style={btnPrimary}>+ Add</button>
          </div>
        </div>

        {activeSem && (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <span style={{ fontWeight: 600 }}>Semester {activeSem} Subjects <span style={{ color: "#aaa", fontSize: 13 }}>(SGPA: {sgpa})</span></span>
              <button onClick={addSubject} style={btnPrimary}>+ Add Subject</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {currentSubs.map((sub, i) => (
                <div key={i} style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <input value={sub.name} onChange={(e) => updateSubjectName(i, e.target.value)} style={{ ...inputSm, flex: 1 }} />
                  <input type="number" step="0.1" min={0} max={10} value={sub.grade} onChange={(e) => updateSubjectGrade(i, e.target.value)} style={{ ...inputSm, width: 80 }} />
                  <button onClick={() => removeSubject(i)} style={btnDel}>✕</button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <div style={{ display: "flex", gap: 12 }}>
        <button onClick={handleSave} style={btnPrimary}>💾 Save Student</button>
        <button onClick={onCancel} style={btnGhost}>Cancel</button>
      </div>
    </div>
  );
}

const deptColors = { CSE: "#3498db", ECE: "#2ecc71", MECH: "#e67e22", CIVIL: "#9b59b6", IT: "#1abc9c", AIDS: "#e74c3c" };
function deptBadge(dept) {
  const c = deptColors[dept] || "#888";
  return { background: c + "22", color: c, borderRadius: 6, padding: "3px 10px", fontSize: 12, fontWeight: 700 };
}

const th = { padding: "12px 16px", fontWeight: 600, fontSize: 12, color: "#ccc", textTransform: "uppercase", letterSpacing: 0.5, textAlign: "center" };
const td = { padding: "12px 16px", fontSize: 14, textAlign: "center" };
const inputSm = { padding: "9px 12px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.07)", color: "#fff", fontSize: 13, outline: "none", boxSizing: "border-box" };
const btnPrimary = { padding: "9px 18px", borderRadius: 8, border: "none", background: "#e94560", color: "#fff", fontWeight: 600, fontSize: 13, cursor: "pointer" };
const btnEdit = { padding: "6px 14px", borderRadius: 6, border: "none", background: "rgba(52,152,219,0.2)", color: "#3498db", fontWeight: 600, fontSize: 12, cursor: "pointer", marginRight: 6 };
const btnDel = { padding: "6px 14px", borderRadius: 6, border: "none", background: "rgba(233,69,96,0.2)", color: "#e94560", fontWeight: 600, fontSize: 12, cursor: "pointer" };
const btnGhost = { padding: "9px 18px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.2)", background: "transparent", color: "#fff", fontWeight: 600, fontSize: 13, cursor: "pointer" };
const labelStyle = { display: "block", marginBottom: 5, fontSize: 12, color: "#aaa" };
