import Barbarian from "../templates/character/Barbarian.js";
import Hermit from "../templates/character/Hermit.js";
import { FlyingPet, FightingPet, TrackerPet } from "../templates/Pet.js";

$(document).ready(function () {
	const professionSelect = $("#character-profession");
	const characterImage = $("#character-profession-image");
	const characterLife = $("#character-life");
	const characterAdvantages = $("#character-advantages");
	const characterPetBlock = $("#character-pet-block");
	const characterBackpack = $("#character-backpack");

	$("#character-create").on("submit", function (e) {
		e.preventDefault();

		const name = $("#character-name").val();
		const professionKey = $("#character-profession").val();
		let character;

		if (professionKey === "barbarian") {
			character = new Barbarian(name);
		} else if (professionKey === "hermit") {
			const petType = $("#character-pet").val() || "FlyingPet";

			character = new Hermit(name, petType);
		}

		const characterData = {
			name: character.name,
			profession: character.profession,
			attributes: character.attributes,
			advantages: character.advantages,
			maxLifePoints: character.maxLifePoints,
			image: character.image,
			backpack: character.backpack.items,
			pet: character.pet
				? {
						type: character.pet.type,
						maxLifePoints: character.pet.maxLifePoints,
						damage: character.pet.damage,
						abilities: character.pet.abilities,
				  }
				: null,
		};

		localStorage.setItem("characters", JSON.stringify([characterData]));
		alert("Personagem criado e salvo!");
		window.location.hash = "/jogo";
	});

	const professionMap = {
		barbarian: Barbarian,
		hermit: Hermit,
	};

	const petClassMap = {
		FlyingPet: FlyingPet,
		FightingPet: FightingPet,
		TrackerPet: TrackerPet,
	};

	function updateImage() {
		const selectedProfession = $(professionSelect).val();
		const professionClass = professionMap[selectedProfession];
		if (professionClass) {
			$(characterImage).attr("src", professionClass.image);
		}
	}

	function updateLife() {
		const selectedProfession = $(professionSelect).val();
		const professionClass = professionMap[selectedProfession];
		if (professionClass) {
			$(characterLife).attr(
				"placeholder",
				professionClass.initialMaxLifePoints
			);
		}
	}

	function updateAdvantages() {
		const selectedProfession = $(professionSelect).val();
		const professionClass = professionMap[selectedProfession];
		if (professionClass) {
			$(characterAdvantages).empty();
			professionClass.initialAdvantages.forEach((initialAdvantage) => {
				$(characterAdvantages).append(
					`
					<li class="new-character__advantage">
						<div class="new-character__advantage-name">${initialAdvantage.name}:</div>
						<div class="new-character__advantage-text">${initialAdvantage.description}</div>
					</li>
					`
				);
			});
		}
	}

	function updateBackpack() {
		const selectedProfession = $(professionSelect).val();
		const professionClass = professionMap[selectedProfession];
		if (professionClass) {
			$(characterBackpack).empty();
			professionClass.initialItems.forEach((initialItem) => {
				$(characterBackpack).append(
					`
					<li class="new-character__item">
						<div class="new-character__item-name --${initialItem.slotType}">${initialItem.name}</div>
					</li>
					`
				);
			});
		}
	}

	function selectPet() {
		const selectedProfession = $(professionSelect).val();
		if (selectedProfession === "hermit") {
			$(characterPetBlock).html(
				`
				<header class="new-character__header">
					<h2 class="new-character__header-title">
						Pet
					</h2>
					<div class="new-character__header-line"></div>
				</header>
				<label class="new-character__label" for="character-pet">
					<span>Animal Seguidor</span>
					<select name="" id="character-pet">
						<option value="FlyingPet">Voador</option>
						<option value="FightingPet">Lutador</option>
						<option value="TrackerPet">Rastreador</option>
					</select>
				</label>
				<div class="new-character__container--row">
					<label class="new-character__label" for="pet-life">
						<span>Vida</span>
						<input type="number" id="pet-life" disabled />
					</label>
					<label class="new-character__label" for="pet-damage">
						<span>Dano</span>
							<input
								type="number"
								id="pet-damage"
								disabled />
					</label>
				</div>
				<ul class="new-character__advantages--pet" id="pet-abilities"></ul>
				`
			);

			$("#character-pet").on("change", updatePetInfo);
			updatePetInfo();
		} else {
			$(characterPetBlock).empty();
		}
	}

	function updatePetInfo() {
		const selectedProfession = $(professionSelect).val();
		const selectedPet = $("#character-pet").val();
		const petType = petClassMap[selectedPet];
		const petAbilities = $("#pet-abilities");

		if (selectedProfession === "hermit" && petType) {
			$("#pet-life").attr("placeholder", petType.maxLifePoints);
			$("#pet-damage").attr("placeholder", petType.damage.normal);

			$(petAbilities).empty();
			petType.abilities?.forEach((ability) => {
				$(petAbilities).append(
					`
                <li class="new-character__advantage--pet">
                    <div class="new-character__advantage-name--pet">${ability.name}:</div>
                    <div class="new-character__advantage-text--pet">${ability.description}</div>
                </li>
                `
				);
			});
		}
	}

	$(professionSelect).on("change", function () {
		updateImage();
		updateLife();
		updateAdvantages();
		selectPet();
		updatePetInfo();
		updateBackpack();
	});

	$("#character-pet").on("change", updatePetInfo);

	updateImage();
	updateLife();
	updateAdvantages();
	selectPet();
	updatePetInfo();
	updateBackpack();
});
