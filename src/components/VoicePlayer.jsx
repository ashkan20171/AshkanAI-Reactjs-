export default function VoicePlayer({ text }) {
  const speak = () => {
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-US";
    window.speechSynthesis.speak(utter);
  };

  return (
    <button className="btn btn-outline-secondary btn-sm" onClick={speak}>
      🔊
    </button>
  );
}
