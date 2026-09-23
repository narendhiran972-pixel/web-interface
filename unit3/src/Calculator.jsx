import { useState } from "react";

function Calculator() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [operator, setOperator] = useState("");
  const [result, setResult] = useState("");

  const calculate = () => {
    let answer;

    if (operator === "+") {
      answer = Number(num1) + Number(num2);
    } else if (operator === "-") {
      answer = Number(num1) - Number(num2);
    } else if (operator === "*") {
      answer = Number(num1) * Number(num2);
    } else if (operator === "/") {
      answer = Number(num1) / Number(num2);
    }

    setResult(answer);
  };

  const clear = () => {
    setNum1("");
    setNum2("");
    setOperator("");
    setResult("");
  };

  return (
    <div style={styles.container}>
      <div style={styles.calculator}>
        <h2>Simple Calculator</h2>

        <input
          type="number"
          placeholder="Enter first number"
          value={num1}
          onChange={(e) => setNum1(e.target.value)}
        />

        <select
          value={operator}
          onChange={(e) => setOperator(e.target.value)}
        >
          <option value="">Select operator</option>
          <option value="+">+</option>
          <option value="-">-</option>
          <option value="*">*</option>
          <option value="/">/</option>
        </select>

        <input
          type="number"
          placeholder="Enter second number"
          value={num2}
          onChange={(e) => setNum2(e.target.value)}
        />

        <button onClick={calculate}>Calculate</button>

        <button onClick={clear}>Clear</button>

        <h3>Result: {result}</h3>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f2f2f2",
  },

  calculator: {
    width: "300px",
    padding: "25px",
    backgroundColor: "white",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow: "0 0 10px #ccc",
  },

  input: {
    width: "100%",
  },
};

export default Calculator;