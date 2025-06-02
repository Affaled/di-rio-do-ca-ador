import {
	saveToLocal,
	loadFromLocal,
	removeFromLocal,
} from "/src/scripts/local-saves.js";
import setLocation from "/src/scripts/set-location.js";

$(document).ready(function () {
	const character = loadFromLocal("character") || null;
	if (!character) {
		alert("Nenhum personagem encontrado. Crie um personagem primeiro.");
		window.location.hash = "/novo-personagem";
		return;
	}

	const locationName = setLocation();

	$(".game__location").html(`<h2>Local: ${locationName}</h2>`);
});
