import { createContext, useContext, useState, useEffect } from "react";

const MemoryContext = createContext();

export function MemoryProvider({ children }) {
  const [memory, setMemory] = useState(() => {
    const saved = localStorage.getItem("ashkanai_memory");
    return saved
      ? JSON.parse(saved)
      : {
          name: "",
          interests: [],
          tone: "neutral",
          writingStyle: "normal",
          topics: [],
        };
  });

  useEffect(() => {
    localStorage.setItem("ashkanai_memory", JSON.stringify(memory));
  }, [memory]);

  const addInterest = (i) => {
    setMemory((prev) => ({
      ...prev,
      interests: [...prev.interests, i],
    }));
  };

  const pushTopic = (t) => {
    setMemory((prev) => ({
      ...prev,
      topics: [...prev.topics.slice(-10), t], // آخرین ۱۰ موضوع
    }));
  };

  const setTone = (tone) => {
    setMemory((prev) => ({ ...prev, tone }));
  };

  const setStyle = (style) => {
    setMemory((prev) => ({ ...prev, writingStyle: style }));
  };

  return (
    <MemoryContext.Provider
      value={{ memory, setMemory, addInterest, pushTopic, setTone, setStyle }}
    >
      {children}
    </MemoryContext.Provider>
  );
}

export const useMemory = () => useContext(MemoryContext);
