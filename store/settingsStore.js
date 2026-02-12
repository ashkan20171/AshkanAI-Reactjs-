import { create } from "zustand";

const KEY = "ashkan_ai_settings_v1";

const defaults = {
  fontSize: 15,      // px
  density: "comfort", // comfort | compact
  glass: 0.06,       // 0..0.2 background opacity
};

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? { ...defaults, ...JSON.parse(raw) } : defaults;
  } catch {
    return defaults;
  }
}

export const useSettingsStore = create((set, get) => ({
  ...load(),
  setFontSize(fontSize) {
    set({ fontSize });
    localStorage.setItem(KEY, JSON.stringify({ ...get(), fontSize }));
  },
  setDensity(density) {
    set({ density });
    localStorage.setItem(KEY, JSON.stringify({ ...get(), density }));
  },
  setGlass(glass) {
    set({ glass });
    localStorage.setItem(KEY, JSON.stringify({ ...get(), glass }));
  },
  reset() {
    set({ ...defaults });
    localStorage.setItem(KEY, JSON.stringify(defaults));
  },
}));
