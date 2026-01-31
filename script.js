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
var num_times = 0
var storage_on_load;
var storage_on_load_as_number;
var up_by_one;

if (localStorage.getItem("how_many_times") !== null) {
  // does
  console.log('Current num:', localStorage.getItem("how_many_times"));
  storage_on_load = localStorage.getItem("how_many_times");
  storage_on_load_as_number = parseInt(storage_on_load,10);
  num_times += storage_on_load_as_number;

  //make sure to preload amounts
const counter = document.getElementById("counter");
counter.textContent = (0.26 * storage_on_load_as_number)

const percentage = document.getElementById("percentage");
var long_num = (0.000000000000000000000000619047619 * storage_on_load_as_number)
var fixed_digits = long_num.toFixed(33);
percentage.textContent = fixed_digits;

} else {
  // not
  console.log('no current count');
  localStorage.setItem("how_many_times",0)
}

// document.getElementById("generateBtn").onclick = () => {
//   const output = document.getElementById("output");
//   output.textContent = "Button clicked! 🎉 No API call made.";
// };

// ml per 1 prompt: 0.26 milliliters of water
// 0.000000000000000000000000619047619%
async function clicked(){
    //fixing count and updating ls
    num_times += 1;
    var current_ls = localStorage.getItem("how_many_times")
    up_by_one = parseInt(current_ls,10) + 1;
    localStorage.setItem("how_many_times",up_by_one);
    console.log("CHECK THIS CLICK COUNT: ",num_times,"AND THIS LS: ",localStorage.getItem("how_many_times"));

    //change stats
    const counter = document.getElementById("counter");
    counter.textContent = (0.26 * up_by_one)

    const percentage = document.getElementById("percentage");
    var long_num = (0.000000000000000000000000619047619 * up_by_one)
    var fixed_digits = long_num.toFixed(33);
    percentage.textContent = fixed_digits;

    //actually cause harm
    try {
        console.log("imtrying")
        const res = await fetch("/api/generate");
        const data = await res.json();
        console.log(data.prompt)
        console.log(data.response)
    } catch (err) {
        console.log = "Error: " + err.message;
    }

}