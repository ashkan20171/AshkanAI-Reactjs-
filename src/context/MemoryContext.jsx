import { createContext, useContext, useState, useEffect } from "react";

const MemoryContext = createContext();

export function MemoryProvider({ children }) {
  const [memory, setMemory] = useState(() => {
    const saved = localStorage.getItem("ashkanai_memory");
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem("ashkanai_memory", JSON.stringify(memory));
  }, [memory]);

  return (
    <MemoryContext.Provider value={{ memory, setMemory }}>
      {children}
    </MemoryContext.Provider>
  );
}

export const useMemory = () => useContext(MemoryContext);
