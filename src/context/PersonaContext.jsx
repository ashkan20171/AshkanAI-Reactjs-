import { createContext, useContext, useState, useEffect } from "react";
import defaultPersonas from "../data/defaultPersonas";

const PersonaContext = createContext();

export function PersonaProvider({ children }) {
  const [personas, setPersonas] = useState(() => {
    const saved = localStorage.getItem("ashkanai_personas");
    return saved ? JSON.parse(saved) : defaultPersonas;
  });

  const [activePersona, setActivePersona] = useState(() => {
    return localStorage.getItem("ashkanai_active_persona") || "assistant";
  });

  useEffect(() => {
    localStorage.setItem("ashkanai_personas", JSON.stringify(personas));
  }, [personas]);

  useEffect(() => {
    localStorage.setItem("ashkanai_active_persona", activePersona);
  }, [activePersona]);

  const addPersona = (p) => {
    setPersonas((prev) => [...prev, p]);
  };

  const deletePersona = (id) => {
    setPersonas((prev) => prev.filter((p) => p.id !== id));
    if (activePersona === id) setActivePersona("assistant");
  };

  return (
    <PersonaContext.Provider
      value={{ personas, addPersona, deletePersona, activePersona, setActivePersona }}
    >
      {children}
    </PersonaContext.Provider>
  );
}

export const usePersona = () => useContext(PersonaContext);
