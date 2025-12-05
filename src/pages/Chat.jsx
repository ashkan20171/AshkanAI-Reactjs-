import { useState, useRef, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";
import { useMemory } from "../context/MemoryContext";
import { usePersona } from "../context/PersonaContext";

import ChatSidebar from "../components/ChatSidebar";
import PersonaSelector from "../components/PersonaSelector";
import ModelSelector from "../components/ModelSelector";
import VoiceRecorder from "../components/VoiceRecorder";
import MessageBubble from "../components/MessageBubble";

import { generateTitle } from "../utils/titleGenerator";
import { plugins } from "../utils/pluginEngine";
import { applyPersona } from "../utils/personaEngine";

export default function Chat() {
  const { dict, lang } = useLanguage();
  const { user } = useAuth();
  const { memory, setMemory } = useMemory();

  const { personas, activePersona, setActivePersona } = usePersona();
  const persona = personas.find(p => p.id === activePersona);

  const isGuest = !user;
  const guestLimit = 10;

  // Guest chat
  const [guestMessages, setGuestMessages] = useState(() => {
    if (!isGuest) return [];
    const saved = localStorage.getItem("ashkanai_guest_chat");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    if (isGuest)
      localStorage.setItem("ashkanai_guest_chat", JSON.stringify(guestMessages));
  }, [guestMessages]);

  // Logged-in chats
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
  const [model, setModel] = useState("gpt4");

  const chatEndRef = useRef(null);

  // Always scroll down
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [guestMessages, chats]);

  // Memory extraction
  useEffect(() => {
    const text = input.toLowerCase();

    if (text.includes("my name is")) {
      const name = input.split("is")[1]?.trim();
      if (name) setMemory(prev => ({ ...prev, name }));
    }
  }, [input]);

  // ---------------------------
  // Update chat messages
  // ---------------------------
  const updateChat = msgs => {
    setChats(prev =>
      prev.map(c =>
        c.id === activeChat ? { ...c, messages: msgs } : c
      )
    );

    localStorage.setItem("ashkanai_chats", JSON.stringify(chats));
  };

  // ---------------------------
  // File Upload
  // ---------------------------
  const sendImage = file => {
    const reader = new FileReader();
    reader.onload = () => {
      const imgMsg = { from: "user", type: "image", url: reader.result };

      if (isGuest) {
        setGuestMessages(p => [...p, imgMsg]);
      } else {
        const chat = chats.find(c => c.id === activeChat);
        updateChat([...chat.messages, imgMsg]);
      }
    };
    reader.readAsDataURL(file);
  };

  // ---------------------------
  // SEND MESSAGE
  // ---------------------------
  const sendMessage = () => {
    if (!input.trim()) return;

    // Smart commands
    if (input.startsWith("/")) {
      const [cmd, ...rest] = input.slice(1).split(" ");
      const text = rest.join(" ");

      if (plugins[cmd]) {
        runPlugin(cmd, text);
        setInput("");
        return;
      }
    }

    // Guest Mode
    if (isGuest) {
      const count = guestMessages.filter(m => m.from === "user").length;

      if (count >= guestLimit) {
        setGuestMessages(p => [...p, { from: "ai", text: dict.guest_limit }]);
        return;
      }

      setGuestMessages(p => [...p, { from: "user", text: input }]);
      setInput("");

      setTimeout(() => {
        setGuestMessages(p => [
          ...p,
          { from: "ai", text: dict.chat_ai_response }
        ]);
      }, 400);

      return;
    }

    // Logged-in mode
    const chat = chats.find(c => c.id === activeChat);
    if (!chat) return;

    const userMsg = { from: "user", text: input };
    const msgs = [...chat.messages, userMsg];

    updateChat(msgs);
    setInput("");

    // Auto-title
    if (chat.title === "New Chat") {
      const newTitle = generateTitle(input);
      setChats(prev =>
        prev.map(c =>
          c.id === chat.id ? { ...c, title: newTitle } : c
        )
      );
    }

    // Apply persona → memory → typing effect
    setTimeout(() => {
      let response = `${dict.chat_ai_response} (${model})`;
      response = applyPersona(persona, response);

      let i = 0;
      const typer = setInterval(() => {
        i++;
        updateChat([...msgs, { from: "ai", text: response.slice(0, i) }]);

        if (i >= response.length) clearInterval(typer);
      }, 20);
    }, 300);
  };

  // ---------------------------
  // Render messages
  // ---------------------------
  const renderMessages = () => {
    if (isGuest) {
      return guestMessages.map((msg, i) => (
        <MessageBubble key={i} msg={msg} dict={dict} lang={lang} />
      ));
    }

    const chat = chats.find(c => c.id === activeChat);
    if (!chat) return null;

    return chat.messages.map((msg, i) => (
      <MessageBubble key={i} msg={msg} dict={dict} lang={lang} />
    ));
  };

  // ---------------------------
  // UI
  // ---------------------------
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

      <div className="flex-grow-1 p-4">
        <h2 className="fw-bold mb-3">
          {dict.chat_title} {isGuest && "(Guest Mode)"}
        </h2>

        {!isGuest && (
          <>
            <PersonaSelector
              personas={personas}
              activePersona={activePersona}
              setActivePersona={setActivePersona}
            />

            <ModelSelector model={model} setModel={setModel} />
          </>
        )}

        <div className="border rounded-4 shadow-sm p-3 mb-3" style={{ height: "60vh", overflowY: "auto" }}>
          {renderMessages()}
          <div ref={chatEndRef}></div>
        </div>

        <div className="input-group gap-2">
          <VoiceRecorder setInput={setInput} />

          <input
            className="form-control"
            value={input}
            placeholder={dict.chat_placeholder}
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
