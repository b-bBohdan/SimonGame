 

var buttonColours = ["red", "blue", "green", "yellow"];
var gameStarted = false;
var level = 0;
var gamePattern = [];

var userClickedPattern = [];


$(document).keydown(function(event){
    if (!gameStarted){
        nextSequence()
        gameStarted = true;
        $("h1").text("level "+level);
    }
})

function nextSequence() {
  userClickedPattern = [];
  $("h1").text("level "+level);

  level++;
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  //1. Use jQuery to select the button with the same id as the randomChosenColour
  //2. Use Google/Stackoverflow to figure out how you can use jQuery to animate a flash to the button selected in step 1.
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  //3. Use Google/Stackoverflow to figure out how you can use Javascript to play the sound for the button colour selected in step 1.
  playSound(randomChosenColour);

}




 
$(".btn").click(function() {
   
 
  var userChosenColour = $(this).attr("id");
  animatePress(userChosenColour);
  playSound(userChosenColour);
  
  userClickedPattern.push(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
  //console.log(userClickedPattern);
  

});

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    
    $(`#${currentColour}`).addClass("pressed");

    setTimeout(function() {
        $(`#${currentColour}`).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] == userClickedPattern[currentLevel] ){
       
        if (userClickedPattern.length === gamePattern.length){
            //5. Call nextSequence() after a 1000 millisecond delay.
            setTimeout(function () {
              nextSequence();
            }, 1000);
    
          }
    }
    else{
         
        const audiO = new Audio("sounds/wrong.mp3");
        audiO.play();
        $("body").addClass("game-over");
        setTimeout(function(){
        
            $("body").removeClass("game-over");
            $("h1").text("Game Over, Press Any Key to Restart");

        }, 100)
        startOver();

    }

}

function startOver(){
    level = 0;
    gamePattern = [];
    gameStarted = false;
}