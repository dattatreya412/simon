var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var level = 0;
var currentLevel = -1;

$("body").keydown(function(event) {
    console.log("Key Entered -> " + event.key);
    console.log("leavel -> " + level);
    if (level === 0) {
        nextSequence();
    }
});

function checkAnswer() {
    var i = userClickedPattern.length - 1;
    console.log("i->" + i);
    console.log("G-> " + gamePattern);
    console.log("u ->" + userClickedPattern);
    console.log("currentLeavel->" + currentLevel);

    if (userClickedPattern[i] === gamePattern[currentLevel]) {
        console.log("Success");
        if (currentLevel === level - 1) {
            nextSequence();
        }
    } else {
        console.log("Succfailess");

        setTimeout(function() {
            $("h1").text("Game Over! Press Any Key To Restart.");
        }, 100);
        var audio = new Audio("./sounds/wrong.mp3");
        audio.play();
        startOver();
    }
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("h1").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    console.log("G-> " + gamePattern);
    playSound(randomChosenColor);
    animatePress(randomChosenColor);
    currentLevel = -1;
}

$(".btn").click(function() {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    currentLevel++;
    console.log("u ->" + userClickedPattern);
    animatePress(userChosenColor);
    playSound(userChosenColor);
    checkAnswer();
});

function playSound(name) {
    var audioPath = "./sounds/" + name + ".mp3";
    var audio = new Audio(audioPath);
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function startOver() {
    level = 0;
    gamePattern = [];
    currentLevel = -1;
}