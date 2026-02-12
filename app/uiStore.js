import { create } from "zustand";

const savedMode = localStorage.getItem("mode") || "dark";
const savedLang = localStorage.getItem("lang") || "fa";

export const useUiStore = create((set, get) => ({
  mode: savedMode, // dark | light
  lang: savedLang, // fa | en
  setMode(mode) {
    localStorage.setItem("mode", mode);
    set({ mode });
  },
  setLang(lang) {
    localStorage.setItem("lang", lang);
    set({ lang });
  },
  direction() {
    return get().lang === "fa" ? "rtl" : "ltr";
  },
}));
