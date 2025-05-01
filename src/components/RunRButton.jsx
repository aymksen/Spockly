// RunRButton.jsx
import React, { useEffect, useState } from "react";
import { WebR } from "webr";

const webR = new WebR();          // shared singleton

export default function RunRButton({ code, onOutput }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      await webR.init();          // one-time init
      setReady(true);
    })();
  }, []);

  const run = async () => {
    if (!ready) return;
    try {
      const res = await webR.evalR(code);
      const out = (await res.toArray()).join("\n");
      onOutput(out);
    } catch (e) {
      onOutput(`Error: ${e.message}`);
    }
  };

  return (
    <button className="action-btn run-btn" onClick={run} disabled={!ready}>
      {ready ? "Run R Code" : "Loading…"}
    </button>
  );
}
