import { createContext, useContext, useEffect, useState } from "react";
import plans from "../plans";

const enhancedUser = {
  ...user,
  planDetails: plans[user.plan]
};

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("ashkanai_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const register = (info) => {
    const users = JSON.parse(localStorage.getItem("ashkanai_users")) || [];
    users.push(info);
    localStorage.setItem("ashkanai_users", JSON.stringify(users));
    localStorage.setItem("ashkanai_user", JSON.stringify(info));
    setUser(info);
  };

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem("ashkanai_users")) || [];
    const found = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!found) return false;

    localStorage.setItem("ashkanai_user", JSON.stringify(found));
    setUser(found);
    return true;
  };

  const logout = () => {
    localStorage.removeItem("ashkanai_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
