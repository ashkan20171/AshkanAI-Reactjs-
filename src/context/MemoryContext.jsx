import { createContext, useContext, useState, useEffect } from "react";

const MemoryContext = createContext();

export function MemoryProvider({ children }) {
  const [memory, setMemory] = useState(() => {
    const saved = localStorage.getItem("ashkanai_memory");
    return saved
      ? JSON.parse(saved)
      : {
          name: null,
          preferences: {},
          writingStyle: "normal",
          tone: "neutral",
          interests: [],
          lastTopics: [],
        };
  });

  useEffect(() => {
    localStorage.setItem("ashkanai_memory", JSON.stringify(memory));
  }, [memory]);

  // ثبت علاقه جدید
  const addInterest = (item) => {
    setMemory((prev) => ({
      ...prev,
      interests: [...new Set([...prev.interests, item])],
    }));
  };

  // ثبت آخرین موضوعات
  const pushTopic = (topic) => {
    setMemory((prev) => ({
      ...prev,
      lastTopics: [...prev.lastTopics.slice(-4), topic],
    }));
  };

  // تغییر لحن
  const setTone = (tone) => {
    setMemory((prev) => ({ ...prev, tone }));
  };

  // تغییر سبک نوشتن
  const setStyle = (writingStyle) => {
    setMemory((prev) => ({ ...prev, writingStyle }));
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
