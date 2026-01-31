const { GoogleGenerativeAI } = require("@google/generative-ai");

const PROMPT_BANK = [
  "hiiii"
];

module.exports = async function (req, res) {
  try {
    const prompts = PROMPT_BANK.sort(() => 0.5 - Math.random()).slice(0, 10);

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

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
