// function disableMusic() {
//     document.getElementById("disablemusic").style.visibility = "hidden";
//     document.getElementById("activatemusic").style.visibility = "visible";
// }

// function activeMusic() {
//     document.getElementById("activatemusic").style.visibility = "hidden";
//     document.getElementById("disablemusic").style.visibility = "visible";
// }

var names = [
    "absurd",
    "luxury", "syndrome", "azure", "unknown", "gossip", "queue", "crypt", "xylophone", "zigzag", "exodus", "espionage", "wristwatch", "whiskey", "wheezy", "quixotic", "jockey", "flapjack", "zombie", "spritz", "squawk", "kilobyte", "buzzard", "buffon"
]
var wins = 0;
var chances = 9;
var guesses = [];
var answer = [];
var answer_array = [];
var display_array = [];

function choose_name() {
    answer = names[Math.floor(Math.random() * names.length)];
    answer_array = [...answer];
    display_array = [];
    for (let i = 0; i < answer_array.length; i++) {
        display_array.push('_');
    }
}

choose_name();

var win_display = document.querySelector('#wins');
var word_display = document.querySelector('#current-word');
var chances_display = document.querySelector('#guesses-remaining');
var guessed_display = document.querySelector('#guessed-letters');

console.log(answer);

function display() {
    win_display.innerHTML = "Wins " + wins;
    word_display.innerHTML = display_array.join(' ');
    chances_display.innerHTML = chances;
}

display();

function reset_game() {
    guesses = [];
    guessed_display.innerHTML = guesses.join(',');
    chances = 9;
    choose_name();
    word_display.innerHTML = display_array.join(' ');
    display();
}

function win() {
    wins++;
    reset_game();
}

function show_guesses(x) {
    guesses.push(x);
    guessed_display.innerHTML = guesses.join(',');
}

window.onkeypress = function(e) {
    var user_choice = e.key;
    if (guesses.includes(user_choice) || guesses.includes(user_choice.toLowerCase())) {
        return;
    }
    var victory = true;
    var isEqual = false;
    for (let i = 0; i < answer_array.length; i++) {
        if (user_choice === answer_array[i] || user_choice.toUpperCase() === answer_array[i]) {
            display_array[i] = answer_array[i];
            isEqual = true;
        }
        if (answer_array[i] !== display_array[i]) {
            victory = false;
        }
    }
    if (isEqual) {

    } else {
        chances--;
        show_guesses(user_choice);
        if (chances === 0) {
            reset_game();
            return;
        }
    }

    if (victory) {
        win();
    }

    display();
}