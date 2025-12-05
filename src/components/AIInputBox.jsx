import { useState } from "react";

export default function AIInputBox({ onSend }) {
  const [text, setText] = useState("");

  const send = () => {
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  return (
    <div className="d-flex gap-2 p-3 border-top">
      <input
        className="form-control form-control-lg"
        placeholder="پیامت را بنویس..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && send()}
      />
      <button className="btn btn-primary btn-lg" onClick={send}>
        ارسال
      </button>
    </div>
  );
}
