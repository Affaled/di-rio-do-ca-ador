import Character from "./Character.js";
import { Sabre, Adaga, ArcoComposto } from "../../../database/Weapons.js";
import { PoçãoDeVida } from "../../../database/Potions.js";
import { ArmaduraDeCouro } from "../../../database/Armors.js";
import { FlyingPet, FightingPet, TrackerPet } from "../Pet.js";

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
	static initialItems = [
		Sabre,
		Adaga,
		ArcoComposto,
		ArmaduraDeCouro,
		PoçãoDeVida,
		PoçãoDeVida,
	];
	static image = "/src/assets/images/hermit-image.png";

	constructor(name, petType) {
		super(
			name,
			Hermit.profession,
			Hermit.initialAttributes,
			Hermit.initialAdvantages,
			Hermit.initialMaxLifePoints,
			Hermit.image
		);

		Hermit.initialItems.forEach((item) => {
			this.backpack.addItem(item);
		});

		switch (petType) {
			case "Voador":
				this.pet = new FlyingPet();
				break;
			case "Lutador":
				this.pet = new FightingPet();
				break;
			case "Rastreador":
				this.pet = new TrackerPet();
				break;
			default:
				throw new Error("Tipo de animal de estimação inválido.");
		}
	}
}
