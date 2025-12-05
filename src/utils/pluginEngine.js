export const plugins = {
  summarize: (text) => {
    return "📄 Summary:\n" + text.slice(0, 200) + "...";
  },

  rewrite: (text) => {
    return "✍️ Rewritten:\n" + text.replace(/very/gi, "extremely");
  },

  translate: (text) => {
    return "🌍 Translation:\n" + "Fake translated version of: " + text;
  },

  improve: (text) => {
    return "✨ Improved:\n" + text + "\n\n(Improved version!)";
  },

  explain: (text) => {
    return "📘 Explanation:\n" + "This text means: " + text;
  },
};
