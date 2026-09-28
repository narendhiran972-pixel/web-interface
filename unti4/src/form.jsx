import React, { useState, useEffect } from "react";

function App() {
  // Form data
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  // Error messages
  const [errors, setErrors] = useState({});

  // Check whether user submitted
  const [submitted, setSubmitted] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Form validation
  useEffect(() => {
    const newErrors = {};

    if (form.name.trim() === "") {
      newErrors.name = "Please fill this field";
    }

    if (form.email.trim() === "") {
      newErrors.email = "Please fill this field";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (form.password === "") {
      newErrors.password = "Please fill this field";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
  }, [form]);

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmitted(true);

    if (Object.keys(errors).length === 0) {
      alert("Form Submitted Successfully!");
    }
  };

  // Clear all
  const handleClear = () => {
    setForm({
      name: "",
      email: "",
      password: ""
    });

    setErrors({});
    setSubmitted(false);
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2>Registration Form</h2>

        {/* Name */}
        <div style={styles.group}>
          <label>Name</label>

          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={form.name}
            onChange={handleChange}
            style={styles.input}
          />

          {submitted && errors.name && (
            <p style={styles.error}>{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div style={styles.group}>
          <label>Email </label>

          <input
            type="text"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            style={styles.input}
          />

          {submitted && errors.email && (
            <p style={styles.error}>{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div style={styles.group}>
          <label>Password</label>

          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            style={styles.input}
          />

          {submitted && errors.password && (
            <p style={styles.error}>{errors.password}</p>
          )}
        </div>

        {/* Buttons */}
        <div style={styles.buttons}>
          <button type="submit" style={styles.submit}>
            Submit
          </button>

          <button
            type="button"
            onClick={handleClear}
            style={styles.clear}
          >
            Clear All
          </button>
        </div>
      </form>
    </div>
  );
}

// Styles
const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f4f4"
  },

  form: {
    width: "400px",
    padding: "30px",
    backgroundColor: "white",
    borderRadius: "10px",
    boxShadow: "0 5px 20px rgba(0,0,0,0.15)"
  },

  group: {
    marginBottom: "18px"
  },

  input: {
    width: "100%",
    padding: "10px",
    marginTop: "6px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    boxSizing: "border-box"
  },

  error: {
    color: "red",
    fontSize: "14px",
    margin: "5px 0 0"
  },

  buttons: {
    display: "flex",
    gap: "10px",
    marginTop: "20px"
  },

  submit: {
    flex: 1,
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "green",
    color: "white",
    cursor: "pointer"
  },

  clear: {
    flex: 1,
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "gray",
    color: "white",
    cursor: "pointer"
  }
};

export default App;