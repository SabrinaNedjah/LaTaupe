var compte = 10;
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
	let maxWidth = $('.canvas').width();
	let maxHeight = $('.canvas').height();
	var x = 0;
	x = Math.floor(Math.random() * 9);

	var cases = document.querySelectorAll('.case');
	for(var i = 0; i < cases.length ; i++){
		$('.case' + [i]).text('');
	}
	
	$('.case' + [x]).html('<div id="taupe"><img src="images/Taupiqueur.png" alt="topiqueur"/></div>');
	console.log(x);
$('.case' + [x]).click(function(){

JouerSon();
	compteurDePoint++;
	$('#score').text(compteurDePoint);
});
	
}

function JouerSon() {
            var sound = document.getElementById("beep");
            sound.play();
        }

