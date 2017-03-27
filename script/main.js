var compte = 10;
function decompte()
{
	//sert uniquement à retirer le S à seconde quand on affiche
	if(compte <= 1) {
		pluriel = "";
	} else {
		pluriel = "s";
	}
	// sert à modifier l'affichage du mot "secondes"
	document.getElementById("compt").innerHTML = compte + " seconde" + pluriel;

	// si le compteur est = 0 alors on affiche alerte "c'est fini"
	if(compte == 0 || compte < 0) {
		compte = 0;
		//ClearInterval interrompt la boucle à la fin du compteur
		clearInterval(timer);
		alert("C'est terminé Votre Score est de : " +compteurDePoint);
	}
	//on diminue de 1 seconde
	compte--;
}
var timer = setInterval('decompte()',1000); 


$('div').mouseup(function() {

	$('div').css({
		cursor: "url('../images/Marteau_TFH.png'), pointer",
	});
});

$('div').mousedown(function() {

	$('div').css({
		cursor: "url('../images/Marteau.Click.png'), pointer",
	});
}); 


function positionAleatoire() {
	var maxWidth = $('div').width();
	var maxHeight = $('div').height();
	var position = {
		x: Math.floor(Math.random() * maxWidth), // Donne à la clé X de l'objet une valeur aléatoire entre 0 et 1440;
		y: Math.floor(Math.random() * maxHeight) // Donne à la clé Y de l'objet une valeur aléatoire entre 0 et 1440;
	}

	$('img').css({
		left: position.x,
		top: position.y
	});
}
setInterval('positionAleatoire()',1500); 

var compteurDePoint=0;
$('img').click(function(){
	compteurDePoint ++;
	$('#score')[0].innerHTML = "Score : " + compteurDePoint;


});













































