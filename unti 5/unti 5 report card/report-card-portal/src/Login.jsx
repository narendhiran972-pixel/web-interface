import { useState } from "react";

export default function Login({ onLookup }) {
  const [regNo, setRegNo] = useState("");
  const [sem, setSem] = useState("1");

  return (
    <div style={{ maxWidth: 460, margin: "60px auto" }}>
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <div style={{ fontSize: 56 }}>🎓</div>
        <h1 style={{ margin: "8px 0 4px", color: "#e94560", fontSize: 28 }}>Report Card Portal</h1>
        <p style={{ color: "#aaa", margin: 0 }}>Enter your details to view your grades</p>
      </div>

      <div style={{ background: "rgba(255,255,255,0.07)", borderRadius: 16, padding: 32, boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}>
        <label style={labelStyle}>Registration Number</label>
        <input
          placeholder="e.g. 2021CS001"
          value={regNo}
          onChange={(e) => setRegNo(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onLookup(regNo, sem)}
          style={inputStyle}
        />

        <label style={labelStyle}>Select Semester</label>
        <select value={sem} onChange={(e) => setSem(e.target.value)} style={{ ...inputStyle, cursor: "pointer" }}>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
            <option key={s} value={s} style={{ background: "#1a1a2e" }}>Semester {s}</option>
          ))}
        </select>

        <button onClick={() => onLookup(regNo, sem)} style={btnStyle}>
          View Report Card →
        </button>

        <div style={{ marginTop: 20, padding: 12, background: "rgba(255,255,255,0.04)", borderRadius: 8, fontSize: 12, color: "#888", lineHeight: 1.7 }}>
          <b style={{ color: "#aaa" }}>Sample IDs:</b><br />
          2021CS001, 2021CS002, 2021CS003<br />
          2021EC001, 2021EC002, 2021EC003<br />
          2021ME001, 2021ME002<br />
          2021CV001, 2021CV002
        </div>
      </div>
    </div>
  );
}

const labelStyle = { display: "block", marginBottom: 6, fontSize: 13, color: "#ccc", fontWeight: 600 };
const inputStyle = { width: "100%", padding: "12px 14px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.08)", color: "#fff", fontSize: 14, marginBottom: 16, boxSizing: "border-box", outline: "none" };
const btnStyle = { width: "100%", padding: "13px", borderRadius: 8, border: "none", background: "linear-gradient(90deg,#e94560,#c0392b)", color: "#fff", fontWeight: 700, fontSize: 16, cursor: "pointer", letterSpacing: 0.5 };
