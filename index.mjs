// Do not change the import statement
// This statement imports the exported file so its contents are accessible to us
// This makes the "placeholderQuestions" act like a variable essentially
import placeholderQuestions from "./placeholder-questions.js";

//! Uncaught SyntaxError: Cannot use import statement outside a module
// While working in office hours both myself and Dan ran into this import problem. After research module seems to be the fix.
// Simple as renaming my index.js to .mjs and it works
// Thanks node for beng weird

let questionCard = document.getElementsByClassName("questionCard");
let questionCard1 = document.getElementsByClassName("questionCard1");
let questionCard2 = document.getElementsByClassName("questionCard2");
let questionCard3 = document.getElementsByClassName("questionCard3");
let questionCard4 = document.getElementsByClassName("questionCard4");
let questionCard5 = document.getElementsByClassName("questionCard5");
let questionCard6 = document.getElementsByClassName("questionCard6");
let scoreBoard = document.getElementsByClassName("scoreBoard"); // did not get this far
let submitButton = document.getElementsByClassName("submitButton"); // did not get this far
let cardAnswer;

let playerOne = {
  points: "", // start with nothing
  turn: false,
}

let playerTwo = {
  points: "", // start with nothing
  turn: false,
}

// Player turn round
async function fetchQuestion() {
    return fetch("./questions.json")
        .then(res => res.json())
    }
    
    fetchQuestion().then(data => { // data processing below
        let question = data.placeholderQuestions;
        console.log(question)
    })
    .catch(res => console.error(err));

  // array of questions/answers
  let nature = [];
    nature.push(questionCard[x].question + " " + questionCard[x].answer);
  
  let animals = [];
    animals.push(questionCard[x].question + " " + questionCard[x].answer);
  
  let computers = [];
    computers.push(questionCard[x].question + " " + questionCard[x].answer);
  
  let mythology = [];
    mythology.push(questionCard[x].question + " " + questionCard[x].answer);
  
  let history = [];
    history.push(questionCard[x].question + " " + questionCard[x].answer);
  
  let general = [];
    general.push(questionCard[x].question + " " + questionCard[x].answer);
  
  let final = [];
    final.push(questionCard[x].question + " " + questionCard[x].answer);

// First attempt to addEventListener and pull from JSON
  if (questionCard1) {
    questionCard1.addEventListener("click", (x) => {
      click = x.target;
      value = questionCard.textContent;
      questionCard1.textContent = // ??
      cardAnswer = // ??
      console.log(cardAnswer);
      guess();
    });
  }


function guess() {
  // event listener 
  // check input answer === card answer
  // scrub for upper and lowercase
}

function close() {
  // how do I close
  // what even am I closing
}

fetchQuestion();
// Event listener


fetchQuestion().then(data => { // data processing below
    let question = data.placeholderQuestions;
    console.log(question)
})
.catch(res => console.error(err));

//! really happy with this one, unfortunately plugging in the data got me good
async function fetchQuestion() {
  // Make each thing simple as possible, splitting responsibilities for ez debug
  // function fetches data and no more
  const response = await fetch("./questions.json");
  const data = await response.json();

  return data;
}

try {
    const questions = await fetchQuestion();
    const placeholderQuestions = questions.placeholderQuestions

    console.log(`Questions: ${JSON.stringify(placeholderQuestions, null, '\t')}`);
} catch (err) {
    console.log(err);
    debugger;
}

