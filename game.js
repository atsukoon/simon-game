var buttonColours = ["red", "blue", "green", "yellow"];
var randomNum;
var randomChosenColour;
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

// スタート
$(document).keypress(function() {
    if(!started) {
        nextSequence();
        started = true;
    }
})

// 初期化
function startOver() {
    gamePattern = [];
    started = false;
    level = 0;
}

// ユーザクリック
$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    animatePress(userChosenColour);
    playSound(userChosenColour);

    checkAnswer(userClickedPattern.length -1);
})

// 問題
function nextSequence() {
    level++;
    $("h1").text("Level " + level);

    // ユーザの回答を空にする
    userClickedPattern = [];

    randomNum = Math.floor(Math.random()*4);
    randomChosenColour = buttonColours[randomNum];
    gamePattern.push(randomChosenColour);

    setTimeout(function() {
        $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
        playSound(randomChosenColour);
    }, 1000)
}

// 答え合わせ
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        gameOver();
    }
}

function gameOver() {
    playSound("wrong");
    $("h1").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(function() {
        $("body").removeClass("game-over");
    }, 200);

    startOver();
}

function playSound(file) {
    var audio = new Audio("sounds/" + file + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed")
    }, 100);
}
