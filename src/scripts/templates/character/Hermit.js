import Character from "./Character.js";
import { Sabre, Adaga, ArcoComposto } from "../../../database/Weapons.js";
import { PoçãoDeVida } from "../../../database/Potions.js";
import { ArmaduraDeCouro } from "../../../database/Armors.js";
import { FlyingPet, FightingPet } from "../Pet.js";

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
			if (item.slotType === "weapon" || item.slotType === "armor") {
				try {
					this.equipment.equip(item);
				} catch (e) {}
			}
		});

		switch (petType) {
			case "FlyingPet":
				this.pet = new FlyingPet();
				this.pet.name = "Companheiro Voador";
				break;
			case "FightingPet":
				this.pet = new FightingPet();
				this.pet.name = "Companheiro Lutador";
				break;
			default:
				throw new Error("Tipo de animal de estimação inválido.");
		}

		this.updateAtaques();
	}
}
