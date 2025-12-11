import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import ReactMarkdown from "react-markdown";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import Tesseract from "tesseract.js";

import botAvatar from "../assets/bot.png";
import userAvatar from "../assets/user.png";

import { askGroq } from "../services/aiService";
import { generateImage } from "../services/imageService";
import { codeAssistantTask } from "../services/codeService";
import { taskAgent } from "../services/taskAgentService";
import Sidebar from "../components/Sidebar";

export default function Chat() {
  const { user, addToHistory } = useAuth();

  // STATES
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [mode, setMode] = useState("balanced");
  const [typing, setTyping] = useState(false);
  const [fileData, setFileData] = useState(null);
  const messagesEndRef = useRef(null);

  // If user not logged in
  if (!user) return <div className="login-warning">لطفاً وارد شوید…</div>;

  // PLAN LIMITS
  const plan = user.planDetails;
  const remaining =
    plan.maxMessages === Infinity
      ? Infinity
      : plan.maxMessages - messages.filter((m) => m.sender === "user").length;

  // LOAD CHAT
  useEffect(() => {
    const saved = localStorage.getItem("chat_history");
    if (saved) setMessages(JSON.parse(saved));
  }, []);

  // SAVE CHAT
  useEffect(() => {
    localStorage.setItem("chat_history", JSON.stringify(messages));
  }, [messages]);

  // AUTO SCROLL + PRISM
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    Prism.highlightAll();
  }, [messages]);

  // SPEECH
  const speak = (text) => {
    const msg = new SpeechSynthesisUtterance(text);
    msg.lang = "fa-IR";
    speechSynthesis.speak(msg);
  };

  // VOICE INPUT
  const startVoice = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("مرورگر شما ورودی صوتی را پشتیبانی نمی‌کند.");
      return;
    }
    const rec = new window.webkitSpeechRecognition();
    rec.lang = "fa-IR";
    rec.start();
    rec.onresult = (e) => setInput(e.results[0][0].transcript);
  };

  // FILE OCR
  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileData({ name: file.name, type: file.type, loading: true });

    if (file.type.startsWith("image/")) {
      const text = await Tesseract.recognize(file, "eng").then((r) => r.data.text);
      setFileData({ name: file.name, type: file.type, content: text, loading: false });
      setInput(text);
    } else {
      const reader = new FileReader();
      reader.onload = () =>
        setFileData({ name: file.name, type: file.type, content: reader.result, loading: false });
      reader.readAsText(file);

      setInput("متن فایل بارگذاری شد.");
    }
  };

  // SEND MESSAGE (Groq)
  const sendMessage = async () => {
    if (!input.trim()) return;
    if (remaining <= 0) return;

    const userMsg = { id: Date.now(), text: input, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);
    addToHistory(userMsg.text.substring(0, 20));

    const finalInput = input;
    setInput("");
    setTyping(true);

    const aiMessages = [
      ...messages.map((m) => ({
        role: m.sender === "user" ? "user" : "assistant",
        content: m.text,
      })),
      { role: "user", content: finalInput },
    ];

    const reply = await askGroq(aiMessages, mode);

    setMessages((prev) => [
      ...prev,
      { id: Date.now() + 1, text: reply, sender: "bot" },
    ]);

    setTyping(false);
  };

  // IMAGE GENERATOR
  const makeImage = async () => {
    if (!input.trim()) return;

    if (!plan.allowImageGen) {
      alert("این قابلیت مخصوص پلن‌های بالاتر است.");
      return;
    }

    const prompt = input;
    setInput("");

    setMessages((prev) => [
      ...prev,
      { id: Date.now(), text: `در حال ساخت تصویر برای:\n${prompt}`, sender: "bot" },
    ]);

    setTyping(true);
    try {
      const url = await generateImage(prompt);
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, text: `![image](${url})`, sender: "bot" },
      ]);
    } catch {
      setMessages((prev) => [...prev, { id: Date.now(), text: "خطا در ساخت تصویر", sender: "bot" }]);
    }
    setTyping(false);
  };

  // CODE ASSISTANT
  const askCodeAssistant = async () => {
    if (!input.trim()) return;

    if (!plan.allowCodeAssistant) {
      alert("این قابلیت مخصوص پلن‌های بالاتر است.");
      return;
    }

    const prompt = input;
    setInput("");

    setMessages((prev) => [
      ...prev,
      { id: Date.now(), text: "در حال پردازش کد شما…", sender: "bot" },
    ]);

    setTyping(true);
    try {
      const reply = await codeAssistantTask(prompt);
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, text: reply, sender: "bot" },
      ]);
    } catch {
      setMessages((prev) => [...prev, { id: Date.now(), text: "خطا در پردازش کد", sender: "bot" }]);
    }
    setTyping(false);
  };

  // TASK AGENT
  const askTaskAgent = async () => {
    if (!input.trim()) return;

    if (!plan.allowTaskAgent) {
      alert("این قابلیت مخصوص پلن‌های بالاتر است.");
      return;
    }

    const prompt = input;
    setInput("");

    setMessages((prev) => [
      ...prev,
      { id: Date.now(), text: "در حال تحلیل وظیفه…", sender: "bot" },
    ]);

    setTyping(true);
    try {
      const reply = await taskAgent(prompt);
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, text: reply, sender: "bot" },
      ]);
    } catch {
      setMessages((prev) => [...prev, { id: Date.now(), text: "خطا در تحلیل و ساخت تسک", sender: "bot" }]);
    }
    setTyping(false);
  };

  // ============================
  // RENDER UI
  // ============================
  return (
    <div className="chat-layout">

      {/* Sidebar */}
      <Sidebar
        onNewChat={() => setMessages([])}
        onSelectChat={() => {
          const saved = JSON.parse(localStorage.getItem("chat_history"));
          setMessages(saved || []);
        }}
      />

      {/* MAIN CHAT PANEL */}
      <div className="chat-main-pro">

        {/* MODES */}
        <div className="chat-mode-bar glass">
          <button className={mode === "creative" ? "active" : ""} onClick={() => setMode("creative")}>🎨 خلاقانه</button>
          <button className={mode === "balanced" ? "active" : ""} onClick={() => setMode("balanced")}>⚖️ استاندارد</button>
          <button className={mode === "precise" ? "active" : ""} onClick={() => setMode("precise")}>🎯 دقیق</button>
        </div>

        {/* MESSAGES */}
        <div className="messages-pro">
          {messages.map((msg) => (
            <div key={msg.id} className={`msg-pro ${msg.sender}`}>
              <img src={msg.sender === "user" ? userAvatar : botAvatar} className="msg-avatar" />
              <div className="msg-bubble">
                <ReactMarkdown>{msg.text}</ReactMarkdown>

                {msg.sender === "bot" && (
                  <button className="speak-btn" onClick={() => speak(msg.text)}>🔊</button>
                )}
              </div>
            </div>
          ))}

          {typing && (
            <div className="typing">
              AshkanAI در حال نوشتن است…
              <span className="dots"><span>.</span><span>.</span><span>.</span></span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* REMAINING */}
        {remaining !== Infinity && (
          <div className="remaining-pro">
            {remaining > 0 ? `پیام باقی‌مانده: ${remaining}` : "پیام تمام شده — ارتقا بده!"}
          </div>
        )}

        {/* FILE PREVIEW */}
        {fileData && (
          <div className="file-preview glass">
            <b>{fileData.name}</b>
            {fileData.loading ? <p>در حال پردازش…</p> : <pre>{fileData.content?.slice(0, 400)}</pre>}
          </div>
        )}

        {/* SUGGESTIONS */}
        <div className="prompt-suggestions">
          <button onClick={() => setInput("یک داستان کوتاه تعریف کن.")}>📝 داستان</button>
          <button onClick={() => setInput("یک عکس از یک قلعه فانتزی بساز.")}>🏰 ساخت تصویر</button>
          <button onClick={() => setInput("این متن را خلاصه کن:")}>📄 خلاصه ساز</button>
        </div>

        {/* INPUT AREA */}
        <div className="chat-input-pro-super glass">
          <button className="input-icon" onClick={startVoice}>🎤</button>

          <label className="input-icon">
            📁
            <input type="file" hidden onChange={handleFile} />
          </label>

          <input
            type="text"
            placeholder="پیامت را بنویس…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <button className="send-btn" onClick={sendMessage}>➤</button>
          <button className="send-btn" style={{ background: "#d958e5" }} onClick={makeImage}>🎨</button>
          <button className="send-btn" style={{ background: "#4c8bf5" }} onClick={askCodeAssistant}>💻</button>
          <button className="send-btn" style={{ background: "#ffaa00" }} onClick={askTaskAgent}>📌</button>
        </div>

      </div>
    </div>
  );
}
