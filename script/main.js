var temps = 10;
var compte = temps;
var pointCounter=0;
//ONLY SELECTOR FOR DOM
var $contener = document.querySelector(".contener");
var $bestscore = document.querySelector("#bestscore");
var $compt = document.querySelector("#compt");
var $score = document.querySelector("#score");
var $button = document.querySelector('.resetBouton');
/*var $game = document.querySelector('.game') */


function noSelection()
{
  return false;
}
function selectionOn()
{
  return true;
}
document.onselectstart = new Function ("return false");
if(window.sidebar)
{
  document.onmousedown = noSelection;
  document.onclick = selectionOn;
}

for( var i = 0; i <= 8; i++){
  $contener.innerHTML += "<div class='case case" + i + "'></div>";
}

if(localStorage.getItem('score')){
  $bestscore.textContent = 'Score : ' + localStorage.getItem('score');
}
else{
  localStorage.setItem('score', 0);
  $bestscore.textContent = 'Score : 0';
}

function decompte(){
  if(compte <= 1) {
	pluriel = "";
  } else {
	pluriel = "s";
  }
  $compt.innerHTML = compte + " seconde" + pluriel;
  if(!compte || compte < 0) {
	reset();

	if(pointCounter > localStorage.getItem('score')){
	  localStorage.setItem('score', pointCounter);
	  $bestscore.textContent = 'Score : ' + pointCounter;
	}
  }
  //decrease 1 point
  compte--;
}
let timer = setInterval(decompte,1000);
let taupe = setInterval(randomPosition,1000);


/*$game.onmouseup = function() {
   document.getElementsByClassName("contener").style.cursor = "url('../images/Marteau_TFH.png'), pointer";
};

$game.onmousedown = function() {
 document.getElementsByClassName("contener").style.cursor = "url('../images/Marteau.Click.png'), pointer";
}; */


//RANDOM POSITION
function randomPosition() {
  var $cases = document.querySelectorAll('.case');
  // cannot click 2 times 
  for (var i =0; i< $cases.length; i++){
	$cases[i].removeEventListener('click', losePoints);
	$cases[i].removeEventListener('click', earnPoints);
	$cases[i].innerHTML = '';
  }

  var x = Math.floor(Math.random() * 9);
  var min = 1;
  var max = 7;
  var nbrRandom = min + Math.floor(Math.random() * max);

  if (nbrRandom === 2) {
	$cases[x].innerHTML = '<div id="darktaupe"><img src="images/darkTaupiqueur.png" alt="darktopiqueur"/></div>';
	$cases[x].addEventListener('click', losePoints);
  } else if(nbrRandom ===6) {
	$cases[x].innerHTML = '<div id="darktaupe"><img src="images/Marteau_TFH.png" alt="marteau"/></div>';
	$cases[x].addEventListener('click', gameOver);
  }
  else
  {
	$cases[x].innerHTML = '<div id="taupe"><img src="images/Taupiqueur.png" alt="t opiqueur"/></div>';
	$cases[x].addEventListener('click', earnPoints);
  }
}

function losePoints(event){
  /*	JouerSon(); */
  pointCounter -=10;
  if(pointCounter <0){
	pointCounter =0
  }
  $score.textContent = pointCounter;
  event.currentTarget.removeEventListener('click', losePoints);
}

function earnPoints(event){
  /*    JouerSon(); */

  pointCounter ++;
  $score.textContent = pointCounter;
  event.currentTarget.removeEventListener('click', earnPoints);
}

/*function JouerSon() {
	var sound = document.getElementById("beep");
	sound.play();
} */

// RESET BUTTON
function reset(){
  $button.classList.remove("reset");
  $button.addEventListener('click', resetGame);
  clearInterval(timer);
  clearInterval(taupe);
}

function resetGame(){
  pointCounter = 0;
  compte = temps;
  $score.textContent = pointCounter;
  timer = setInterval(decompte,1000);
  taupe = setInterval(randomPosition,1000);
  $button.removeEventListener('click', resetGame);
  $button.classList.add('reset');
}
function gameOver(event){
  event.currentTarget.removeEventListener('click', gameOver);
  alert("GAME OVER");
  reset();

}