import { Potion } from "../scripts/templates/Item.js";
import { SementeDeOsuva } from "./Material.js";

export const PoçãoDeVida = new Potion(
	"Poção de vida",
	"Recupera todos os pontos de vida e de fadiga.",
	{ [SementeDeOsuva.name]: 15 },
	function (character) {
		character.lifePoints = character.maxLifePoints;
		character.weariness = 0;
	}
);
