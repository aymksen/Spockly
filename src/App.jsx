import React, { useState, useRef } from "react";
import BlocklyComponent from "./components/BlocklyComponent";
import CodeDisplay from "./components/CodeDisplay";
import ThemeToggle from "./components/ThemeToggle";
import RLogo from "./assets/r-logo.png";
import "./index.css";

import GenerateButton from "./components/GenerateButton"; // ←— your existing button component
import RunRButton from "./components/RunRButton";

export default function App() {
  const [code, setCode] = useState("// drag blocks to generate code");
  const [rOut, setROut] = useState("");
  const [plotUrl, setPlotUrl] = useState(null);
  const blocklyRef        = useRef(null);
    /* click handlers */
  const genPython = () => blocklyRef.current?.generatePython();
  const genR      = () => blocklyRef.current?.generateR();
  return (
    <div className="shell">
      {/* ── TOP BAR ─────────────────────────────────────────── */}
      <header className="topbar glass">
        <h1 className="app-title">
         SPOCKLY
         <img src={RLogo} alt="R logo" className="r-logo" />
       </h1>
        <ThemeToggle />
      </header>

      {/* ── 60/40 GRID (no padding, stretches full height) ─── */}
      <div className="main-6040">
        {/* LEFT 60 % – Blockly workspace */}
        <div id="blocklyArea" className="blockly-holder">
          <BlocklyComponent ref={blocklyRef} setCode={setCode} />
        </div>

        {/* RIGHT 40 % – buttons, output, generated code */}
        <div className="io-holder">

  {/* — Generated Python Code — */}
  <h2>Generated Code</h2>
  <CodeDisplay code={code} />

  <GenerateButton
    label="Generate Python Code"
    onClick={genPython}
    className="full-width"
  />
  {/* — Runtime Output — */}
  <h2 style={{ marginTop: "2rem" }}>Output</h2>
  <div className="output-box">{rOut || "—"}</div>

  {/* bottom button row */}
  <div className="btn-row bottom">
    <GenerateButton label="Generate R Code"
                    onClick={genR} />
    <RunRButton
        code={code}
        onOutput={setROut}
        onPlot={setPlotUrl}        /* ← add this */
      />
  </div>
      {/* insert your plot image under the buttons */}
    {plotUrl && (
      <img
        src={plotUrl}
        alt="R plot"
        style={{
          maxWidth: "100%",
          marginTop: "1rem",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        }}
      />
    )}
</div>
      </div>
    </div>
  );
}
