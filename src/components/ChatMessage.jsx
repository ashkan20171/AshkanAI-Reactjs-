import { useEffect, useRef } from "react";

export default function ChatMessage({ sender, text }) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.opacity = 0;
      ref.current.style.transform = "translateY(10px)";
      setTimeout(() => {
        ref.current.style.opacity = 1;
        ref.current.style.transform = "translateY(0)";
      }, 10);
    }
  }, []);

  const isUser = sender === "user";

  return (
    <div
      ref={ref}
      className={`d-flex ${
        isUser ? "justify-content-end" : "justify-content-start"
      } mb-3 transition`}
      style={{ transition: "all 0.25s ease" }}
    >
      <div
        className={`p-3 rounded-4 shadow-sm ${
          isUser ? "bg-primary text-white chat-user" : "bg-light chat-ai"
        }`}
        style={{ maxWidth: "75%" }}
      >
        {text}
      </div>
    </div>
  );
}
