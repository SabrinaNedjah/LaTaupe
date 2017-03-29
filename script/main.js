var temps = 60;
var compte = temps;
var compteurDePoint=0;


if(localStorage.getItem('score')){
	$('#bestscore').text('Score : ' + localStorage.getItem('score'));
}
else{
	localStorage.setItem('score', 0);
	$('#bestscore').text('Score : 0');
}

function decompte(){
	//sert uniquement à retirer le S à seconde quand on affiche
	if(compte <= 1) {
		pluriel = "";
	} else {
		pluriel = "s";
	}
	// sert à modifier l'affichage du mot "secondes"
	$("#compt")[0].innerHTML = compte + " seconde" + pluriel;

	// si le compteur est = 0 alors on affiche alerte "c'est fini"
	if(compte == 0 || compte < 0) {
		compte = 0;
		//ClearInterval interrompt la boucle à la fin du compteur
		clearInterval(timer);
		clearInterval(t);
		reset()

		if(compteurDePoint > localStorage.getItem('score')){
			localStorage.setItem('score', compteurDePoint);
			$('#bestscore').text('Score : ' + compteurDePoint)
		}


	}
	//on diminue de 1 seconde
	compte--;
}

let timer = setInterval(decompte,1000);
let t = setInterval(positionAleatoire,1000);

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

	// on peut cliquer que là où y a le topiqueur et on peut pas cliquer deux fois sur la même case
	$('.case').off('click');
	let maxWidth = $('.contener').width();
	let maxHeight = $('.contener').height();
	var x = 0;
	x = Math.floor(Math.random() * 9);

	var cases = document.querySelectorAll('.case');
	for(var i = 0; i < cases.length ; i++){
		$('.case' + [i]).text('');
	}

	$('.case' + [x]).html('<div id="taupe"><img src="images/Taupiqueur.png" alt="topiqueur"/></div>');

	$('.case' + [x]).click(function(){

		/*	JouerSon(); */
		compteurDePoint++;
		$('#score').text(compteurDePoint);

		//annule le probleme des cases clickable quand le topiqueur est passé dessus
		$('.case' + [x]).off('click');


	});
	var min = 1;
	var max = 4;
	var nbrRandom = 1 + Math.floor(Math.random() * 4);
	console.log(nbrRandom);
	if(nbrRandom==2) {
		$('.case'+ [x]).html('<div id="darktaupe"><img src="images/darkTaupiqueur.png" alt="darktopiqueur"/></div>');
		$('.case' + [x]).click(perteDePoints);

	}	else 

		$('.case' + [x]).html('<div id="taupe"><img src="images/Taupiqueur.png" alt="topiqueur"/></div>');

	$('.case'+[x]).click(gainDePoints);


}



function perteDePoints(){
	/*	JouerSon(); */

	compteurDePoint -=10;

	$('#score').text(compteurDePoint);
	$('.case' + [x]).off('click');
}

function gainDePoints(){
	/*	JouerSon(); */

	compteurDePoint++;
	$('#score').text(compteurDePoint);
	$('.case'+ [x]).off('click');
}






/*function JouerSon() {
	var sound = document.getElementById("beep");
	sound.play();
} */

//BOUTON RETOUR

function reset(){
	// crée une variable pour eviter de reannalyser tout le dom
	var button = $('.resetBouton');
	button.removeClass( "reset" );
	button.click(function() {
		compteurDePoint = 0;
		compte = temps;
		$('#score').text(compteurDePoint)
		timer = setInterval(decompte,1000);
		t = setInterval(positionAleatoire,1000);
		button.off('click');
		button.addClass('reset');
	});

};
