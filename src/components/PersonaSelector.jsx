import React from "react";

export default function PersonaSelector({
  personas,
  activePersona,
  setActivePersona,
}) {
  return (
    <div className="mb-3 d-flex gap-2 flex-wrap">
      {personas.map((p) => (
        <button
          key={p.id}
          className={`btn ${
            activePersona === p.id ? "btn-primary" : "btn-outline-secondary"
          }`}
          onClick={() => setActivePersona(p.id)}
        >
          {p.icon} {p.name}
        </button>
      ))}
    </div>
  );
}
