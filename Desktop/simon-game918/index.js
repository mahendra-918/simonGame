
var buttonColors = ["red", "green", "blue", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;

document.addEventListener("keypress", function () {
    if (!started) {
        document.getElementById("level-title").textContent = "Level - " + level;
        nextSequence();
        started = true;
    }
});

var buttons = document.querySelectorAll(".btn");
buttons.forEach(function (button) {
    button.addEventListener("click", function () {
        var userChosenColour = this.id;
        userClickedPattern.push(userChosenColour);

        playSound(userChosenColour);
        animatePress(userChosenColour);
        checkAnswer(userClickedPattern.length - 1);
    });
});

function nextSequence() {
    userClickedPattern = [];
    level++;
    document.getElementById("level-title").textContent = "Level - " + level;

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);

    var chosenButton = document.getElementById(randomChosenColour);
    chosenButton.classList.add("blink");
    setTimeout(function () {
        chosenButton.classList.remove("blink");
    }, 400);

    playSound(randomChosenColour);
}


function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    var button = document.getElementById(currentColour);
    button.classList.add("pressed");
    setTimeout(function () {
        button.classList.remove("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();

        document.body.classList.add("game-over");
        setTimeout(function () {
            document.body.classList.remove("game-over");
        }, 200);

        document.getElementById("level-title").textContent = "Game Over, Press Any Key to Restart";
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
