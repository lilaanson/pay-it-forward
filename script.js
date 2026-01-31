// document.getElementById("generateBtn").onclick = async () => {
//   const output = document.getElementById("output");
//   output.textContent = "Thinking…";

//   try {
//     const res = await fetch("/api/generate");
//     const data = await res.json();

//     output.textContent =
//       "PROMPTS:\n" +
//       data.prompts.join("\n") +
//       "\n\nRESPONSE:\n" +
//       data.response;
//   } catch (err) {
//     output.textContent = "Error: " + err.message;
//   }
// };



document.getElementById("generateBtn").onclick = () => {
  const output = document.getElementById("output");
  output.textContent = "Button clicked! 🎉 No API call made.";
};