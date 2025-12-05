import { useLanguage } from "../context/LanguageContext";

export default function ChatSidebar({ chats, setChats, activeChat, setActiveChat }) {
  const { dict, lang } = useLanguage();

  const createChat = () => {
    const newChat = {
      id: Date.now(),
      title: dict.new_chat,
      messages: [],
      date: new Date().toISOString()
    };

    setChats([newChat, ...chats]);
    setActiveChat(newChat.id);
  };

  const deleteChat = (id) => {
    const updated = chats.filter(c => c.id !== id);
    setChats(updated);
    if (updated.length > 0) {
      setActiveChat(updated[0].id);
    }
  };

  return (
    <div
      className="p-3 border-end"
      style={{
        width: 260,
        height: "100vh",
        overflowY: "auto",
        direction: lang === "fa" ? "rtl" : "ltr"
      }}
    >
      <button className="btn btn-primary w-100 mb-3" onClick={createChat}>
        {dict.new_chat}
      </button>

      {chats.map((chat) => (
        <div
          key={chat.id}
          className={`p-2 mb-2 rounded-3 ${chat.id === activeChat ? "bg-light" : ""}`}
          style={{ cursor: "pointer" }}
          onClick={() => setActiveChat(chat.id)}
        >
          <strong>{chat.title}</strong>
          <br />
          <small className="text-muted">
            {new Date(chat.date).toLocaleString()}
          </small>

          <button
            className="btn btn-sm btn-danger mt-2"
            onClick={(e) => {
              e.stopPropagation();
              deleteChat(chat.id);
            }}
          >
            {dict.delete}
          </button>
        </div>
      ))}
    </div>
  );
}
