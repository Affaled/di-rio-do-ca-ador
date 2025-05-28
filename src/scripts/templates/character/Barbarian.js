import Character from "./Character.js";
import { Machado, ArcoSimples } from "../../../database/Weapons.js";
import { PoçãoDeVida } from "../../../database/Potions.js";

export default class Barbarian extends Character {
	static profession = "Bárbaro";
	static initialAttributes = {
		climb: 1,
		social: -1,
	};
	static initialAdvantages = [
		{
			name: "Incivilizado",
			description:
				"Você não é bem visto na sociedade, role apenas dois dados na etapa de investigação.",
		},
		{
			name: "Força",
			description: "Quando escalar a besta, você pode rolar um dado a mais.",
		},
	];
	static initialMaxLifePoints = 30;
	static initialItens = [Machado, ArcoSimples, PoçãoDeVida, PoçãoDeVida];
	static image = "/src/assets/images/barbarian-image.png";

	constructor(name) {
		super(
			name,
			Barbarian.profession,
			Barbarian.initialAttributes,
			Barbarian.initialAdvantages,
			Barbarian.initialMaxLifePoints,
			Barbarian.image
		);

		Barbarian.initialItens.forEach((item) => {
			this.backpack.addItem(item);
		});
	}
}
