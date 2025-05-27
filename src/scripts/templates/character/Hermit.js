import Character from "./Character.js";
import { Sabre, Adaga, ArcoComposto } from "../../../database/Weapons.js";
import { PoçãoDeVida } from "../../../database/Potions.js";
import { ArmaduraDeCouro } from "../../../database/Armors.js";

export default class Hermit extends Character {
	static profession = "Eremita";
	static initialAttributes = {
		hide: 1,
	};
	static initialAdvantages = [
		{
			name: "Companheiro",
			description: "Você possui um animal de estimação.",
		},
		{
			name: "Furtividade",
			description:
				"Sempre que tentar se esconder da besta, você soma 1 ao resultado do dado.",
		},
	];
	static initialMaxLifePoints = 22;
	static initialItens = [
		Sabre,
		Adaga,
		ArcoComposto,
		ArmaduraDeCouro,
		PoçãoDeVida,
		PoçãoDeVida,
	];

	constructor(name) {
		super(
			name,
			Hermit.profession,
			Hermit.initialAttributes,
			Hermit.initialAdvantages,
			Hermit.initialMaxLifePoints
		);

		Hermit.initialItens.forEach((item) => {
			this.backpack.addItem(item);
		});
	}
}
