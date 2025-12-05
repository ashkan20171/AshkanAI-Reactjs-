import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

export default function VoiceRecorder({ setInput }) {
  const { dict } = useLanguage();
  const [recording, setRecording] = useState(false);

  let recognition;

  if ("webkitSpeechRecognition" in window) {
    recognition = new webkitSpeechRecognition();
    recognition.lang = "auto";
    recognition.continuous = false;
    recognition.interimResults = false;
  }

  const startRecording = () => {
    if (!recognition) return alert(dict.voice_not_supported);

    setRecording(true);

    recognition.start();

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      setInput((prev) => prev + " " + text);
    };

    recognition.onerror = () => {
      setRecording(false);
    };

    recognition.onend = () => {
      setRecording(false);
    };
  };

  return (
    <button
      className={`btn ${recording ? "btn-danger" : "btn-outline-secondary"}`}
      onClick={startRecording}
      type="button"
    >
      🎤
    </button>
  );
}
