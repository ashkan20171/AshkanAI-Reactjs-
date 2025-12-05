// ✅ Chat.jsx (Final Clean Version)

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
import { detectPersona } from "../utils/autoPersonaDetector";
import { applyAffinityLayers } from "../utils/affinityMemoryEngine";
import { detectEmotion } from "../utils/emotionDetector";
import { applyEmotionLayer } from "../utils/emotionEngine";
import { extractContext, applyContextLayer } from "../utils/dynamicContextEngine";
import { selfReflect } from "../utils/reflectionEngine";
import { optimizeResponse } from "../utils/responseOptimizer";

export default function Chat() {
  const { dict, lang } = useLanguage();
  const { user } = useAuth();
  const { memory, setMemory, addInterest } = useMemory();

  const { personas, activePersona, setActivePersona } = usePersona();
  const persona = personas.find(p => p.id === activePersona);

  // -----------------------------
  // GUEST MODE
  // -----------------------------
  const isGuest = !user;
  const guestLimit = 10;

  const [guestMessages, setGuestMessages] = useState(() => {
    if (!isGuest) return [];
    const saved = localStorage.getItem("ashkanai_guest_chat");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    if (isGuest)
      localStorage.setItem("ashkanai_guest_chat", JSON.stringify(guestMessages));
  }, [guestMessages]);

  // -----------------------------
  // LOGGED-IN CHATS
  // -----------------------------
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

  // auto-scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [guestMessages, chats]);

  // -----------------------------
  // MEMORY EXTRACTION
  // -----------------------------
  useEffect(() => {
    const t = input.toLowerCase();

    if (t.includes("my name is")) {
      const name = input.split("is")[1]?.trim();
      if (name) setMemory(prev => ({ ...prev, name }));
    }

    if (t.includes("i like")) {
      const interest = input.split("i like")[1]?.trim();
      if (interest) addInterest(interest);
    }
  }, [input]);

  // -----------------------------
  // UPDATE CHAT FUNCTION
  // -----------------------------
  const updateChat = msgs => {
    setChats(prev => {
      const updated = prev.map(c =>
        c.id === activeChat ? { ...c, messages: msgs } : c
      );
      localStorage.setItem("ashkanai_chats", JSON.stringify(updated));
      return updated;
    });
  };

  // -----------------------------
  // SEND MESSAGE
  // -----------------------------
  const sendMessage = () => {
    if (!input.trim()) return;

    // Plugin commands
    if (input.startsWith("/")) {
      const [cmd, ...rest] = input.slice(1).split(" ");
      const text = rest.join(" ");

      if (plugins[cmd]) {
        const result = plugins[cmd](text);

        if (isGuest)
          setGuestMessages(m => [...m, { from: "ai", text: result }]);
        else {
          const c = chats.find(c => c.id === activeChat);
          updateChat([...c.messages, { from: "ai", text: result }]);
        }

        setInput("");
        return;
      }
    }

    // ---------------------------------------
    // GUEST MODE LOGIC
    // ---------------------------------------
    if (isGuest) {
      const count = guestMessages.filter(m => m.from === "user").length;

      if (count >= guestLimit) {
        setGuestMessages(p => [...p, { from: "ai", text: dict.guest_limit }]);
        return;
      }

      const newGuest = [...guestMessages, { from: "user", text: input }];
      setGuestMessages(newGuest);
      setInput("");

      setTimeout(() => {
        setGuestMessages(g => [
          ...g,
          { from: "ai", text: dict.chat_ai_response }
        ]);
      }, 300);

      return;
    }

    // ---------------------------------------
    // LOGGED-IN USER CHAT LOGIC
    // ---------------------------------------
    const chat = chats.find(c => c.id === activeChat);
    const userMsg = { from: "user", text: input };
    const baseMsgs = [...chat.messages, userMsg];

    updateChat(baseMsgs);
    setInput("");

    // Auto title
    if (chat.title === "New Chat") {
      const newTitle = generateTitle(input);
      setChats(prev =>
        prev.map(c => c.id === chat.id ? { ...c, title: newTitle } : c)
      );
    }

    // Auto persona switching
    const detected = detectPersona(input);
    if (detected && detected !== activePersona) {
      setActivePersona(detected);
      updateChat([...baseMsgs, { from: "system", text: `🔄 Persona changed to: ${detected}` }]);
    }

    // ---------------------------------------
    // AI RESPONSE PIPELINE
    // ---------------------------------------
    setTimeout(() => {
      let response = `${dict.chat_ai_response} (${model})`;

      // 1. Dynamic context
      const context = extractContext(baseMsgs, 6);
      response = applyContextLayer(response, context);

      // 2. Persona layer
      response = applyPersona(persona, response);

      // 3. Memory affinity
      response = applyAffinityLayers(response, memory);

      // 4. Emotion layer
      const emotion = detectEmotion(input);
      response = applyEmotionLayer(response, emotion);

      // 5. Self-reflection
      response = selfReflect(response, context);

      // 6. Optimizer
      response = optimizeResponse(response);

      // -------------------------
      // TYPING EFFECT
      // -------------------------
      let i = 0;
      const typer = setInterval(() => {
        i++;
        updateChat([...baseMsgs, { from: "ai", text: response.slice(0, i) }]);
        if (i >= response.length) clearInterval(typer);
      }, 18);
    }, 250);
  };

  // -----------------------------
  // RENDER MESSAGES
  // -----------------------------
  const renderMessages = () => {
    if (isGuest)
      return guestMessages.map((msg, i) => (
        <MessageBubble key={i} msg={msg} dict={dict} lang={lang} />
      ));

    const chat = chats.find(c => c.id === activeChat);
    return chat?.messages?.map((msg, i) => (
      <MessageBubble key={i} msg={msg} dict={dict} lang={lang} />
    ));
  };

  // -----------------------------
  // UI
  // -----------------------------
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

        <div className="border rounded-4 shadow-sm p-3 mb-3"
             style={{ height: "60vh", overflowY: "auto" }}>
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
