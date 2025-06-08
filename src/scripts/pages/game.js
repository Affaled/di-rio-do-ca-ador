import {
	saveToLocal,
	loadFromLocal,
	removeFromLocal,
} from "/src/scripts/local-saves.js";
import setLocation from "/src/scripts/set-location.js";
import Barbarian from "/src/scripts/templates/character/Barbarian.js";
import Hermit from "/src/scripts/templates/character/Hermit.js";
import Rexian from "../templates/beast/Rexian.js";
import beastCreate from "../beast-create.js";

function renderCharacterStatus(character) {
	$(".game__character").html(`
		<div style="display: flex; align-items: center; gap: 1rem;">
			<img src="${
				character.image
			}" alt="Personagem" style="width: 120px; height: 120px; object-fit: contain; border: 2px solid #a68763; border-radius: 12px; background: #222;"/>
			<div style="flex:1;">
				<p><strong>Nome:</strong> ${character.name}</p>
				<p><strong>Profissão:</strong> ${character.profession}</p>
				<p><strong>Pet:</strong> ${character.pet ? character.pet.type : "Nenhum"}</p>
				<div style="display: flex; align-items: center; gap: 0.5rem;">
					<label>Vida:</label>
					<div class="bar bar--life" style="flex:1;">
						<div class="bar__fill" style="width: ${
							(character.lifePoints / character.maxLifePoints) * 100
						}%"></div>
					</div>
					<span>${character.lifePoints} / ${character.maxLifePoints}</span>
				</div>
				<div style="display: flex; align-items: center; gap: 0.5rem;">
					<label>Estamina:</label>
					<div class="bar bar--stamina" style="flex:1;">
						<div class="bar__fill" style="width: ${
							((6 - (character.weariness || 0)) / 6) * 100
						}%"></div>
					</div>
					<span>${6 - (character.weariness || 0)} / 6</span>
				</div>
				${
					character.pet
						? `
					<div style="margin-top: 0.5rem; padding-top: 0.5rem; border-top: 1px solid #a68763;">
						<p><strong>Pet: ${character.pet.type}</strong></p>
						<div style="display: flex; align-items: center; gap: 0.5rem;">
							<label>Vida Pet:</label>
							<div class="bar bar--life" style="flex:1;">
								<div class="bar__fill" style="width: ${
									(character.pet.lifePoints / character.pet.maxLifePoints) * 100
								}%"></div>
							</div>
							<span>${character.pet.lifePoints} / ${character.pet.maxLifePoints}</span>
						</div>
					</div>
				`
						: ""
				}
			</div>
		</div>
	`);
}

$(document).ready(function () {
	const data = loadFromLocal("character") || null;
	let save = loadFromLocal("save");
	let locationDetails;

	let beast;
	if (!save) {
		locationDetails = setLocation();
		const beastDetails = beastCreate();
		beast = new Rexian(beastDetails.element, beastDetails.weakness);
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
			beast: {
				type: "Rexian",
				element: beastDetails.element,
				weakness: beastDetails.weakness,
				lifePoints: 100,
				maxLifePoints: 100,
			},
		};
		saveToLocal("save", saveData);
		save = saveData;
	} else {
		locationDetails = {
			name: save.cityName,
			size: save.citySize,
			type: save.cityType,
		};
		beast = new Rexian(save.beast.element, save.beast.weakness);
		if (save.beast.lifePoints !== undefined) {
			beast.lifePoints = save.beast.lifePoints;
		}
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
		character = new Hermit(data.name, petType);
	} else {
		alert("Profissão desconhecida. Crie um personagem válido.");
		window.location.hash = "/novo-personagem";
		return;
	}

	character.attributes = data.attributes;
	character.advantages = data.advantages;
	character.maxLifePoints = data.maxLifePoints;
	character.lifePoints =
		data.lifePoints !== undefined && data.lifePoints > 0
			? data.lifePoints
			: character.maxLifePoints;
	character.weariness =
		data.weariness !== undefined && data.weariness >= 0 ? data.weariness : 0;
	character.image = data.image;
	character.backpack.items = data.backpack || [];

	if (data.equipment) {
		character.equipment.slots =
			data.equipment.slots || character.equipment.slots;

		Object.values(character.equipment.slots).forEach((slot) => {
			if (Array.isArray(slot)) {
				slot.forEach((item) => {
					if (item) item.equipped = true;
				});
			} else if (slot) {
				slot.equipped = true;
			}
		});
	}

	if (character.pet && data.pet) {
		character.pet.maxLifePoints = data.pet.maxLifePoints;
		character.pet.lifePoints =
			data.pet.lifePoints !== undefined && data.pet.lifePoints > 0
				? data.pet.lifePoints
				: character.pet.maxLifePoints;
		character.pet.damage = data.pet.damage;
		character.pet.abilities = data.pet.abilities;
	}

	character.updateAtaques();

	window.gameCharacter = character;
	console.log("Character set globally:", character);

	function updateSidebar() {
		if (!character) {
			console.warn("Character not initialized");
			return;
		}

		renderCharacterStatus({
			...character,
			lifePoints: character.lifePoints,
			maxLifePoints: character.maxLifePoints,
			weariness: character.weariness || 0,
			pet: character.pet
				? {
						...character.pet,
						lifePoints: character.pet.lifePoints,
						maxLifePoints: character.pet.maxLifePoints,
				  }
				: null,
		});

		$(".game__backpack").html(`
			<h3 style="margin-bottom: 0.5rem;">Mochila</h3>
			<ul>
				${character.backpack.items.map((item) => `<li>${item.name}</li>`).join("")}
			</ul>
		`);

		const characterData = {
			name: character.name,
			profession: character.profession,
			attributes: character.attributes,
			advantages: character.advantages,
			maxLifePoints: character.maxLifePoints,
			lifePoints: character.lifePoints,
			weariness: character.weariness,
			image: character.image,
			backpack: character.backpack.items,
			equipment: {
				slots: character.equipment.slots,
			},
			pet: character.pet
				? {
						type: character.pet.type,
						maxLifePoints: character.pet.maxLifePoints,
						lifePoints: character.pet.lifePoints,
						damage: character.pet.damage,
						abilities: character.pet.abilities,
				  }
				: null,
		};
		saveToLocal("character", characterData);

		if (save) {
			save.beast.lifePoints = beast.lifePoints;
			saveToLocal("save", save);
		}
	}

	updateSidebar();

	$(".game__location").html(`
		<p>Cidade: ${save.cityName}</p>
		<p>${locationDetails.size.name}: ${locationDetails.size.description}</p>
		<p>${locationDetails.type.name}: ${locationDetails.type.description}</p>
	`);

	window.updateGameSidebar = updateSidebar;

	if (character) {
		const origReceberDano = character.receberDano;
		character.receberDano = function (...args) {
			const result = origReceberDano.apply(this, args);
			setTimeout(() => window.updateGameSidebar(), 100);
			return result;
		};
		const origBeberPocao = character.beberPocao;
		character.beberPocao = function (...args) {
			const result = origBeberPocao.apply(this, args);
			if (result) {
				setTimeout(() => window.updateGameSidebar(), 100);
			}
			return result;
		};
		const origEsquivar = character.esquivar;
		character.esquivar = function (...args) {
			const result = origEsquivar.apply(this, args);
			setTimeout(() => window.updateGameSidebar(), 100);
			return result;
		};
	}

	$(window).on("focus", updateSidebar);
});
