import { createContext, useContext, useEffect, useState } from "react";
import plans from "../pages/Plans";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // کاربر مهمان
  const guestUser = {
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
    localStorage.setItem("ashkanai_user", JSON.stringify(guestUser));
    setUser(guestUser);
  };

  // افزودن planDetails به یوزر
  const enhanceUser = (userObj) => {
    if (!userObj) return null;

    return {
      ...userObj,
      planDetails: plans[userObj.plan] || plans.free
    };
  };

  // لود کاربر از localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("ashkanai_user");
    if (savedUser) {
      setUser(enhanceUser(JSON.parse(savedUser)));
    }
  }, []);

  // ثبت‌نام
  const register = (info) => {
    const users = JSON.parse(localStorage.getItem("ashkanai_users")) || [];

    // پیش‌فرض کاربر جدید Free است
    const newUser = { ...info, plan: "free" };

    users.push(newUser);

    localStorage.setItem("ashkanai_users", JSON.stringify(users));
    localStorage.setItem("ashkanai_user", JSON.stringify(newUser));

    setUser(enhanceUser(newUser));
  };

  // لاگین
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

  // خروج
  const logout = () => {
    localStorage.removeItem("ashkanai_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        register,
        login,
        logout,
        continueAsGuest,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
