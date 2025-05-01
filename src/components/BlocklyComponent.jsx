// components/BlocklyComponent.jsx
import React, {
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import * as Blockly from "blockly";
import { pythonGenerator } from "blockly/python";

/* --- custom blocks / generators you already wrote ------------------ */
import "./blockly/customBlocks";
import "./blockly/customGenerator";
import "./blockly/rBlocks";
/*-------------------------------------------------------------------*/

const BlocklyComponent = forwardRef(function BlocklyComponent({ setCode }, ref) {
  const blocklyDiv   = useRef(null);
  const workspaceRef = useRef(null);

  /* ---------- initialise Blockly once ----------------------------- */
  useEffect(() => {
    if (!blocklyDiv.current) return;

    workspaceRef.current = Blockly.inject(blocklyDiv.current, {
      toolbox: `
        <xml>
          <category name="Examples" colour="#5C81A6">
            <block type="controls_if"></block>
            <block type="logic_compare"></block>
            <block type="math_number"></block>
            <block type="math_arithmetic"></block>
            <block type="text"></block>
            <block type="text_print"></block>
          </category>
          <category name="Custom Blocks" colour="#5C81A6">
            <block type="print_hello"></block>
            <block type="math_square"></block>
            <block type="text_greeting"></block>
            <block type="repeat_times"></block>
            <block type="dropdown_color"></block>
          </category>
          <category name="R-Example" colour="#5CA65C">
            <block type="create_vector"></block>
            <block type="plot_vector"></block>
            <block type="rnorm_block"></block>
          </category>
          <category name="Variables" colour="#A65E2E" custom="VARIABLE"></category>
        </xml>
      `,
    });

    return () => workspaceRef.current?.dispose();
  }, []);

  /* ---------- generator helpers ----------------------------------- */
  const generatePython = () => {
    const ws = workspaceRef.current;
    if (!ws) return;
    setCode(pythonGenerator.workspaceToCode(ws));
  };

  const generateR = () => {
    const ws = workspaceRef.current;
    if (!ws) return;
    setCode(Blockly.Generator.R.workspaceToCode(ws));
  };

  /* ---------- expose to parent via ref ----------------------------- */
  useImperativeHandle(ref, () => ({
    generatePython,
    generateR,
  }));

  /* ---------- render ---------------------------------------------- */
  return (
    <div
      ref={blocklyDiv}
      style={{ height: "100%", width: "100%" }}
    />
  );
});

export default BlocklyComponent;
