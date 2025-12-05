import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

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
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Tools */}
        <Route path="/tools" element={<Tools />} />
        <Route path="/tools/summarizer" element={<Summarizer />} />
        <Route path="/tools/rewriter" element={<Rewriter />} />
        <Route path="/tools/translator" element={<Translator />} />
        <Route path="/tools/image" element={<ImageGenerator />} />
        <Route path="/tools/code" element={<CodingAssistant />} />
        <Route path="/tools/ideas" element={<IdeaGenerator />} />
        <Route path="/tools/agent" element={<TaskAgent />} />

        {/* Chat */}
        <Route path="/chat" element={<Chat />} />

        {/* Files */}
        <Route path="/files" element={<FileManager />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
