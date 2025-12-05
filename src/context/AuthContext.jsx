import { createContext, useContext, useEffect, useState } from "react";
import plans from "../pages/Plans"; // اگر اسم فایل plans.js است

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const isGuestUser = {
  plan: "guest",
  planDetails: {
    name: "Guest",
    maxMessages: 5,
    allowImageGen: false,
    allowCodeAssistant: false,
    allowTaskAgent: false
  }
};
const continueAsGuest = () => {
  setUser(isGuestUser);
};
  // اضافه کردن planDetails به کاربر
  const enhanceUser = (userObj) => {
    if (!userObj) return null;

    return {
      ...userObj,
      planDetails: plans[userObj.plan] || plans.free
    };
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("ashkanai_user");
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      setUser(enhanceUser(parsed));
    }
  }, []);

  const register = (info) => {
    const users = JSON.parse(localStorage.getItem("ashkanai_users")) || [];

    // اگر پلن مشخص نکرده، پیش‌فرض free
    const newUser = { ...info, plan: "free" };

    users.push(newUser);

    localStorage.setItem("ashkanai_users", JSON.stringify(users));
    localStorage.setItem("ashkanai_user", JSON.stringify(newUser));

    setUser(enhanceUser(newUser));
  };

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem("ashkanai_users")) || [];

    const found = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!found) return false;

    localStorage.setItem("ashkanai_user", JSON.stringify(found));
    setUser(enhanceUser(found));

    return true;
  };

  const logout = () => {
    localStorage.removeItem("ashkanai_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
        <AuthContext.Provider value={{ user, register, login, logout, continueAsGuest }}></AuthContext.Provider>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
