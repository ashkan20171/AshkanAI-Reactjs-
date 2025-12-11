import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Chat = () => {
  const { user } = useAuth();

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  if (!user) {
    return (
      <div style={{ padding: "20px", color: "red" }}>
        لطفا وارد شوید یا به صورت مهمان ادامه دهید
      </div>
    );
  }

  const plan = user.planDetails;

  const handleSend = () => {
    if (!input.trim()) return;

    // محدودیت تعداد پیام بر اساس پلن
    if (messages.length >= plan.maxMessages && plan.maxMessages !== Infinity) {
      alert("به حداکثر تعداد پیام‌های مجاز پلن خود رسیده‌اید.");
      return;
    }

    const newMessage = {
      id: Date.now(),
      text: input,
      sender: "user",
    };

    setMessages([...messages, newMessage]);
    setInput("");
  };

  return (
    <div className="chat-container">

      {/* ابزارها */}
      <div className="tools-panel">
        <h3>ابزارها</h3>

        {/* Code Assistant */}
        {plan.allowCodeAssistant ? (
          <button className="tool-btn">🧑‍💻 Code Generator</button>
        ) : (
          <button className="tool-btn disabled">
            🔒 Code Generator (نیاز به ارتقا)
          </button>
        )}

        {/* Image Generator */}
        {plan.allowImageGen ? (
          <button className="tool-btn">🖼️ Image Generator</button>
        ) : (
          <button className="tool-btn disabled">
            🔒 Image Generator (نیاز به ارتقا)
          </button>
        )}

        {/* Task Agent */}
        {plan.allowTaskAgent ? (
          <button className="tool-btn">🤖 Task Agent</button>
        ) : (
          <button className="tool-btn disabled">
            🔒 Task Agent (نیاز به ارتقا)
          </button>
        )}

        {/* دکمه ارتقا پلن */}
        {(user.plan === "guest" || user.plan === "free") && (
          <button className="upgrade-btn">
            🚀 ارتقا به پلن حرفه‌ای
          </button>
        )}
      </div>

      {/* ناحیه چت */}
      <div className="chat-box">
        {messages.length === 0 && (
          <div className="empty">پیامی وجود ندارد...</div>
        )}

        {messages.map((msg) => (
          <div key={msg.id} className="message">
            {msg.text}
          </div>
        ))}
      </div>

      {/* ورودی پیام */}
      <div className="input-area">
        <input
          type="text"
          placeholder="پیام بنویس..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleSend}>ارسال</button>
      </div>

    </div>
  );
};

export default Chat;
