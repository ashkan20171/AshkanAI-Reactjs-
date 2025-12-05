import { useState } from "react";
import { mockAI } from "../../services/ai";

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState("");

  const generateImage = () => {
    // Mock image (تا بعد API واقعی اضافه شود)
    const placeholder = "https://via.placeholder.com/512x512.png?text=AshkanAI+Generated+Image";
    setImage(placeholder);
  };

  return (
    <div className="container mt-4" style={{ maxWidth: 800 }}>
      <h3 className="fw-bold mb-4">🎨 مولد تصویر AshkanAI</h3>

      <textarea
        className="form-control mb-3"
        rows="4"
        placeholder="توصیف تصویری خود را وارد کنید..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <button className="btn btn-primary w-100 mb-4" onClick={generateImage}>
        تولید تصویر
      </button>

      {image && (
        <div className="text-center">
          <img
            src={image}
            alt="Generated"
            className="img-fluid rounded-4 shadow"
          />
        </div>
      )}
    </div>
  );
}
