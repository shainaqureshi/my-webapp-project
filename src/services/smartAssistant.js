// Smart Rule-Based AI Assistant (No API Required)
// Pre-programmed responses for goal suggestions, motivation, and help

const goalCategories = {
  reading: [
    "Read a book chapter every day 📚",
    "Finish one book this week",
    "Read for 20 minutes before bed",
    "Learn 5 new vocabulary words daily",
    "Read a comic or graphic novel"
  ],
  sports: [
    "Exercise for 30 minutes daily 🏃",
    "Practice [your sport] 3 times a week",
    "Do 20 jumping jacks every morning",
    "Go for a bike ride",
    "Play outside for an hour"
  ],
  learning: [
    "Learn something new every day 🧠",
    "Watch an educational video",
    "Practice math problems for 15 minutes",
    "Learn a new skill this week",
    "Ask a grown-up to teach you something"
  ],
  helping: [
    "Help with household chores daily 🏠",
    "Do one kind thing for someone",
    "Help cook a meal with family",
    "Clean your room without being asked",
    "Take care of a pet"
  ],
  creativity: [
    "Draw or paint something every day 🎨",
    "Write in a journal",
    "Build something with blocks or LEGO",
    "Make up a story",
    "Practice a musical instrument"
  ],
  health: [
    "Drink 6 glasses of water daily 💧",
    "Eat a fruit or vegetable with every meal",
    "Get 9 hours of sleep",
    "Brush teeth twice a day",
    "Do 10 stretches each morning"
  ]
};

const motivationalMessages = [
  "You're doing amazing! Keep up the great work! 🌟",
  "Every small step counts! You're making progress! 💪",
  "Wow! Look at that streak! You're unstoppable! 🔥",
  "You're crushing it! Keep going! 🚀",
  "Great job! Your hard work is paying off! ⭐",
  "You're a goal-achieving superstar! ✨",
  "Believe in yourself! You can do anything! 🎯",
  "One day at a time! You've got this! 💫",
  "Your dedication is inspiring! 🌈",
  "Keep being awesome! You're doing great! 🎉"
];

const goalTips = [
  "Start small and build up! Even 5 minutes counts! 🎯",
  "Do your goal at the same time each day to build a habit ⏰",
  "Tell someone about your goal - they can help remind you! 👥",
  "Celebrate when you complete a goal! You earned it! 🎉",
  "If you miss a day, that's okay! Just start again tomorrow! 💪",
  "Make your goal specific - instead of 'exercise', try 'run for 10 minutes' 🏃",
  "Track your progress - seeing your streak grow is motivating! 📈",
  "Pair a new goal with something you already do every day 🔗",
  "Visualize yourself completing the goal - it helps! 💭",
  "Don't give up! It takes about 21 days to build a habit! 📅"
];

const appHelp = {
  points: "You earn 10 points every time you complete a goal! 🏆 Keep completing goals to rack up points!",
  streak: "A streak is how many days in a row you've completed a goal! 🔥 Try not to break your streak!",
  goals: "Goals are things you want to achieve! Create a goal, then check it off when you complete it! ✅",
  feed: "The Feed shows goals from other users! Check it out for inspiration! 👀",
  recommendations: "Share your favorite books, restaurants, and parks with the community! 📚🍽️🏞️"
};

// Get random item from array
const getRandom = (array) => array[Math.floor(Math.random() * array.length)];

// Get multiple random items
const getRandomMultiple = (array, count) => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Main chat function
export const smartChat = (userMessage) => {
  const message = userMessage.toLowerCase();

  // Goal suggestions
  if (message.includes('suggest') || message.includes('goal') || message.includes('idea')) {
    const allGoals = Object.values(goalCategories).flat();
    const suggestions = getRandomMultiple(allGoals, 5);
    return {
      error: false,
      message: "Here are 5 fun goals you could try:\n\n" + suggestions.map((g, i) => `${i + 1}. ${g}`).join('\n') + "\n\nPick one and give it a try! 🎯"
    };
  }

  // Category-specific suggestions
  if (message.includes('reading') || message.includes('book')) {
    return {
      error: false,
      message: "Great choice! Here are reading goals:\n\n" + goalCategories.reading.map((g, i) => `${i + 1}. ${g}`).join('\n')
    };
  }

  if (message.includes('sport') || message.includes('exercise') || message.includes('fitness')) {
    return {
      error: false,
      message: "Awesome! Here are fitness goals:\n\n" + goalCategories.sports.map((g, i) => `${i + 1}. ${g}`).join('\n')
    };
  }

  if (message.includes('learn') || message.includes('study') || message.includes('school')) {
    return {
      error: false,
      message: "Learning is fun! Try these:\n\n" + goalCategories.learning.map((g, i) => `${i + 1}. ${g}`).join('\n')
    };
  }

  if (message.includes('help') || message.includes('chore') || message.includes('family')) {
    return {
      error: false,
      message: "Helping others is great! 💗\n\n" + goalCategories.helping.map((g, i) => `${i + 1}. ${g}`).join('\n')
    };
  }

  if (message.includes('art') || message.includes('draw') || message.includes('create') || message.includes('music')) {
    return {
      error: false,
      message: "Get creative! 🎨\n\n" + goalCategories.creativity.map((g, i) => `${i + 1}. ${g}`).join('\n')
    };
  }

  if (message.includes('health') || message.includes('water') || message.includes('sleep')) {
    return {
      error: false,
      message: "Stay healthy! 💪\n\n" + goalCategories.health.map((g, i) => `${i + 1}. ${g}`).join('\n')
    };
  }

  // Motivation
  if (message.includes('motivat') || message.includes('encourage') || message.includes('cheer')) {
    return {
      error: false,
      message: getRandom(motivationalMessages) + "\n\nYou're on a great path! Keep pushing forward! 🌟"
    };
  }

  // Tips
  if (message.includes('tip') || message.includes('how') || message.includes('achieve')) {
    const tips = getRandomMultiple(goalTips, 3);
    return {
      error: false,
      message: "Here are 3 tips to achieve your goals:\n\n" + tips.map((t, i) => `${i + 1}. ${t}`).join('\n\n')
    };
  }

  // Streak help
  if (message.includes('streak')) {
    return {
      error: false,
      message: appHelp.streak + "\n\n💡 Tip: " + getRandom(goalTips)
    };
  }

  // Points help
  if (message.includes('point')) {
    return {
      error: false,
      message: appHelp.points + "\n\n" + getRandom(motivationalMessages)
    };
  }

  // App features
  if (message.includes('feed')) {
    return { error: false, message: appHelp.feed };
  }

  if (message.includes('recommendation')) {
    return { error: false, message: appHelp.recommendations };
  }

  // Default helpful response
  return {
    error: false,
    message: "I can help you with:\n\n✨ Goal suggestions (try 'suggest goals')\n💪 Motivation (try 'motivate me')\n📝 Tips for success (try 'goal tips')\n❓ Questions about points, streaks, or features\n\nWhat would you like help with? 🎯"
  };
};

// Quick action functions
export const getSuggestions = () => {
  const allGoals = Object.values(goalCategories).flat();
  const suggestions = getRandomMultiple(allGoals, 5);
  return {
    error: false,
    message: "🎯 Here are 5 fun goals for you:\n\n" + suggestions.map((g, i) => `${i + 1}. ${g}`).join('\n') + "\n\nWhich one sounds fun?"
  };
};

export const getMotivation = (points = 0, streak = 0) => {
  let message = getRandom(motivationalMessages);
  
  if (streak > 7) {
    message += `\n\n🔥 Wow! ${streak} days in a row! You're on fire!`;
  } else if (streak > 3) {
    message += `\n\n✨ ${streak}-day streak! Keep it going!`;
  }
  
  if (points > 100) {
    message += `\n\n🏆 ${points} points! You're a champion!`;
  } else if (points > 50) {
    message += `\n\n⭐ ${points} points! Fantastic work!`;
  }
  
  return {
    error: false,
    message: message + "\n\n💪 Keep crushing those goals!"
  };
};

export const getTips = () => {
  const tips = getRandomMultiple(goalTips, 3);
  return {
    error: false,
    message: "📝 3 Tips for Success:\n\n" + tips.map((t, i) => `${i + 1}. ${t}`).join('\n\n') + "\n\nYou've got this! 🌟"
  };
};
