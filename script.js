// Color Change Reset Button
jQuery(function ($) {
    function changeTitleColor(selector, colors, time) {
        var curCol = 0,
            timer = setInterval(function () {
                if (curCol === colors.length) curCol = 0;
                $(selector).css("color", colors[curCol]);
                curCol++;
            }, time);
    }
    $(window).load(function () {
        changeTitleColor(".buttonColor", generateRandomColors(10), 3000);
    });
});
// Vars
var numSquares = 6;
var colors = [];
var pickedColor;
// Selectors
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.getElementById("message");
var h1 = document.querySelector("h1");
var resetButton = document.getElementById("reset");
var modeButtons = document.querySelectorAll(".mode");
//Start Up
init();
// Reset Button Setup
resetButton.addEventListener("click", function(){
  // reset buttonColor change
  this.classList.add("buttonColor")
  // reset function
  reset();
});
// Functions
function init(){
  // Mode Buttons Event Listeners
  setUpMode();
  // Square Buttons Event Listeners
  setUpSquares();
  // Reset
  reset();
}

function setUpMode (){
  for(i = 0; i < modeButtons.length; i++){
    modeButtons[i].addEventListener("click", function(){
      modeButtons[0].classList.remove("selected");
      modeButtons[1].classList.remove("selected");
      this.classList.add("selected");
      this.textContent === 'Easy' ? numSquares = 3: numSquares = 6;
      reset();
    });
  }
}

function setUpSquares(){
  for(var i = 0; i < squares.length; i++){
    // Add click listeners to squares
    squares[i].addEventListener("click", function(){
      // Grab color of clicked square
    var clickedColor = this.style.backgroundColor;
    // Compare color to pickedColor
    if(clickedColor === pickedColor){
      messageDisplay.textContent = "Correct"
      resetButton.textContent = "Play again?"
      changeColors(clickedColor);
      h1.classList.remove("container")
      h1.style.backgroundColor = clickedColor;
      resetButton.classList.remove("buttonColor")
      resetButton.style.color = clickedColor;
    }else{
      this.style.backgroundColor = "#232323"
      messageDisplay.textContent = "Try Again"
    }
    });
  }
}

function changeColors(color){
  // Loop through all squares
  for(var i = 0; i < squares.length; i++){
  // Change each color to pickedColor
  squares[i].style.backgroundColor = color;
  }
}

function pickColor(){
  var random = Math.floor(Math.random() * colors.length)
  return colors[random];
}

function generateRandomColors(num){
  // make an array
  var arr = [];
  // repeat num times
  for(var i = 0; i < num; i++){
    // get random color
    arr.push(randomColor());
  }
  // return array
  return arr;
}

function randomColor(){
  // pick a red from 0 to 255
  var r = Math.floor(Math.random() * 256);
  // pick a green from 0 to 255
  var g = Math.floor(Math.random() * 256);
  // pick a blue from 0 to 255
  var b = Math.floor(Math.random() * 256);
  // return rgb
  return "rgb(" + r + "," + " " + g + "," + " " + b + ")";
}

function reset(){
  // reset header color
  h1.style.backgroundColor = "rgb(90, 107, 115)";
  // generate all new colors
  colors = generateRandomColors(numSquares);
  // pick a new random color from array
  pickedColor = pickColor();
  // change colorDisplay to match pickedColor
  colorDisplay.textContent = pickedColor;
  // reset stripe
  resetButton.textContent = "New Colors";
  messageDisplay.textContent = " ";
  // change color of squares
  for(var i = 0; i < squares.length; i++){
    if(colors[i]){
      squares[i].style.display = "block";
      squares[i].style.backgroundColor = colors[i];
    } else {
      squares[i].style.display = "none";
    }
  }
}
