import { useAuth } from "../context/AuthContext";

export default function AIModeSelector({ mode, setMode }) {
  const { user } = useAuth();

  const modes = [
    { id: "smart", title: "Smart", premium: false },
    { id: "creative", title: "Creative", premium: false },
    { id: "ultra", title: "Ultra", premium: true },
  ];

  return (
    <div className="d-flex gap-2 mb-3">
      {modes.map((m) => (
        <button
          key={m.id}
          disabled={m.premium && user?.plan !== "ultra"}
          className={`btn ${
            mode === m.id ? "btn-primary" : "btn-outline-primary"
          }`}
          onClick={() => setMode(m.id)}
        >
          {m.title}
        </button>
      ))}
    </div>
  );
}
