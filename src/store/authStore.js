import { create } from "zustand";

const defaultLimits = {
  guest: { messagesPerDay: 5, canImage: false, canAudio: false, canVideo: false },
  free:  { messagesPerDay: 20, canImage: false, canAudio: false, canVideo: false },
  pro:   { messagesPerDay: 200, canImage: true,  canAudio: true,  canVideo: false },
};

export const useAuthStore = create((set, get) => ({
  user: null, // { name, email, plan }
  plan: "guest", // guest | free | pro
  usage: { messagesToday: 0 },

  limits() {
    return defaultLimits[get().plan] ?? defaultLimits.guest;
  },

  // دمو: ورود فیک
  login({ name, email }) {
    set({ user: { name, email, plan: "free" }, plan: "free", usage: { messagesToday: 0 } });
  },

  logout() {
    set({ user: null, plan: "guest", usage: { messagesToday: 0 } });
  },

  // دمو: تغییر پلن (بعداً از پرداخت میاد)
  setPlan(plan) {
    const u = get().user;
    set({
      plan,
      user: u ? { ...u, plan } : null,
    });
  },

  canSendMessage() {
    const { messagesToday } = get().usage;
    const { messagesPerDay } = get().limits();
    return messagesToday < messagesPerDay;
  },

  incMessage() {
    set((s) => ({ usage: { ...s.usage, messagesToday: s.usage.messagesToday + 1 } }));
  },
}));
