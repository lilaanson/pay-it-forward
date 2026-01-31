const { GoogleGenerativeAI } = require("@google/generative-ai");

const PROMPT_BANK = [
  "how many fish are in the sea?",
  "what is the coolest sea animal?",
  "what is the biggest predator of all time?",
  "help me visualize how long ago the dinosaurs lived",
  "are the dinosaurs accurate",
  "how to code a dinosaur",
  "how do learn to code",
  "hardest coding language",
  "longest held world record and what was it for",
  "coolest world record ever",
  "how many people have died trying to win world records",
  "what word record could i break right now",
  "do you believe in me",
  "do i believe in you",
  "tough love motivation",
  "what workout should i do today",
  "if you could be a human for one day what would you do",
  "how to motivate my friend",
  "my friend is going through a hard time",
  "how to get through hard times",
  "therapists near me",
  "bus routes near me",
  "cheapest weekend flights from denver to austin in the next three months",
  "weekend trip in austin itinerary",
  "cool museums in austin",
  "free things in austin",
  "austin airbnbs",
  "are airbnbs safe",
  "how to break into an airbnb",
  "will i get flagged by the government for asking weird things on ai",
  "how to delete my browser history",
  "how to delete my gemini history",
  "how to delete my gemini account",
  "how to live off the grid",
  "communes near me",
  "safe communes in the US",
  "how to grow my own food",
  "where do i buy farm animals",
  "do i need a license to own farm animals",
  "indeed.com",
  "design jobs near me",
  "is design a dying industry",
  "is computer science a dying industry",
  "is ai taking over design jobs",
  "will the need for artists and graphic designers lessen with ai",
  "how to use ai productively in my work",
  "how bad is ai really",
  "protests near me this weekend",
  "should i go to grad school",
  "how much is grad school",
  "how to pay back a loan",
  "best budget apps",
  "budget apps aesthetic",
  "budget apps aesthetic free",
  "aesthetic calendar pinterest",
  "2026 vision board ideas",
  "attainable 2026 goals",
  "what is 2026 the year of",
  "will 2026 be my year",
  "help me with my budgeting",
  "format a thank you email to my interviewer",
  "questions to ask after an interview",
  "help me prep for an interview",
  "jobs near me",
  "jobs where i can travel",
  "highest paying easiest jobs",
  "do i follow my dreams or money"
];

module.exports = async function (req, res) {
    console.log("HERE")
  try {
    // pick a single random prompt
    const prompt = PROMPT_BANK[Math.floor(Math.random() * PROMPT_BANK.length)];

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContent(
      `Respond to this prompt:\n${prompt}`
    );

    res.status(200).json({
      prompt, // single prompt
      response: result.response.text()
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

