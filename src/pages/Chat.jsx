import { useState, useRef, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";

import ChatSidebar from "../components/ChatSidebar";
import PersonaSelector from "../components/PersonaSelector";
import ModelSelector from "../components/ModelSelector";
import VoiceRecorder from "../components/VoiceRecorder";
import MessageBubble from "../components/MessageBubble";

import { useMemory } from "../context/MemoryContext";
import { usePersona } from "../context/PersonaContext";

export default function Chat() {
  const { dict, lang } = useLanguage();
  const { user } = useAuth();
  const { memory, setMemory } = useMemory();

  // --- Guest Mode ---
  const isGuest = !user || user.plan === "guest";
  const guestLimit = 10;

  const [guestMessages, setGuestMessages] = useState(() => {
    if (!isGuest) return [];
    const saved = localStorage.getItem("ashkanai_guest_chat");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    if (isGuest) {
      localStorage.setItem(
        "ashkanai_guest_chat",
        JSON.stringify(guestMessages)
      );
    }
  }, [guestMessages]);

  // --- Logged-in Chat System ---
  const [chats, setChats] = useState(() => {
    if (isGuest) return [];
    const saved = localStorage.getItem("ashkanai_chats");
    return saved ? JSON.parse(saved) : [];
  });

  const [activeChat, setActiveChat] = useState(() => {
    if (isGuest) return "guest";
    return chats[0]?.id || null;
  });

  const [input, setInput] = useState("");
  const [persona, setPersona] = useState("assistant");
  const [model, setModel] = useState("gpt4");

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [guestMessages, chats]);

  // Memory extraction
  useEffect(() => {
    if (input.toLowerCase().includes("my name is")) {
      const name = input.split("is")[1]?.trim();
      if (name) setMemory({ ...memory, name });
    }
  }, [input]);

  // -----------------------------------
  // SEND MESSAGE (Guest + Logged-in)
  // -----------------------------------
  const sendMessage = () => {
    if (!input.trim()) return;

    // ---------------- Guest Mode Limit ----------------
    if (isGuest) {
      const userCount = guestMessages.filter(m => m.from === "user").length;

      if (userCount >= guestLimit) {
        setGuestMessages(prev => [
          ...prev,
          { from: "ai", text: dict.guest_limit }
        ]);
        return;
      }

      const userMsg = { from: "user", text: input };
      setGuestMessages(prev => [...prev, userMsg]);
      setInput("");

      // Upgrade prompt every 3 messages
      if ((userCount + 1) % 3 === 0) {
        setGuestMessages(prev => [
          ...prev,
          { from: "ai", text: dict.upgrade_prompt }
        ]);
      }

      // Fake AI response
      setTimeout(() => {
        setGuestMessages(prev => [
          ...prev,
          { from: "ai", text: dict.chat_ai_response }
        ]);
      }, 400);

      return;
    }

    // ---------------- Logged-in Mode ----------------
    const chat = chats.find(c => c.id === activeChat);
    if (!chat) return;

    const limit = user.planDetails.maxMessages;
    if (limit !== Infinity && chat.messages.length >= limit) {
      updateChat([...chat.messages, { from: "ai", text: dict.limit_reached }]);
      return;
    }

    const userMsg = { from: "user", text: input };
    const loading = { from: "ai", text: "..." };

    updateChat([...chat.messages, userMsg, loading]);
    setInput("");

    setTimeout(() => {
      let full = `${dict.chat_ai_response} (${persona}, ${model})`;
      let index = 0;

      const typer = setInterval(() => {
        index++;
        updateChat([
          ...chat.messages,
          userMsg,
          { from: "ai", text: full.slice(0, index) }
        ]);

        if (index >= full.length) clearInterval(typer);
      }, 20);
    }, 400);
  };

  const updateChat = msgs => {
    setChats(prev =>
      prev.map(c => (c.id === activeChat ? { ...c, messages: msgs } : c))
    );
  };

  const renderMessages = () => {
    if (isGuest) {
      return guestMessages.map((msg, i) => (
        <MessageBubble key={i} msg={msg} lang={lang} dict={dict} />
      ));
    }

    const chat = chats.find(c => c.id === activeChat);
    if (!chat) return null;

    return chat.messages.map((msg, i) => (
      <MessageBubble key={i} msg={msg} lang={lang} dict={dict} />
    ));
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {!isGuest && (
        <ChatSidebar
          chats={chats}
          setChats={setChats}
          activeChat={activeChat}
          setActiveChat={setActiveChat}
        />
      )}

      <div
        className="flex-grow-1 p-4"
        style={{ direction: lang === "fa" ? "rtl" : "ltr" }}
      >
        <h2 className="fw-bold mb-3">
          {dict.chat_title} {isGuest && "(Guest Mode)"}
        </h2>

        {isGuest && (
          <div className="alert alert-info">
            {dict.remaining_messages}:{" "}
            {guestLimit -
              guestMessages.filter(m => m.from === "user").length}
          </div>
        )}

        {!isGuest && (
          <>
            <PersonaSelector persona={persona} setPersona={setPersona} />
            <ModelSelector model={model} setModel={setModel} />
          </>
        )}

        <div
          className="border rounded-4 shadow-sm p-3 mb-3"
          style={{ height: "60vh", overflowY: "auto", background: "#fafafa" }}
        >
          {renderMessages()}
          <div ref={chatEndRef}></div>
        </div>

        <div className="input-group">
          <VoiceRecorder setInput={setInput} />
          <input
            className="form-control"
            placeholder={dict.chat_placeholder}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && sendMessage()}
          />
          <button className="btn btn-primary px-4" onClick={sendMessage}>
            {dict.chat_send}
          </button>
        </div>
      </div>
    </div>
  );
}
