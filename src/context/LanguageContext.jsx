import { createContext, useContext, useEffect, useState } from "react";
import en from "../lang/en.json";
import fa from "../lang/fa.json";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("en");
  const [dict, setDict] = useState(en);

  useEffect(() => {
    const saved = localStorage.getItem("ashkanai_lang");
    if (saved) changeLang(saved);
  }, []);

  const changeLang = (l) => {
    setLang(l);
    localStorage.setItem("ashkanai_lang", l);
    setDict(l === "fa" ? fa : en);
    document.body.dir = l === "fa" ? "rtl" : "ltr";
  };

  return (
    <LanguageContext.Provider value={{ lang, dict, changeLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
