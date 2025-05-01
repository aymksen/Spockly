// components/WebRRunner.js
import React, { useState, useEffect } from "react";
import { WebR } from "webr"; // Correct import

const webR = new WebR();

const WebRRunner = ({ code }) => {
  const [output, setOutput] = useState("Loading WebR...");

  // Initialize WebR only once when the component mounts
  useEffect(() => {
    (async () => {
      try {
        await webR.init({
          baseUrl: "https://unpkg.com/webr@latest/dist/"
        });
        // unregister any old service‐workers
        if ("serviceWorker" in navigator) {
          (await navigator.serviceWorker.getRegistrations())
            .forEach(r => r.unregister());
        }
        console.log("WebR initialized from webr@latest");
      } catch (err) {
        console.error("WebR init failed:", err);
        setOutput(`Error initializing WebR: ${err.message}`);
      }
    })();
  }, []);


  // Function to run R code
  const runCode = async () => {
    try {
      // Evaluate R code
      const result = await webR.evalR(code);

      // Get the result as an array or another format
      const values = await result.toArray();

      // Update the output state with the result
      setOutput(values.join("\n"));
    } catch (err) {
      // Handle errors gracefully
      setOutput(`Error: ${err.message}`);
      console.error("WebR Error:", err);
    }
  };

  return (
    <div style={{ marginTop: "1rem" }}>
      <button
        onClick={runCode}
        style={{
          marginBottom: "1rem",
          padding: "10px",
          cursor: "pointer",
          backgroundColor: "#28a745",
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
      >
        Run R Code
      </button>
      <div className="output-box">
       <strong>Output:</strong>
       <div>{output}</div>
     </div>
    </div>
  );
};

export default WebRRunner;
