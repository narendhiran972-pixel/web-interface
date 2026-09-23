import React, { useState } from "react";

function App() {
  const [students, setStudents] = useState([
    { id: 1, name: "Priya", attendance: "Present" },
    { id: 2, name: "Dharshini", attendance: "Absent" },
    { id: 3, name: "Sona", attendance: "Present" },
    { id: 4, name: "Taqiya", attendance: "Absent" },
    { id: 5, name: "Nikilesh", attendance: "Present" },
    { id: 6, name: "Aravinth", attendance: "Present" },
    { id: 7, name: "Sadhana", attendance: "Absent" },
    { id: 8, name: "Sakthi", attendance: "Present" },
    { id: 9, name: "mani", attendance: "Absent" },
    { id: 10, name: "girija", attendance: "Present" },
    { id: 11, name: "dhansuh", attendance: "Absent" },
     { id: 12, name: "sathya", attendance: "Present" },
     { id: 13, name: "sathish", attendance: "Absent" },
     { id: 14, name: "reyaa", attendance: "Present" },
     { id: 15, name: "suriya", attendance: "Absent" },
     { id: 16, name: "praveen", attendance: "Present" },
     { id: 17, name: "kishore", attendance: "Absent" },
     { id: 18, name: "yeju", attendance: "Present" },
     { id: 19, name: "vengat", attendance: "Absent" },
     { id: 20, name: "depak", attendance: "Present" },
  ]);

  const markAttendance = (id, status) => {
    setStudents(
      students.map((student) =>
        student.id === id
          ? { ...student, attendance: status }
          : student
      )
    );
  };

  const presentCount = students.filter(
    (student) => student.attendance === "Present"
  ).length;

  const absentCount = students.filter(
    (student) => student.attendance === "Absent"
  ).length;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f6f8",
        padding: "40px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          margin: "auto",
          background: "white",
          padding: "30px",
          borderRadius: "15px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
        }}
      >
        <h1 style={{ textAlign: "center", color: "#222" }}>
          Student Attendance Tracker
        </h1>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            margin: "30px 0",
          }}
        >
          <div
            style={{
              padding: "20px 40px",
              background: "#d4edda",
              borderRadius: "10px",
              textAlign: "center",
            }}
          >
            <h2 style={{ margin: 0 }}>{presentCount}</h2>
            <p style={{ margin: "5px 0" }}>Present</p>
          </div>

          <div
            style={{
              padding: "20px 40px",
              background: "#f8d7da",
              borderRadius: "10px",
              textAlign: "center",
            }}
          >
            <h2 style={{ margin: 0 }}>{absentCount}</h2>
            <p style={{ margin: "5px 0" }}>Absent</p>
          </div>
        </div>

        <h2>Student List</h2>

        {students.map((student) => (
          <div
            key={student.id}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "15px",
              margin: "10px 0",
              border: "1px solid #ddd",
              borderRadius: "10px",
            }}
          >
            <strong>
              {student.id}. {student.name}
            </strong>

            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => markAttendance(student.id, "Present")}
                style={{
                  padding: "8px 15px",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  background:
                    student.attendance === "Present"
                      ? "#28a745"
                      : "#e9ecef",
                  color:
                    student.attendance === "Present" ? "white" : "black",
                }}
              >
                Present
              </button>

              <button
                onClick={() => markAttendance(student.id, "Absent")}
                style={{
                  padding: "8px 15px",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  background:
                    student.attendance === "Absent"
                      ? "#dc3545"
                      : "#e9ecef",
                  color:
                    student.attendance === "Absent" ? "white" : "black",
                }}
              >
                Absent
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;