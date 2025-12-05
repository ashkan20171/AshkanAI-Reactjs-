import { useState, useRef, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";

export default function Chat() {
  const { dict, lang } = useLanguage();
  const { user } = useAuth();

  const [messages, setMessages] = useState([
    { from: "ai", text: dict.chat_welcome },
  ]);
  const [input, setInput] = useState("");

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg = { from: "user", text: input };
    setMessages((m) => [...m, userMsg]);
    setInput("");

    // Fake AI response (replace with real API later)
    setTimeout(() => {
      const aiMsg = {
        from: "ai",
        text: dict.chat_ai_response,
      };
      setMessages((m) => [...m, aiMsg]);
    }, 600);
  };

  const handleKey = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div
      className="container py-4"
      style={{ direction: lang === "fa" ? "rtl" : "ltr" }}
    >
      <h2 className="fw-bold text-center mb-4">{dict.chat_title}</h2>

      {/* Chat box */}
      <div
        className="border rounded-4 shadow-sm p-3 mb-3"
        style={{
          height: "70vh",
          overflowY: "auto",
          background: "#fafafa",
        }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`d-flex mb-3 ${
              msg.from === "user"
                ? lang === "fa"
                  ? "justify-content-start"
                  : "justify-content-end"
                : "justify-content-start"
            }`}
          >
            <div
              className={`p-3 rounded-4 ${
                msg.from === "user"
                  ? "bg-primary text-white"
                  : "bg-white border"
              }`}
              style={{ maxWidth: "75%", lineHeight: "1.8" }}
            >
              {msg.text}
            </div>
          </div>
        ))}

        <div ref={chatEndRef}></div>
      </div>

      {/* Input */}
      <div className="input-group">
        <input
          className="form-control rounded-start-pill"
          placeholder={dict.chat_placeholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
        />
        <button
          className="btn btn-primary rounded-end-pill px-4"
          onClick={sendMessage}
        >
          {dict.chat_send}
        </button>
      </div>
    </div>
  );
}
