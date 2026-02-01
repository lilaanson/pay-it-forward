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
let is_mouse_down = false;
let did_mouse_click_button = false;
let all_prompts = []
let all_responses = []

var button_down_element = document.getElementById("pressed");
var button_up_element = document.getElementById("not-pressed");

if(localStorage.getItem("all_prompts") !== null){
    console.log("ls:"+ localStorage.getItem("all_prompts"))
}else{
    console.log("nothing")
}

document.addEventListener('mousedown', function() {
    is_mouse_down = true;
    switchButton()

});
document.addEventListener('mouseup', function() {
    is_mouse_down = false;
    did_mouse_click_button = false;
    button_down_element.style.display = "none";
    button_up_element.style.display = "block";
});
document.addEventListener('mouseleave', function() {
    is_mouse_down = false;
    did_mouse_click_button = false;
    button_down_element.style.display = "none";
    button_up_element.style.display = "block";
});

if (localStorage.getItem("how_many_times") !== null) {
  // does
  storage_on_load = localStorage.getItem("how_many_times");
  storage_on_load_as_number = parseInt(storage_on_load,10);
  num_times += storage_on_load_as_number;
  all_prompts = localStorage.getItem("prompts")
  all_responses = localStorage.getItem("responses")


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
  localStorage.setItem("prompts",all_prompts)
  localStorage.setItem("responses",all_responses)
}
sizeSparkles()

// document.getElementById("generateBtn").onclick = () => {
//   const output = document.getElementById("output");
//   output.textContent = "Button clicked! 🎉 No API call made.";
// };


function sizeSparkles(){
    var random_size = Math.floor(Math.random() * 60)
    random_size += 40
    var stars_list = document.querySelectorAll('.a-sparkle')
    for (var star of stars_list){
        var random_size = Math.floor(Math.random() * 80)
        random_size += 20
        star.style.width = random_size + "%"
    }
}

// ml per 1 prompt: 0.26 milliliters of water
// 0.000000000000000000000000619047619%
async function clicked(){
    did_mouse_click_button = true;
    //fixing count and updating ls
    num_times += 1;
    var current_ls = localStorage.getItem("how_many_times")
    up_by_one = parseInt(current_ls,10) + 1;
    localStorage.setItem("how_many_times",up_by_one);

    //change stats
    const counter = document.getElementById("counter");
    counter.textContent = (0.26 * up_by_one)

    const percentage = document.getElementById("percentage");
    var long_num = (0.000000000000000000000000619047619 * up_by_one)
    var fixed_digits = long_num.toFixed(33);
    percentage.textContent = fixed_digits;

    //actually cause harm
    try {
        const res = await fetch("/api/generate");
        const data = await res.json();
        all_prompts.push(data.prompt)
        all_responses.push(data.response)
        localStorage.setItem("prompts",all_prompts)
        localStorage.setItem("responses",all_responses)
        showMe()
        console.log(data.prompt)
        console.log(data.response)
    } catch (err) {
        console.log = "Error: " + err.message;
    }

}

function switchButton(){

    if (is_mouse_down && did_mouse_click_button){
        button_down_element.style.display = "block";
        button_up_element.style.display = "none";
    }
}

showMe()

function showMe(){
    console.log("trying to show")
    if(document.getElementById("put-generated-here")){
        var put_here = document.getElementById("put-generated-here")
        for (let i = 0; i < all_prompts.length; i++){
            put_here.textContent += "YOU ASKED: " + all_prompts[i]
            put_here.textContent += "AI ANSWERED: " + all_responses[i]
        }
    }
}