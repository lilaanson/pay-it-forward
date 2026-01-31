const { GoogleGenerativeAI } = require("@google/generative-ai");

const PROMPT_BANK = [
  "Write a sentence about longing.",
  "Describe a place you miss.",
  "What does quiet feel like?",
  "Write a metaphor for waiting.",
  "Describe something blue.",
  "Write a line that feels unfinished.",
  "What does comfort look like?",
  "Describe a memory without naming it.",
  "Write a sentence that feels warm.",
  "What does relief sound like?"
];

module.exports = async function (req, res) {
  try {
    const prompts = PROMPT_BANK.sort(() => 0.5 - Math.random()).slice(0, 10);

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini‑2.0‑flash‑lite" });

    const result = await model.generateContent(
      `Respond to each prompt:\n${prompts.join("\n")}`
    );

    res.status(200).json({
      prompts,
      response: result.response.text()
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
