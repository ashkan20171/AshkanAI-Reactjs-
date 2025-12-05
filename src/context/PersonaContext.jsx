import { createContext, useContext, useState, useEffect } from "react";
import defaultPersonas from "../data/defaultPersonas";

const PersonaContext = createContext();

export function PersonaProvider({ children }) {
  const [personas, setPersonas] = useState(() => {
    const saved = localStorage.getItem("ashkanai_personas");
    return saved ? JSON.parse(saved) : defaultPersonas;
  });

  useEffect(() => {
    localStorage.setItem("ashkanai_personas", JSON.stringify(personas));
  }, [personas]);

  const addPersona = (persona) => {
    setPersonas((prev) => [...prev, persona]);
  };

  const deletePersona = (id) => {
    setPersonas((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <PersonaContext.Provider value={{ personas, addPersona, deletePersona }}>
      {children}
    </PersonaContext.Provider>
  );
}

export const usePersona = () => useContext(PersonaContext);
