import { useState } from "react";
import ChatMessage from "../components/ChatMessage";
import AIInputBox from "../components/AIInputBox";
import { useEffect, useRef } from "react";
import Sidebar from "../components/Sidebar";
import { mockAI } from "../services/ai";
import AIModeSelector from "../components/AIModeSelector";

export default function Chat() {
  const [messages, setMessages] = useState([]);
const chatEndRef = useRef(null);
const [mode, setMode] = useState("smart");
<AIModeSelector mode={mode} setMode={setMode} />


useEffect(() => {
  chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
}, [messages]);
  // Fake AI reply until backend is ready
  const generateAIReply = (userText) => {
  return mockAI(userText, mode);
};


  const handleSend = (text) => {
    const userMsg = { sender: "user", text };
    setMessages((prev) => [...prev, userMsg]);

    setTimeout(() => {
      const aiMsg = { sender: "ai", text: generateAIReply(text) };
      setMessages((prev) => [...prev, aiMsg]);
    }, 600);
  };

  return (
    <div className="container mt-4" style={{ maxWidth: 900 }}>
      <h3 className="fw-bold mb-4 text-center">چت با AshkanAI 🤖</h3>

      <div
        className="border rounded-4 p-3 mb-3 bg-white"
        style={{ height: "65vh", overflowY: "auto" }}
      >
        {messages.length === 0 && (
          <p className="text-center text-muted mt-5">
            گفت‌وگو را شروع کنید…
          </p>
        )}

        {messages.map((msg, index) => (
          <ChatMessage key={index} sender={msg.sender} text={msg.text} />
        ))}
        <div ref={chatEndRef}></div>
      </div>
return (
  <div className="d-flex">
    <Sidebar />

    <div className="flex-grow-1 container mt-4" style={{ maxWidth: 900 }}>
      ...
    </div>
  </div>
);
      <AIInputBox onSend={handleSend} />
    </div>
  );
}
