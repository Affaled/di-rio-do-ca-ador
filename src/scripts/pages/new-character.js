import Barbarian from "../templates/character/Barbarian.js";
import Hermit from "../templates/character/Hermit.js";

$(document).ready(function () {
	const professionSelect = $("#character-profession");
	const characterImage = $("#character-profession-image");
	const characterLife = $("#character-life");
	const characterAdvantages = $("#character-advantages");

	const professionMap = {
		barbarian: Barbarian,
		hermit: Hermit,
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

	$(professionSelect).on("change", function () {
		updateImage();
		updateLife();
		updateAdvantages();
	});

	updateImage();
	updateLife();
	updateAdvantages();
});
