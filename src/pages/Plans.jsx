const plans = {
  free: {
    name: "Free",
    maxMessages: 30,
    allowImageGen: false,
    allowCodeAssistant: true,
    allowTaskAgent: false
  },

  pro: {
    name: "Pro",
    maxMessages: 500,
    allowImageGen: true,
    allowCodeAssistant: true,
    allowTaskAgent: true
  },

  ultimate: {
    name: "Ultimate",
    maxMessages: Infinity,
    allowImageGen: true,
    allowCodeAssistant: true,
    allowTaskAgent: true
  }
};

export default plans;
