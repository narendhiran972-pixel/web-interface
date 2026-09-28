import { calcSGPA, calcCGPA } from "./data.js";

function gradeColor(g) {
  if (g >= 9) return "#2ecc71";
  if (g >= 8) return "#3498db";
  if (g >= 7) return "#f39c12";
  return "#e74c3c";
}

function gradeLetter(g) {
  if (g >= 9) return "O";
  if (g >= 8) return "A+";
  if (g >= 7) return "A";
  if (g >= 6) return "B+";
  return "B";
}

export default function ReportCard({ student, sem, onBack }) {
  const semSubjects = student.semesters[sem] || [];
  const sgpa = calcSGPA(semSubjects);
  const cgpa = calcCGPA(student.semesters);

  return (
    <div style={{ maxWidth: 780, margin: "0 auto" }}>
      <button onClick={onBack} style={{ background: "rgba(255,255,255,0.1)", border: "none", color: "#fff", padding: "8px 16px", borderRadius: 8, cursor: "pointer", marginBottom: 20, fontSize: 13 }}>
        ← Back
      </button>

      {/* Header Card */}
      <div style={{ background: "linear-gradient(135deg,rgba(233,69,96,0.3),rgba(15,52,96,0.6))", borderRadius: 16, padding: 28, marginBottom: 20, border: "1px solid rgba(233,69,96,0.3)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <div>
            <div style={{ fontSize: 12, color: "#aaa", marginBottom: 4 }}>STUDENT NAME</div>
            <div style={{ fontSize: 24, fontWeight: 700 }}>{student.name}</div>
            <div style={{ color: "#aaa", marginTop: 6, fontSize: 13 }}>Reg No: <b style={{ color: "#fff" }}>{student.id}</b></div>
            <div style={{ color: "#aaa", fontSize: 13 }}>Department: <b style={{ color: "#fff" }}>{student.department}</b></div>
          </div>
          <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
            <GpaBox label="SGPA" value={sgpa} />
            <GpaBox label="CGPA" value={cgpa} highlight />
          </div>
        </div>
        <div style={{ marginTop: 16, display: "inline-block", background: "#e94560", borderRadius: 20, padding: "4px 16px", fontSize: 13, fontWeight: 600 }}>
          Semester {sem}
        </div>
      </div>

      {/* Subjects Table */}
      <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "rgba(233,69,96,0.2)" }}>
              <th style={th}>#</th>
              <th style={{ ...th, textAlign: "left" }}>Subject</th>
              <th style={th}>Grade Point</th>
              <th style={th}>Letter</th>
              <th style={th}>Performance</th>
            </tr>
          </thead>
          <tbody>
            {semSubjects.map((sub, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", transition: "background 0.2s" }}
                onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.04)"}
                onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
                <td style={{ ...td, color: "#aaa" }}>{i + 1}</td>
                <td style={{ ...td, textAlign: "left", fontWeight: 500 }}>{sub.name}</td>
                <td style={{ ...td, fontWeight: 700, color: gradeColor(sub.grade) }}>{sub.grade}</td>
                <td style={{ ...td }}>
                  <span style={{ background: gradeColor(sub.grade) + "33", color: gradeColor(sub.grade), borderRadius: 6, padding: "3px 10px", fontSize: 12, fontWeight: 700 }}>
                    {gradeLetter(sub.grade)}
                  </span>
                </td>
                <td style={td}>
                  <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: 20, height: 8, width: 120, margin: "0 auto" }}>
                    <div style={{ width: `${(sub.grade / 10) * 100}%`, height: "100%", borderRadius: 20, background: gradeColor(sub.grade) }} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* SGPA Summary */}
      <div style={{ marginTop: 16, background: "rgba(255,255,255,0.05)", borderRadius: 12, padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", border: "1px solid rgba(255,255,255,0.08)" }}>
        <span style={{ color: "#aaa", fontSize: 14 }}>Semester Grade Point Average (SGPA)</span>
        <span style={{ fontSize: 24, fontWeight: 700, color: gradeColor(parseFloat(sgpa)) }}>{sgpa}</span>
      </div>

      {/* All Semesters Summary */}
      <div style={{ marginTop: 16, background: "rgba(255,255,255,0.05)", borderRadius: 12, padding: 20, border: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ fontWeight: 600, marginBottom: 14, color: "#ccc" }}>All Semesters Overview</div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {Object.entries(student.semesters).map(([s, subs]) => {
            const sp = calcSGPA(subs);
            return (
              <div key={s} style={{ background: Number(s) === sem ? "rgba(233,69,96,0.3)" : "rgba(255,255,255,0.07)", border: Number(s) === sem ? "1px solid #e94560" : "1px solid transparent", borderRadius: 10, padding: "10px 18px", textAlign: "center", minWidth: 80 }}>
                <div style={{ fontSize: 11, color: "#aaa" }}>SEM {s}</div>
                <div style={{ fontWeight: 700, fontSize: 18, color: gradeColor(parseFloat(sp)) }}>{sp}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function GpaBox({ label, value, highlight }) {
  return (
    <div style={{ background: highlight ? "rgba(233,69,96,0.2)" : "rgba(255,255,255,0.07)", borderRadius: 12, padding: "14px 20px", textAlign: "center", border: highlight ? "1px solid #e94560" : "1px solid rgba(255,255,255,0.1)" }}>
      <div style={{ fontSize: 11, color: "#aaa", marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 26, fontWeight: 800, color: highlight ? "#e94560" : "#fff" }}>{value}</div>
    </div>
  );
}

const th = { padding: "12px 16px", fontWeight: 600, fontSize: 12, color: "#ccc", textTransform: "uppercase", letterSpacing: 0.5, textAlign: "center" };
const td = { padding: "14px 16px", fontSize: 14, textAlign: "center" };
