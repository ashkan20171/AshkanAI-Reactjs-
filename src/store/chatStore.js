import { create } from "zustand";

const LS_KEY = "ashkan_ai_chats_v1";

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

function defaultWelcome() {
  return { role: "assistant", text: "سلام! من Ashkan AI هستم. چی دوست داری امروز انجام بدیم؟" };
}

export const useChatStore = create((set, get) => {
  const persisted = load();

  const initialConv = () => {
    const id = uid();
    return {
      id,
      title: "New chat",
      createdAt: Date.now(),
      updatedAt: Date.now(),
      messages: [defaultWelcome()],
    };
  };

  const initialState = persisted?.conversations?.length
    ? {
        conversations: persisted.conversations,
        activeId: persisted.activeId || persisted.conversations[0]?.id,
      }
    : (() => {
        const c = initialConv();
        return { conversations: [c], activeId: c.id };
      })();

  const withPersist = (updater) =>
    set((state) => {
      const next = updater(state);
      // persist merged state (conversations/activeId)
      const merged = { ...state, ...next };
      save(merged);
      return next;
    });

  return {
    conversations: initialState.conversations,
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
          createdAt: Date.now(),
          updatedAt: Date.now(),
          messages: [defaultWelcome()],
        };
        return { conversations: [conv, ...state.conversations], activeId: id };
      });
    },

    renameChat(id, title) {
      withPersist((state) => ({
        conversations: state.conversations.map((c) =>
          c.id === id ? { ...c, title, updatedAt: Date.now() } : c
        ),
      }));
    },

    deleteChat(id) {
      withPersist((state) => {
        const rest = state.conversations.filter((c) => c.id !== id);
        if (rest.length === 0) {
          const c = {
            id: uid(),
            title: "New chat",
            createdAt: Date.now(),
            updatedAt: Date.now(),
            messages: [defaultWelcome()],
          };
          return { conversations: [c], activeId: c.id };
        }
        const nextActive = state.activeId === id ? rest[0].id : state.activeId;
        return { conversations: rest, activeId: nextActive };
      });
    },

    appendMessage(id, msg) {
      withPersist((state) => ({
        conversations: state.conversations.map((c) =>
          c.id === id
            ? { ...c, messages: [...c.messages, msg], updatedAt: Date.now() }
            : c
        ),
      }));
    },

    replaceLastAssistant(id, newText) {
      withPersist((state) => ({
        conversations: state.conversations.map((c) => {
          if (c.id !== id) return c;
          const msgs = [...c.messages];
          for (let i = msgs.length - 1; i >= 0; i--) {
            if (msgs[i].role === "assistant") {
              msgs[i] = { ...msgs[i], text: newText };
              break;
            }
          }
          return { ...c, messages: msgs, updatedAt: Date.now() };
        }),
      }));
    },

    // برای جستجو در سایدبار
    search(query) {
      const q = (query || "").trim().toLowerCase();
      if (!q) return get().conversations;
      return get().conversations.filter((c) => c.title.toLowerCase().includes(q));
    },
  };
});
