const plans = {
  guest: {
    name: "Guest",
    price: 0,
    description: "محدود و فقط برای امتحان سرویس",
    maxMessages: 5,
    allowImageGen: false,
    allowCodeAssistant: false,
    allowTaskAgent: false,
  },

  free: {
    name: "Free",
    price: 0,
    description: "پلن رایگان با امکانات محدود",
    maxMessages: 50,
    allowImageGen: false,
    allowCodeAssistant: true,
    allowTaskAgent: false,
  },

  pro: {
    name: "Pro",
    price: 149000,
    description: "امکانات کامل برای کاربران حرفه‌ای",
    maxMessages: 500,
    allowImageGen: true,
    allowCodeAssistant: true,
    allowTaskAgent: true,
  },

  vip: {
    name: "VIP",
    price: 349000,
    description: "دسترسی نامحدود به همه امکانات",
    maxMessages: Infinity,
    allowImageGen: true,
    allowCodeAssistant: true,
    allowTaskAgent: true,
  },
};

export default plans;
