import { createContext, useContext, useState, useEffect } from "react";
import defaultPersonas from "../data/defaultPersonas";

// ایجاد کانتکست
const PersonaContext = createContext();

export function PersonaProvider({ children }) {
  // لیست پرسوناها
  const [personas, setPersonas] = useState(() => {
    const saved = localStorage.getItem("ashkanai_personas");
    return saved ? JSON.parse(saved) : defaultPersonas;
  });

  // پرسونا فعال
  const [activePersona, setActivePersona] = useState(() => {
    return localStorage.getItem("ashkanai_active_persona") || "assistant";
  });

  // ذخیره لیست پرسوناها
  useEffect(() => {
    localStorage.setItem("ashkanai_personas", JSON.stringify(personas));
  }, [personas]);

  // ذخیره پرسونا فعال
  useEffect(() => {
    localStorage.setItem("ashkanai_active_persona", activePersona);
  }, [activePersona]);

  // افزودن پرسونا جدید
  const addPersona = (persona) => {
    setPersonas((prev) => [...prev, persona]);
  };

  // حذف پرسونا
  const deletePersona = (id) => {
    setPersonas((prev) => prev.filter((p) => p.id !== id));

    // اگر پرسونا حذف‌شده فعلاً فعال بود → برگرد به assistant
    if (activePersona === id) {
      setActivePersona("assistant");
    }
  };

  return (
    <PersonaContext.Provider
      value={{
        personas,
        addPersona,
        deletePersona,
        activePersona,
        setActivePersona,
      }}
    >
      {children}
    </PersonaContext.Provider>
  );
}

// استفاده از کانتکست
export const usePersona = () => useContext(PersonaContext);
