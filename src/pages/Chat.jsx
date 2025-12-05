import { useState, useRef, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";

import ChatSidebar from "../components/ChatSidebar";
import PersonaSelector from "../components/PersonaSelector";
import ModelSelector from "../components/ModelSelector";
import VoiceRecorder from "../components/VoiceRecorder";
import MessageBubble from "../components/MessageBubble";

import { useMemory } from "../context/MemoryContext";
import { generateTitle } from "../utils/titleGenerator";
import { plugins } from "../utils/pluginEngine";

export default function Chat() {
  const { dict, lang } = useLanguage();
  const { user } = useAuth();
  const { memory, setMemory } = useMemory();

  // ------------- Guest Mode -------------
  const isGuest = !user;
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

  // ------------- Logged-in Chat Storage -------------
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

  // Scroll always
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [guestMessages, chats]);

  // Memory detection
  useEffect(() => {
    if (input.toLowerCase().includes("my name is")) {
      const name = input.split("is")[1]?.trim();
      if (name) setMemory({ ...memory, name });
    }
  }, [input]);

  // -----------------------------------
  // Update Logged-in Chat
  // -----------------------------------
  const updateChat = (msgs) => {
    setChats((prev) =>
      prev.map((c) =>
        c.id === activeChat ? { ...c, messages: msgs } : c
      )
    );
  };

  // -----------------------------------
  // Plugin executor
  // -----------------------------------
  const runPlugin = (type, text) => {
    if (isGuest) {
      setGuestMessages((prev) => [
        ...prev,
        { from: "ai", text: plugins[type](text) },
      ]);
      return;
    }

    const chat = chats.find((c) => c.id === activeChat);
    updateChat([
      ...chat.messages,
      { from: "ai", text: plugins[type](text) },
    ]);
  };

  // -----------------------------------
  // File upload + Image Upload
  // -----------------------------------
  const sendImage = (file) => {
    const reader = new FileReader();

    reader.onload = () => {
      const imgMsg = {
        from: "user",
        type: "image",
        url: reader.result,
      };

      if (isGuest) {
        setGuestMessages((p) => [...p, imgMsg]);
      } else {
        const chat = chats.find((c) => c.id === activeChat);
        updateChat([...chat.messages, imgMsg]);
      }

      fakeImageAI();
    };

    reader.readAsDataURL(file);
  };

  const fakeImageAI = () => {
    const response = {
      from: "ai",
      text: dict.image_ai_response,
    };

    if (isGuest) {
      setGuestMessages((p) => [...p, response]);
    } else {
      const chat = chats.find((c) => c.id === activeChat);
      updateChat([...chat.messages, response]);
    }
  };

  const handleFileUpload = (file) => {
    const msg = {
      from: "user",
      type: "file",
      name: file.name,
      size: file.size,
    };

    if (isGuest) {
      setGuestMessages((p) => [...p, msg]);
    } else {
      const chat = chats.find((c) => c.id === activeChat);
      updateChat([...chat.messages, msg]);
    }

    setTimeout(() => {
      const aiMsg = {
        from: "ai",
        text: `📄 File received: ${file.name}`,
      };

      if (isGuest) setGuestMessages((p) => [...p, aiMsg]);
      else {
        const chat = chats.find((c) => c.id === activeChat);
        updateChat([...chat.messages, aiMsg]);
      }
    }, 300);
  };

  // -----------------------------------
  // SEND MESSAGE
  // -----------------------------------
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

    // ---------- Guest Mode ----------
    if (isGuest) {
      const count = guestMessages.filter((m) => m.from === "user").length;

      if (count >= guestLimit) {
        setGuestMessages((p) => [...p, { from: "ai", text: dict.guest_limit }]);
        return;
      }

      setGuestMessages((p) => [...p, { from: "user", text: input }]);
      setInput("");

      if ((count + 1) % 3 === 0) {
        setGuestMessages((p) => [...p, { from: "ai", text: dict.upgrade_prompt }]);
      }

      setTimeout(() => {
        setGuestMessages((p) => [...p, { from: "ai", text: dict.chat_ai_response }]);
      }, 400);

      return;
    }

    // ---------- Logged-in mode ----------
    const chat = chats.find((c) => c.id === activeChat);
    if (!chat) return;

    const limit = user.planDetails.maxMessages;
    if (limit !== Infinity && chat.messages.length >= limit) {
      updateChat([...chat.messages, { from: "ai", text: dict.limit_reached }]);
      return;
    }

    updateChat([...chat.messages, { from: "user", text: input }]);
    setInput("");

    // Generate dynamic title (first user message)
    if (chat.title === "New Chat") {
      const newTitle = generateTitle(input);
      setChats((prev) =>
        prev.map((c) =>
          c.id === chat.id ? { ...c, title: newTitle } : c
        )
      );
    }

    // Fake response typing
    setTimeout(() => {
      let full = `${dict.chat_ai_response} (${persona}, ${model})`;
      let i = 0;

      const typer = setInterval(() => {
        i++;

        updateChat([
          ...chat.messages,
          { from: "user", text: input },
          { from: "ai", text: full.slice(0, i) },
        ]);

        if (i >= full.length) clearInterval(typer);
      }, 20);
    }, 400);
  };

  // -----------------------------------
  // RENDER MESSAGES
  // -----------------------------------
  const renderMessages = () => {
    if (isGuest) {
      return guestMessages.map((msg, i) => (
        <MessageBubble
          key={i}
          msg={msg}
          lang={lang}
          dict={dict}
          onPlugin={runPlugin}
        />
      ));
    }

    const chat = chats.find((c) => c.id === activeChat);
    if (!chat) return null;

    return chat.messages.map((msg, i) => (
      <MessageBubble
        key={i}
        msg={msg}
        lang={lang}
        dict={dict}
        onPlugin={runPlugin}
      />
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

      <div className="flex-grow-1 p-4">
        <h2 className="fw-bold mb-3">
          {dict.chat_title} {isGuest && "(Guest Mode)"}
        </h2>

        {/* Guest message counter */}
        {isGuest && (
          <div className="alert alert-info">
            {dict.remaining_messages}:{" "}
            {guestLimit - guestMessages.filter((m) => m.from === "user").length}
          </div>
        )}

        {/* Only logged-in users see persona/model selection */}
        {!isGuest && (
          <>
            <PersonaSelector persona={persona} setPersona={setPersona} />
            <ModelSelector model={model} setModel={setModel} />
          </>
        )}

        {/* Chat messages */}
        <div
          className="border rounded-4 shadow-sm p-3 mb-3"
          style={{ height: "60vh", overflowY: "auto" }}
        >
          {renderMessages()}
          <div ref={chatEndRef}></div>
        </div>

        {/* Input box */}
        <div className="input-group gap-2">
          <VoiceRecorder setInput={setInput} />

          <input
            className="form-control"
            placeholder={dict.chat_placeholder}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => sendImage(e.target.files[0])}
            className="form-control"
            style={{ maxWidth: 180 }}
          />

          <input
            type="file"
            accept=".pdf,.txt,.doc,.docx"
            onChange={(e) => handleFileUpload(e.target.files[0])}
            className="form-control"
            style={{ maxWidth: 180 }}
          />

          <button className="btn btn-primary px-4" onClick={sendMessage}>
            {dict.chat_send}
          </button>
        </div>
      </div>
    </div>
  );
}
