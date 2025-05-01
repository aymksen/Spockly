import React from "react";

export default function GenerateButton({ onClick, label = "", className = "" }) {
  return (
    <button onClick={onClick} className={`action-btn ${className}`}>
      {label}
    </button>
  );
}