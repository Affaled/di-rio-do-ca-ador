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
	let save = loadFromLocal("save");
	let locationDetails;

	if (!save) {
		const locationDetails = setLocation();
		const saveData = {
			cityName: locationDetails.name,
			citySize: {
				name: locationDetails.size.name,
				description: locationDetails.size.description,
			},
			cityType: {
				name: locationDetails.type.name,
				description: locationDetails.type.description,
			},
		};
		saveToLocal("save", saveData);
	} else {
		locationDetails = {
			name: save.cityName,
			size: save.citySize,
			type: save.cityType,
		};
	}

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

	$(".game__location").html(`
		<p>Cidade: ${save.cityName}</p>
		<p>${locationDetails.size.name}: ${locationDetails.size.description}</p>
		<p>${locationDetails.type.name}: ${locationDetails.type.description}</p>
		`);

	$(".game__character").html(`
		<p>Nome: ${character.name}</p>
		<p>Profissão: ${character.profession}</p>
		<p>Pet: ${character.pet ? character.pet.type : "Nenhum"}</p>
		<div style="display: flex; width: 100%; gap: 0.5rem; align-items: center;">
        <label>Vida:</label>
        <div class="bar bar--life">
		<div class="bar__fill" style="width: ${
			(character.lifePoints / character.maxLifePoints) * 100
		}%"></div>
        </div>
		</div>
        <span>${character.lifePoints} / ${character.maxLifePoints}</span>
		</div>
			<div style="display: flex; width: 100%; gap: 0.5rem; align-items: center;">
        <label>Estamina:</label>
        <div class="bar bar--stamina">
            <div class="bar__fill" style="width: ${
							(character.weariness !== undefined
								? (6 - character.weariness) / 6
								: 1) * 100
						}%"></div>
        </div>
		</div>
        <span>${character.weariness || 0} / 6</span>
    	</div>
		`);
	$(".game__backpack").html(`
		<ul>
			${character.backpack.items.map((item) => `<li>${item.name}</li>`).join("")}
		</ul>
		`);
});
