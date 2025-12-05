import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Chat from "./pages/Chat";
import FileManager from "./pages/FileManager";
import Tools from "./pages/Tools";
import Summarizer from "./pages/tools/Summarizer";
import Rewriter from "./pages/tools/Rewriter";
import Translator from "./pages/tools/Translator";
import ImageGenerator from "./pages/tools/ImageGenerator";
import CodingAssistant from "./pages/tools/CodingAssistant";
import IdeaGenerator from "./pages/tools/IdeaGenerator";
import TaskAgent from "./pages/tools/TaskAgent";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Tools */}
        <Route
          path="/tools"
          element={
            <ProtectedRoute>
              <Tools />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tools/summarizer"
          element={
            <ProtectedRoute>
              <Summarizer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tools/rewriter"
          element={
            <ProtectedRoute>
              <Rewriter />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tools/translator"
          element={
            <ProtectedRoute>
              <Translator />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tools/image"
          element={
            <ProtectedRoute>
              <ImageGenerator />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tools/code"
          element={
            <ProtectedRoute>
              <CodingAssistant />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tools/ideas"
          element={
            <ProtectedRoute>
              <IdeaGenerator />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tools/agent"
          element={
            <ProtectedRoute>
              <TaskAgent />
            </ProtectedRoute>
          }
        />

        {/* Chat is Public (Guest Mode allowed) */}
        <Route path="/chat" element={<Chat />} />

        {/* Files */}
        <Route
          path="/files"
          element={
            <ProtectedRoute>
              <FileManager />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
