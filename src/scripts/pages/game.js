import {
	saveToLocal,
	loadFromLocal,
	removeFromLocal,
} from "/src/scripts/local-saves.js";
import setLocation from "/src/scripts/set-location.js";
import Barbarian from "/src/scripts/templates/character/Barbarian.js";
import Hermit from "/src/scripts/templates/character/Hermit.js";

$(document).ready(function () {
	const data = loadFromLocal("character") || null;
	let character;

	if (!data) {
		alert("Nenhum personagem encontrado. Crie um personagem primeiro.");
		window.location.hash = "/novo-personagem";
		return;
	}

	if (data.profession === "Bárbaro") {
		character = new Barbarian(data.name);
	} else if (data.profession === "Eremita") {
		let petType = data.pet?.type;

		if (petType === "Voador") petType = "FlyingPet";
		else if (petType === "Lutador") petType = "FightingPet";
		else if (petType === "Rastreador") petType = "TrackerPet";
		character = new Hermit(data.name, petType);
	} else {
		alert("Profissão desconhecida. Crie um personagem válido.");
		window.location.hash = "/novo-personagem";
		return;
	}

	character.attributes = data.attributes;
	character.advantages = data.advantages;
	character.maxLifePoints = data.maxLifePoints;
	character.image = data.image;
	character.backpack.items = data.backpack;

	if (character.pet && data.pet) {
		character.pet.maxLifePoints = data.pet.maxLifePoints;
		character.pet.damage = data.pet.damage;
		character.pet.abilities = data.pet.abilities;
	}

	const locationDetails = setLocation();

	$(".game__location").html(`
		<p>Cidade: ${locationDetails.name}</p>
		<p>${locationDetails.size.name}: ${locationDetails.size.description}</p>
		<p>${locationDetails.type.name}: ${locationDetails.type.description}</p>
		`);

	$(".game__character").html(`
		<p>Nome: ${character.name}</p>
		<p>Classe: ${character.profession}</p>
		`);
});
