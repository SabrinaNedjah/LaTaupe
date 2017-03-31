var time = 60;
var compte = time;
var pointCounter;
var timer;
var taupe;

// Only select DOM elements.
var $contener = document.querySelector('.cases');
var $bestScore = document.querySelector('.bestScore');
var $compt = document.querySelector('.remainingTime');
var $score = document.querySelector('.currentScore');
var $resetButton = document.querySelector('.resetButton');
var $game = document.querySelector('.game');



for (var i = 0; i <= 8; i++) {
  $contener.innerHTML += '<div class="xs-4"><div class="case"></div></div>';
}

if (localStorage.getItem('score')) {
  $bestScore.textContent = localStorage.getItem('score');
} else {
  localStorage.setItem('score', 0);
  $bestScore.textContent = '0';
}

function decompte() {
  if (compte <= 1) {
    pluriel = '';
  } else {
    pluriel = 's';
  }
  $compt.innerHTML = compte + ' seconde' + pluriel;

  if (compte <= 0) {
    reset();
    reset.innerHTML = 'Rejouer';
    $compt.innerHTML = 'Terminé';

    if (pointCounter > localStorage.getItem('score')) {
      console.log('test')
      localStorage.setItem('score', pointCounter);
      $bestScore.textContent = pointCounter;
    }
  }
  // Decrease 1 point.
  compte--;
}

$resetButton.addEventListener('click', resetGame);

// Update cursor.
$game.addEventListener('mouseup', function() {
  $game.style.cursor = "url('./images/hammer.png') 43 43, pointer";
});

$game.addEventListener('mousedown',function () {
  $game.style.cursor = "url('./images/hammerClick.png') 43 43, pointer";
});

// Handle the random position of the taupes.
function randomPosition() {
  var $cases = document.querySelectorAll('.case');
  // cannot click 2 times
  for (var i = 0; i < $cases.length; i++) {
    $cases[i].removeEventListener('click', losePoints);
    $cases[i].removeEventListener('click', earnPoints);
    $cases[i].removeEventListener('click', gameOver);
    $cases[i].innerHTML = '';
  }

  var x = Math.floor(Math.random() * 9);
  var min = 1;
  var max = 7;
  var nbrRandom = min + Math.floor(Math.random() * max);

  if (nbrRandom === 2) {
    $cases[x].innerHTML = '<img class="mole" src="images/moleThug.png" alt="Taupe thug" / >';
    $cases[x].addEventListener('click', losePoints);
  } else if (nbrRandom === 6) {
    $cases[
      x
    ].innerHTML = '<img class="mole" src="images/bomb.png" alt="Bombe" / >';
    $cases[x].addEventListener('click', gameOver);
  } else {
    $cases[
      x
    ].innerHTML = '<img class="mole" src="images/mole.png" alt="Taupe" / >';
    $cases[x].addEventListener('click', earnPoints);
  }
}

// Handle the points when the user loses by clicking the wrong taupe.
function losePoints(event) {
  pointCounter -= 10;

  if (pointCounter < 0) {
    pointCounter = 0;
  }

  $score.textContent = pointCounter;
  event.currentTarget.removeEventListener('click', losePoints);
}

// Handle the points when the user wins.
function earnPoints(event) {
  let moleSound = document.querySelector('.moleSound');
  moleSound.play();
  pointCounter++;
  $score.textContent = pointCounter;
  event.currentTarget.removeEventListener('click', earnPoints);
}

// Handle the points when the user loses the game.
function gameOver(event) {
  let bombSound = document.querySelector('.bombSound');
  bombSound.play();
  event.currentTarget.removeEventListener('click', gameOver);
  reset();
  $compt.innerHTML = 'Game over';
}


// Reset the game.
function reset() {
  clearInterval(timer);
  clearInterval(taupe);

  $resetButton.classList.remove('reset');
  $resetButton.addEventListener('click', resetGame);
}

// Run another game.
function resetGame() {
  $resetButton.textContent = 'Rejouer';
  pointCounter = 0;
  compte = time;
  $score.textContent = pointCounter;
  timer = setInterval(decompte, 1000);
  taupe = setInterval(randomPosition, 700);
  $resetButton.removeEventListener('click', resetGame);
  $resetButton.classList.add('reset');
}

// Function mute

var audio = document.querySelectorAll('audio');
var buttonMute = document.querySelector('.mute');

buttonMute.addEventListener(
  'click',
  function(){
    for(let i = 0; i < audio.length; i++){
      if(audio[i].muted){
        audio[i].muted = false;
        buttonMute.innerHTML = '<img src="images/speaker.png" alt="Haut parleur" />';
      } else{
        audio[i].muted = true;
        buttonMute.innerHTML = '<img src="images/speakerMute.png" alt="Haut parleur muet" />';
      }
    }
  },
  false
);
