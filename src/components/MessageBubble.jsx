import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import VoicePlayer from "./VoicePlayer";

export default function MessageBubble({ msg, lang, dict }) {
  const isUser = msg.from === "user";

  const copyText = () => {
    navigator.clipboard.writeText(msg.text);
  };

  return (
    <div
      className={`d-flex mb-3 ${
        isUser
          ? lang === "fa"
            ? "justify-content-start"
            : "justify-content-end"
          : "justify-content-start"
      }`}
    >
      <div
        className={`p-3 rounded-4 shadow-sm ${
          isUser ? "bg-primary text-white" : "bg-white"
        }`}
        style={{
          maxWidth: "75%",
          lineHeight: "1.8",
          position: "relative",
        }}
      >
        {/* نمایش Markdown + Highlight */}
        <ReactMarkdown
          children={msg.text}
          remarkPlugins={[remarkGfm]}
          components={{
            code({ inline, className, children }) {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match ? (
                <SyntaxHighlighter
                  style={oneDark}
                  language={match[1]}
                  PreTag="div"
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              ) : (
                <code className="bg-dark text-warning px-1 rounded">
                  {children}
                </code>
              );
            },
          }}
        />

        {/* دکمه‌های پیام AI */}
        {!isUser && (
          <div className="d-flex gap-2 mt-2">
            <button className="btn btn-sm btn-outline-secondary" onClick={copyText}>
              📋 {dict.copy}
            </button>

            <VoicePlayer text={msg.text} />
          </div>
        )}
      </div>
    </div>
  );
}
