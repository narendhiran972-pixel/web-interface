// Seed data - 10 students with Tamil names, 4 departments, 4 semesters each

const subjects = {
  CSE: {
    1: ["Engineering Mathematics I", "Physics", "C Programming", "Engineering Graphics", "English"],
    2: ["Engineering Mathematics II", "Chemistry", "Data Structures", "Digital Electronics", "Communication Skills"],
    3: ["Discrete Mathematics", "Computer Organization", "OOP with Java", "Database Management", "Operating Systems"],
    4: ["Design & Analysis of Algorithms", "Computer Networks", "Software Engineering", "Web Technology", "Elective I"],
  },
  ECE: {
    1: ["Engineering Mathematics I", "Physics", "Basic Electronics", "Engineering Graphics", "English"],
    2: ["Engineering Mathematics II", "Circuit Theory", "Electronic Devices", "Digital Systems", "Communication Skills"],
    3: ["Signals & Systems", "Analog Circuits", "Digital Communication", "Microprocessors", "Electromagnetics"],
    4: ["VLSI Design", "Wireless Communication", "Embedded Systems", "DSP", "Elective I"],
  },
  MECH: {
    1: ["Engineering Mathematics I", "Physics", "Engineering Drawing", "Workshop Practice", "English"],
    2: ["Engineering Mathematics II", "Chemistry", "Mechanics of Solids", "Thermodynamics", "Communication Skills"],
    3: ["Fluid Mechanics", "Manufacturing Processes", "Theory of Machines", "Material Science", "Metrology"],
    4: ["Heat Transfer", "Design of Machine Elements", "CAD/CAM", "Industrial Engineering", "Elective I"],
  },
  CIVIL: {
    1: ["Engineering Mathematics I", "Physics", "Engineering Drawing", "Building Materials", "English"],
    2: ["Engineering Mathematics II", "Chemistry", "Structural Analysis", "Fluid Mechanics", "Communication Skills"],
    3: ["Concrete Technology", "Soil Mechanics", "Surveying", "Transportation Engineering", "Environmental Engg"],
    4: ["Design of Structures", "Foundation Engineering", "Irrigation Engineering", "Estimation & Costing", "Elective I"],
  },
};

function calcSGPA(subjects) {
  if (!subjects || subjects.length === 0) return 0;
  const total = subjects.reduce((sum, s) => sum + s.grade, 0);
  return (total / subjects.length).toFixed(2);
}

function calcCGPA(semesters) {
  const allGrades = Object.values(semesters).flatMap((sem) => sem.map((s) => s.grade));
  if (allGrades.length === 0) return 0;
  return (allGrades.reduce((a, b) => a + b, 0) / allGrades.length).toFixed(2);
}

function genSubjects(dept, sem) {
  return subjects[dept][sem].map((name) => ({
    name,
    grade: parseFloat((Math.random() * 3 + 7).toFixed(1)), // 7.0 - 10.0
  }));
}

export const SEED_STUDENTS = [
  {
    id: "2021CS001",
    name: "Arjun Murugan",
    department: "CSE",
    semesters: {
      1: genSubjects("CSE", 1),
      2: genSubjects("CSE", 2),
      3: genSubjects("CSE", 3),
      4: genSubjects("CSE", 4),
    },
  },
  {
    id: "2021CS002",
    name: "Kavitha Rajan",
    department: "CSE",
    semesters: {
      1: genSubjects("CSE", 1),
      2: genSubjects("CSE", 2),
      3: genSubjects("CSE", 3),
      4: genSubjects("CSE", 4),
    },
  },
  {
    id: "2021EC001",
    name: "Priya Sundaram",
    department: "ECE",
    semesters: {
      1: genSubjects("ECE", 1),
      2: genSubjects("ECE", 2),
      3: genSubjects("ECE", 3),
      4: genSubjects("ECE", 4),
    },
  },
  {
    id: "2021EC002",
    name: "Karthik Selvam",
    department: "ECE",
    semesters: {
      1: genSubjects("ECE", 1),
      2: genSubjects("ECE", 2),
      3: genSubjects("ECE", 3),
      4: genSubjects("ECE", 4),
    },
  },
  {
    id: "2021ME001",
    name: "Deepa Natarajan",
    department: "MECH",
    semesters: {
      1: genSubjects("MECH", 1),
      2: genSubjects("MECH", 2),
      3: genSubjects("MECH", 3),
      4: genSubjects("MECH", 4),
    },
  },
  {
    id: "2021ME002",
    name: "Surya Krishnan",
    department: "MECH",
    semesters: {
      1: genSubjects("MECH", 1),
      2: genSubjects("MECH", 2),
      3: genSubjects("MECH", 3),
      4: genSubjects("MECH", 4),
    },
  },
  {
    id: "2021CV001",
    name: "Anitha Subramanian",
    department: "CIVIL",
    semesters: {
      1: genSubjects("CIVIL", 1),
      2: genSubjects("CIVIL", 2),
      3: genSubjects("CIVIL", 3),
      4: genSubjects("CIVIL", 4),
    },
  },
  {
    id: "2021CV002",
    name: "Manikandan Pillai",
    department: "CIVIL",
    semesters: {
      1: genSubjects("CIVIL", 1),
      2: genSubjects("CIVIL", 2),
      3: genSubjects("CIVIL", 3),
      4: genSubjects("CIVIL", 4),
    },
  },
  {
    id: "2021CS003",
    name: "Nithya Balakrishnan",
    department: "CSE",
    semesters: {
      1: genSubjects("CSE", 1),
      2: genSubjects("CSE", 2),
      3: genSubjects("CSE", 3),
      4: genSubjects("CSE", 4),
    },
  },
  {
    id: "2021EC003",
    name: "Vignesh Chandran",
    department: "ECE",
    semesters: {
      1: genSubjects("ECE", 1),
      2: genSubjects("ECE", 2),
      3: genSubjects("ECE", 3),
      4: genSubjects("ECE", 4),
    },
  },
];

export { calcSGPA, calcCGPA };
