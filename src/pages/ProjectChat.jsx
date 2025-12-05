import { useParams } from "react-router-dom";
import { useProject } from "../context/ProjectContext";
import { useLanguage } from "../context/LanguageContext";
import MessageBubble from "../components/MessageBubble";
import { useState, useRef, useEffect } from "react";

export default function ProjectChat() {
  const { id } = useParams();
  const { projects, updateProject } = useProject();
  const { dict, lang } = useLanguage();

  const project = projects.find((p) => p.id === id);

  const [input, setInput] = useState("");
  const chatEnd = useRef(null);

  useEffect(() => {
    chatEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [project.chat]);

  if (!project) return <h3>{dict.project_not_found}</h3>;

  const send = () => {
    if (!input.trim()) return;

    const newMessages = [...project.chat, { from: "user", text: input }];
    updateProject(id, { chat: newMessages });

    setInput("");

    setTimeout(() => {
      const reply = {
        from: "ai",
        text: `${dict.chat_ai_response} (${project.persona})`,
      };

      updateProject(id, { chat: [...newMessages, reply] });
    }, 600);
  };

  return (
    <div className="container py-4" style={{ direction: lang === "fa" ? "rtl" : "ltr" }}>

      <h2 className="fw-bold mb-3">{dict.project_chat}</h2>

      <div className="border p-3 rounded-4 shadow-sm" style={{ height: "70vh", overflowY: "auto" }}>
        {project.chat.map((msg, i) => (
          <MessageBubble key={i} msg={msg} lang={lang} dict={dict} />
        ))}
        <div ref={chatEnd}></div>
      </div>

      <div className="input-group mt-3">
        <input
          className="form-control"
          placeholder={dict.chat_placeholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
        />

        <button className="btn btn-primary" onClick={send}>
          {dict.chat_send}
        </button>
      </div>

    </div>
  );
}
