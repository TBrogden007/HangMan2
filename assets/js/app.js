     // Begin Step 1 code- variables
var input = $("#input"); // text area for input
var man = $("#man"); // Hangman drawing
var wordDisplay = $("#wordDisplay"); // partial word display
var action = $("#action"); // win or lose section
var keyboard = $("#keyboard"); // win or lose section

var guesses = 0; // Number of wrong guesses made

var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'x', 'z'];

var wordlist = ["deathstar", "jedi", "sith", "driods", "stormtrooper", "vader","ewok","hansolo","force","dangerous","yoda","hateangerfear","darkside","rebel", "father","clearmind", "lando"];  // wordbank...cheaters

var hangmanArt = // googled and modded, will not work without /n
  [
    ["   | \n"],
    [" (x.x)\n"],
    ["  \\|/\n"],
    ["   | \n"],
    ["  / \\\n"]
  ];


// picks word form array
function createWord(phrase) { 
  word = [];
  for (var i = 0; i < phrase.length; i++) {
    word.push([phrase[i], false])
  }
}

function createKeyboard(alphabet) {
  
  for (var i = 0; i < alphabet.length; i++) {
    var letter = alphabet[i];
    var key = $("<div></div>").addClass("key");
    key.html(letter);
    keyboard.append(key);
    if ( i%9 === 8 ){
      keyboard.append("<br>");
    }
  }
  
  keyboard.click(function (e) {
      var $target = $(e.target);
      var targetLetter = $target.text(); 
      guess(targetLetter);
    })
}

// Takes letter function and checks to see if word object contains it
function guess(letter) { 
  letterFound = false;
  console.log(letter);  //debug
  for (var i = 0; i < word.length; i++) { // iterate through word for matches, change flag to true
    if (word[i][0] === letter) {
      letterFound = true;
      word[i][1] = true;
    }
  }

  if (!letterFound) { // if no letters are found we add 1 wrong to guesses. which is the hangmanArt.length
    guesses++;
  }


  drawMan();
  drawWord();

  if (guesses > hangmanArt.length) {
    document.write("<h1>He's Dead....Game Over press (f5) to play again!</h1>");
  } else if (isSolved()) {
    action.html("<h1>Winner</h1>");
  }

}

function drawMan() {
  var hangmanstate = "";
  for (var i = 0; i < guesses; i++) {
    hangmanstate += hangmanArt[i];
  }

  hangman = "<pre>" + hangmanstate + "</pre>";
  man.html(hangman);
}

function drawWord() { // display on screen
  wordDisplay.html(makeWordString());
}

function isSolved() {
  for (var i = 0; i < word.length; i++) {
    if (word[i][1] === false) {
      return false;
    }
  }
  return true;
}

function makeWordString() { // if i dont do this it keeps giving me undefined answers
  var wordString = "";
  for (var i = 0; i < word.length; i++) {
    if (word[i][1]) {
      wordString = wordString + word[i][0];
    } else {
      wordString = wordString + "_";
    }
  }
  return wordString;
}

// Main
createKeyboard(alphabet);
createWord(wordlist[Math.floor(Math.random() * wordlist.length)]);
drawMan();
drawWord();