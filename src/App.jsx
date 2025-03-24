import React, { useState } from "react";
import "./App.css";

const Calculator = () => {
  const [input, setInput] = useState("0");
  const [formula, setFormula] = useState("");

  const operators = ["+", "-", "*", "/"];

  const handleClick = (value) => {
    if (value === "clear") {
      setInput("0");
      setFormula("");
      return;
    }

    if (value === "=") {
      try {
        const result = eval(formula);
        setInput(result.toString());
        setFormula(result.toString());
      } catch {
        setInput("Error");
        setFormula("");
      }
      return;
    }

    if (operators.includes(value)) {
      if (operators.includes(formula.slice(-1))) {
        setFormula((prev) => prev.slice(0, -1) + value);
      } else {
        setFormula((prev) => prev + value);
      }
      setInput(value);
      return;
    }

    if (value === ".") {
      if (input.includes(".")) return;
    }

    if (input === "0" && value !== ".") {
      setInput(value);
      setFormula(value);
    } else {
      setInput((prev) => prev + value);
      setFormula((prev) => prev + value);
    }
  };

  return (
    <div className="calculator">
      <div id="display">{input}</div>
      <div className="buttons">
        <button id="clear" onClick={() => handleClick("clear")}>AC</button>
        <button id="divide" onClick={() => handleClick("/")}>/</button>
        <button id="multiply" onClick={() => handleClick("")}></button>
        <button id="seven" onClick={() => handleClick("7")}>7</button>
        <button id="eight" onClick={() => handleClick("8")}>8</button>
        <button id="nine" onClick={() => handleClick("9")}>9</button>
        <button id="subtract" onClick={() => handleClick("-")}>-</button>
        <button id="four" onClick={() => handleClick("4")}>4</button>
        <button id="five" onClick={() => handleClick("5")}>5</button>
        <button id="six" onClick={() => handleClick("6")}>6</button>
        <button id="add" onClick={() => handleClick("+")}>+</button>
        <button id="one" onClick={() => handleClick("1")}>1</button>
        <button id="two" onClick={() => handleClick("2")}>2</button>
        <button id="three" onClick={() => handleClick("3")}>3</button>
        <button id="zero" onClick={() => handleClick("0")}>0</button>
        <button id="decimal" onClick={() => handleClick(".")}>.</button>
        <button id="equals" onClick={() => handleClick("=")}>=</button>
      </div>
    </div>
  );
};

export default Calculator;