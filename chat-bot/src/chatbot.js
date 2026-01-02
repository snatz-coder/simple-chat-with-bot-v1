// chatbot.js
const Chatbot = {
  defaultResponses: {
    // Greetings
    "hello hi hey": "Hello! How can I help you today?",
    "good morning": "Good morning! ☀️ How can I help?",
    "good afternoon": "Good afternoon! How can I help?",
    "good evening": "Good evening! 🌙 How can I help?",

    // Small talk
    "how are you": "I'm doing great! Thanks for asking 😊",
    "how is it going": "Everything is running smoothly! How can I help?",
    "what are you doing": "I'm here waiting to help you with something!",

    // Identity
    "who are you": "I'm a simple chatbot built with JavaScript 🤖",
    "what is your name": "You can call me Chatbot!",
    "are you human": "Nope! I'm a friendly robot 🤖",

    // Capabilities
    "what can you do": () =>
      "I can flip a coin, roll a dice, tell today's date, the time, and chat with you!",

    // Time & date
    "what time is it current time": () => {
      const now = new Date();
      return `The current time is ${now.toLocaleTimeString()}`;
    },

    "what is the date today": () => {
      const now = new Date();
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      return `Today is ${months[now.getMonth()]} ${now.getDate()}`;
    },

    // Fun utilities
    "flip a coin toss a coin": () =>
      Math.random() < 0.5 ? "You got heads 🪙" : "You got tails 🪙",

    "roll a dice": () => {
      const roll = Math.floor(Math.random() * 6) + 1;
      return `You rolled a ${roll} 🎲`;
    },

    "random number": () => {
      const num = Math.floor(Math.random() * 100) + 1;
      return `Your random number is ${num}`;
    },

    // Jokes & fun
    "tell me a joke": () => {
      const jokes = [
        "Why do programmers hate nature? Too many bugs 🐛",
        "Why did the computer go to the doctor? Because it caught a virus 🤒",
        "Why do JavaScript developers wear glasses? Because they don't C# 👓",
      ];
      return jokes[Math.floor(Math.random() * jokes.length)];
    },

    // Politeness
    "thank thanks": "You're welcome! 😊",
    "goodbye bye see you": "Goodbye! Have a great day 👋",
  },

  additionalResponses: {},

  unsuccessfulResponse:
    "Sorry, I didn't quite understand that. I can flip a coin, roll a dice, or tell today's date.",

  emptyMessageResponse:
    "Sorry, it looks like your message is empty. Please send a message.",

  addResponses(additionalResponses) {
    this.additionalResponses = {
      ...this.additionalResponses,
      ...additionalResponses,
    };
  },

  getResponse(message) {
    if (!message) return this.emptyMessageResponse;

    const responses = {
      ...this.defaultResponses,
      ...this.additionalResponses,
    };

    const { ratings, bestMatchIndex } = this.stringSimilarity(
      message,
      Object.keys(responses)
    );

    if (ratings[bestMatchIndex].rating <= 0.3) {
      return this.unsuccessfulResponse;
    }

    const bestKey = ratings[bestMatchIndex].target;
    const response = responses[bestKey];

    return typeof response === "function" ? response() : response;
  },

  async getResponseAsync(message) {
    await new Promise((r) => setTimeout(r, 1000));
    return this.getResponse(message);
  },

  compareTwoStrings(first, second) {
    first = first.replace(/\s+/g, "");
    second = second.replace(/\s+/g, "");

    if (first === second) return 1;
    if (first.length < 2 || second.length < 2) return 0;

    const bigrams = new Map();
    for (let i = 0; i < first.length - 1; i++) {
      const pair = first.substring(i, i + 2);
      bigrams.set(pair, (bigrams.get(pair) || 0) + 1);
    }

    let intersection = 0;
    for (let i = 0; i < second.length - 1; i++) {
      const pair = second.substring(i, i + 2);
      const count = bigrams.get(pair) || 0;
      if (count > 0) {
        bigrams.set(pair, count - 1);
        intersection++;
      }
    }

    return (2 * intersection) / (first.length + second.length - 2);
  },

  stringSimilarity(mainString, targets) {
    const ratings = targets.map((target) => ({
      target,
      rating: this.compareTwoStrings(mainString, target),
    }));

    let bestMatchIndex = 0;
    ratings.forEach((r, i) => {
      if (r.rating > ratings[bestMatchIndex].rating) {
        bestMatchIndex = i;
      }
    });

    return { ratings, bestMatchIndex };
  },
};

export default Chatbot;
