var temps = 10;
var compte = temps;
var compteurDePoint=0;
//Selection des elements du DOM
var $contener = document.querySelector(".contener");
var $bestscore = document.querySelector("#bestscore");
var $compt = document.querySelector("#compt");
var $score = document.querySelector("#score");
var $button = document.querySelector('.resetBouton');


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
	//sert uniquement à retirer le S à seconde quand on affiche
	if(compte <= 1) {
		pluriel = "";
	} else {
		pluriel = "s";
	}

	// sert à modifier l'affichage du mot "secondes"
	$compt.innerHTML = compte + " seconde" + pluriel;
	// si le compteur est = 0 alors on affiche alerte "c'est fini"
	if(!compte || compte < 0) {
		//ClearInterval interrompt la boucle à la fin du compteur
		reset();

		if(compteurDePoint > localStorage.getItem('score')){
			localStorage.setItem('score', compteurDePoint);
			$bestscore.textContent = 'Score : ' + compteurDePoint;
		}


	}
	//on diminue de 1 seconde
	compte--;
}
let timer = setInterval(decompte,1000);
let taupe = setInterval(positionAleatoire,1000);

// MARTEAU SOURIS



/* $('div').mouseup(function() {
	$('.canvas').css({
		cursor: "url('../images/Marteau_TFH.png'), pointer",
	});
});


$('div').mousedown(function() {
	$('.canvas').css({
		cursor: "url('../images/Marteau.Click.png'), pointer",
	});
});
*/

// POSITION ALEATOIRE TAUPE
function positionAleatoire() {
	var $cases = document.querySelectorAll('.case');
	// on peut cliquer que là où y a le topiqueur et on peut pas cliquer deux fois sur la même case
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
	compteurDePoint -=10;
	if(compteurDePoint <0){
		compteurDePoint =0
	}
	$score.textContent = compteurDePoint;
	event.currentTarget.removeEventListener('click', losePoints);
}

function earnPoints(event){
	/*    JouerSon(); */

	compteurDePoint ++;
	$score.textContent = compteurDePoint;
	event.currentTarget.removeEventListener('click', earnPoints);
}

/*function JouerSon() {
	var sound = document.getElementById("beep");
	sound.play();
} */

//BOUTON RETOUR
function reset(){
	// crée une variable pour eviter de reannalyser tout le dom
	$button.classList.remove("reset");
	$button.addEventListener('click', resetGame);
	clearInterval(timer);
	clearInterval(taupe);
}

function resetGame(){
	compteurDePoint = 0;
	compte = temps;
	$score.textContent = compteurDePoint;
	timer = setInterval(decompte,1000);
	taupe = setInterval(positionAleatoire,1000);
	$button.removeEventListener('click', resetGame);
	$button.classList.add('reset');
}
function gameOver(event){
	event.currentTarget.removeEventListener('click', gameOver);
	alert("GAME OVER");
	reset();
}