import { createContext, useContext, useEffect, useState } from "react";
import plans from "../pages/Plans";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // تاریخچه چت‌ها (فقط عنوان‌ها)
  const [history, setHistory] = useState([]);

  // ===============================
  // 🔹 افزودن چت جدید به تاریخچه
  // ===============================
  const addToHistory = (title) => {
    const newEntry = { id: Date.now(), title };
    const updated = [...history, newEntry];

    setHistory(updated);
    localStorage.setItem("chat_titles", JSON.stringify(updated));
  };

  // ===============================
  // 🔹 افزودن اطلاعات پلن به کاربر
  // ===============================
  const enhanceUser = (u) => {
    if (!u) return null;

    return {
      ...u,
      planDetails: plans[u.plan] || plans.free,
    };
  };

  // ===============================
  // 🔹 کاربر مهمان
  // ===============================
  const guestUser = {
    plan: "guest",
    planDetails: plans.guest,
  };

  const continueAsGuest = () => {
    localStorage.setItem("ashkanai_user", JSON.stringify(guestUser));
    setUser(guestUser);
  };

  // ===============================
  // 🔹 لود اولیه کاربر + تاریخچه
  // ===============================
  useEffect(() => {
    const savedUser = localStorage.getItem("ashkanai_user");
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      setUser(enhanceUser(parsed));
    }

    const savedHistory = localStorage.getItem("chat_titles");
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  // ===============================
  // 🔹 ثبت‌نام
  // ===============================
  const register = (info) => {
    const users = JSON.parse(localStorage.getItem("ashkanai_users")) || [];

    const newUser = {
      ...info,
      plan: "free",
    };

    users.push(newUser);

    localStorage.setItem("ashkanai_users", JSON.stringify(users));
    localStorage.setItem("ashkanai_user", JSON.stringify(newUser));

    setUser(enhanceUser(newUser));
  };

  // ===============================
  // 🔹 ورود
  // ===============================
  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem("ashkanai_users")) || [];

    const found = users.find((u) => u.email === email && u.password === password);

    if (!found) return false;

    localStorage.setItem("ashkanai_user", JSON.stringify(found));
    setUser(enhanceUser(found));

    return true;
  };

  // ===============================
  // 🔹 خروج
  // ===============================
  const logout = () => {
    localStorage.removeItem("ashkanai_user");
    setUser(null);
  };

  // ===============================
  // 🔹 خروجی Provider
  // ===============================
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,

        register,
        login,
        logout,
        continueAsGuest,

        history,
        addToHistory,
        setHistory,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
