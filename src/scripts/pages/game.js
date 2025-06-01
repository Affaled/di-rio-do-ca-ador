$(document).ready(function () {
	const character = JSON.parse(localStorage.getItem("character") || "null");
	if (!character) {
		alert("Nenhum personagem encontrado. Crie um personagem primeiro.");
		window.location.hash = "/novo-personagem";
		return;
	}
});
