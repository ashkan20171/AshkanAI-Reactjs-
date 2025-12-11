import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import PlansPage from "./pages/Plans";


const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route 
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route 
            path="/chat"
            element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            }
          />

          <Route 
            path="/plans"
           element={
            <ProtectedRoute>
              <PlansPage />
               </ProtectedRoute>
                 }
                 />
<Router>
  <Sidebar />    {/* ⇐ این را اضافه کن */}
  <Navbar />
  <Routes>...</Routes>
</Router>


          <Route path="*" element={<Login />} />

        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
