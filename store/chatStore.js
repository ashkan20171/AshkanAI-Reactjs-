import { create } from "zustand";

const LS_KEY = "ashkan_ai_chats_v2";

function uid() {
  return Math.random().toString(16).slice(2) + Date.now().toString(16);
}

function load() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function save(state) {
  try {
    localStorage.setItem(
      LS_KEY,
      JSON.stringify({
        conversations: state.conversations,
        activeId: state.activeId,
      })
    );
  } catch {}
}

function clipTitle(text) {
  const t = (text || "").trim().replace(/\s+/g, " ");
  if (!t) return "New chat";
  return t.length > 38 ? t.slice(0, 38) + "…" : t;
}

function defaultWelcome() {
  return { role: "assistant", text: "سلام! من Ashkan AI هستم. چی دوست داری امروز انجام بدیم؟", ts: Date.now() };
}

function sortChats(conversations) {
  return [...conversations].sort((a, b) => {
    const ap = a.pinned ? 1 : 0;
    const bp = b.pinned ? 1 : 0;
    if (ap !== bp) return bp - ap;
    return (b.updatedAt || 0) - (a.updatedAt || 0);
  });
}

export const useChatStore = create((set, get) => {
  const persisted = load();

  const makeInitial = () => {
    const id = uid();
    const c = {
      id,
      title: "New chat",
      pinned: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      messages: [defaultWelcome()],
    };
    return { conversations: [c], activeId: id };
  };

  const initialState =
    persisted?.conversations?.length
      ? {
          conversations: persisted.conversations,
          activeId: persisted.activeId || persisted.conversations[0]?.id,
        }
      : makeInitial();

  const withPersist = (updater) =>
    set((state) => {
      const next = updater(state);
      const merged = { ...state, ...next };
      const fixed = { ...merged, conversations: sortChats(merged.conversations) };
      save(fixed);
      return { conversations: fixed.conversations, activeId: fixed.activeId };
    });

  return {
    conversations: sortChats(initialState.conversations),
    activeId: initialState.activeId,

    activeConversation() {
      return get().conversations.find((c) => c.id === get().activeId);
    },

    setActive(id) {
      withPersist(() => ({ activeId: id }));
    },

    newChat() {
      withPersist((state) => {
        const id = uid();
        const conv = {
          id,
          title: "New chat",
          pinned: false,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          messages: [defaultWelcome()],
        };
        return { conversations: [conv, ...state.conversations], activeId: id };
      });
    },

    pinToggle(id) {
      withPersist((state) => ({
        conversations: state.conversations.map((c) =>
          c.id === id ? { ...c, pinned: !c.pinned, updatedAt: Date.now() } : c
        ),
      }));
    },

    renameChat(id, title) {
      withPersist((state) => ({
        conversations: state.conversations.map((c) =>
          c.id === id ? { ...c, title: clipTitle(title), updatedAt: Date.now() } : c
        ),
      }));
    },

    deleteChat(id) {
      withPersist((state) => {
        const rest = state.conversations.filter((c) => c.id !== id);
        if (rest.length === 0) return makeInitial();
        const nextActive = state.activeId === id ? rest[0].id : state.activeId;
        return { conversations: rest, activeId: nextActive };
      });
    },

    appendMessage(id, msg) {
      withPersist((state) => ({
        conversations: state.conversations.map((c) => {
          if (c.id !== id) return c;

          const wasNew = c.title === "New chat";
          const nextMsgs = [...c.messages, msg];

          let nextTitle = c.title;
          if (wasNew && msg.role === "user") nextTitle = clipTitle(msg.text);

          return { ...c, title: nextTitle, messages: nextMsgs, updatedAt: Date.now() };
        }),
      }));
    },

    updateLastMessage(id, patch) {
      withPersist((state) => ({
        conversations: state.conversations.map((c) => {
          if (c.id !== id) return c;
          const msgs = [...c.messages];
          if (!msgs.length) return c;
          msgs[msgs.length - 1] = { ...msgs[msgs.length - 1], ...patch };
          return { ...c, messages: msgs, updatedAt: Date.now() };
        }),
      }));
    },

    replaceLastAssistant(id, newText) {
      withPersist((state) => ({
        conversations: state.conversations.map((c) => {
          if (c.id !== id) return c;
          const msgs = [...c.messages];
          for (let i = msgs.length - 1; i >= 0; i--) {
            if (msgs[i].role === "assistant") {
              msgs[i] = { ...msgs[i], text: newText, ts: Date.now(), pending: false };
              break;
            }
          }
          return { ...c, messages: msgs, updatedAt: Date.now() };
        }),
      }));
    },

    search(query) {
      const q = (query || "").trim().toLowerCase();
      if (!q) return get().conversations;

      return get().conversations.filter((c) => {
        if ((c.title || "").toLowerCase().includes(q)) return true;
        return c.messages?.some((m) => ((m.text || "").toLowerCase().includes(q)));
      });
    },

    exportConversation(id, format = "txt") {
      const conv = get().conversations.find((c) => c.id === id);
      if (!conv) return null;

      if (format === "json") return JSON.stringify(conv, null, 2);

      const lines = [];
      lines.push(`# ${conv.title}`);
      lines.push("");
      for (const m of conv.messages) {
        const who = m.role === "user" ? "User" : "Assistant";
        lines.push(`${who}:`);
        lines.push(m.text || "");
        lines.push("");
      }
      return lines.join("\n");
    },

    exportAll() {
      return JSON.stringify(
        { conversations: get().conversations, activeId: get().activeId },
        null,
        2
      );
    },
  };
});
