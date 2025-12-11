import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import botAvatar from "../assets/bot.png";
import userAvatar from "../assets/user.png";

const Chat = () => {
  const { user } = useAuth();

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  if (!user) {
    return (
      <div className="login-warning">
        لطفاً وارد شوید یا به صورت مهمان ادامه دهید
      </div>
    );
  }

  const plan = user.planDetails;
  const max = plan.maxMessages;
  const used = messages.length;
  const remaining = max === Infinity ? Infinity : max - used;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    if (remaining <= 0) return;

    const newMessage = {
      id: Date.now(),
      text: input,
      sender: "user",
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: "در حال پردازش درخواست شما...",
          sender: "bot",
        },
      ]);
    }, 500);
  };

  return (
    <div className="chat-main">

      {/* ابزارها */}
      <div className="tools-panel-pro">

        <h3>ابزارهای AI</h3>

        <div className="tool-items">

          {/* Code */}
          <div className={`tool-card ${!plan.allowCodeAssistant && "locked"}`}>
            <span>🧑‍💻</span>
            <p>Code Assistant</p>
            {!plan.allowCodeAssistant && <Link to="/plans">ارتقا</Link>}
          </div>

          {/* Image */}
          <div className={`tool-card ${!plan.allowImageGen && "locked"}`}>
            <span>🎨</span>
            <p>Image Generator</p>
            {!plan.allowImageGen && <Link to="/plans">ارتقا</Link>}
          </div>

          {/* Task Agent */}
          <div className={`tool-card ${!plan.allowTaskAgent && "locked"}`}>
            <span>🤖</span>
            <p>Task Agent</p>
            {!plan.allowTaskAgent && <Link to="/plans">ارتقا</Link>}
          </div>

        </div>

        {(user.plan === "guest" || user.plan === "free") && (
          <Link to="/plans" className="upgrade-main">
            🚀 ارتقا به برنامه حرفه‌ای
          </Link>
        )}

      </div>

      {/* باکس چت */}
      <div className="chat-box-pro">

        <div className="remaining-counter">
          {remaining === Infinity ? (
            <span>پیام‌ها: نامحدود</span>
          ) : remaining > 0 ? (
            <span>پیام‌های باقی‌مانده: {remaining}</span>
          ) : (
            <span className="finished">
              پیام‌های شما تمام شده! <Link to="/plans">ارتقا</Link>
            </span>
          )}
        </div>

        {/* پیام‌ها */}
        <div className="messages-area">
          {messages.map((msg) => (
            <div key={msg.id} className={`msg ${msg.sender}`}>
              <img
                src={msg.sender === "user" ? userAvatar : botAvatar}
                alt=""
              />
              <div className="bubble">{msg.text}</div>
            </div>
          ))}
          <div ref={messagesEndRef}></div>
        </div>

        {/* ورودی چت */}
        <div className="chat-input-pro">
          <input
            type="text"
            placeholder="پیام خود را بنویسید…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={remaining <= 0}
          />
          <button onClick={handleSend} disabled={remaining <= 0}>
            ➤
          </button>
        </div>

      </div>

    </div>
  );
};

export default Chat;
