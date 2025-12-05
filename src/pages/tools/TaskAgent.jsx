import { useState } from "react";
import { mockAI } from "../../services/ai";

export default function TaskAgent() {
  const [task, setTask] = useState("");
  const [result, setResult] = useState("");

  const runTask = () => {
    const output = mockAI(`Handle this task: ${task}`, "ultra");
    setResult(output);
  };

  return (
    <div className="container mt-4" style={{ maxWidth: 850 }}>
      <h3 className="fw-bold mb-4">🤖 Task AI Agent</h3>

      <textarea
        className="form-control mb-3"
        rows="6"
        placeholder="کار موردنظر را وارد کنید..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />

      <button className="btn btn-dark w-100 mb-4" onClick={runTask}>
        انجام بده
      </button>

      {result && (
        <div className="p-3 rounded-4 bg-white shadow-sm">
          {result}
        </div>
      )}
    </div>
  );
}
