import Backpack from "../Backpack.js";
import Equipment from "../Equipment.js";
import { rolld6 } from "../../rolld6.js";

export default class Character {
	constructor(name, profession, attributes, advantages, maxLifePoints, image) {
		this.name = name;
		this.profession = profession;
		this.attributes = attributes;
		this.advantages = advantages;
		this.maxLifePoints = maxLifePoints;
		this.lifePoints = maxLifePoints;
		this.weariness = 0;
		this.image = image;
		this.backpack = new Backpack();
		this.equipment = new Equipment();
		this.ataques = [];
		this.pet = null;
	}

	updateAtaques() {
		this.ataques = [];
		this.equipment.slots.weapons.forEach((weapon) => {
			if (weapon) {
				this.ataques.push({
					name: weapon.name,
					damage: weapon.damage,
					range: weapon.range,
					hands: weapon.hands,
					features: weapon.features,
					disponivel: true,
				});
			}
		});
	}

	receberDano(dano, usarArmadura = false) {
		if (usarArmadura) {
			const armor = this.equipment.slots.armor;

			if (armor && armor.protectionPoints > 0) {
				const absorbed = Math.min(dano, armor.protectionPoints);
				armor.protectionPoints -= absorbed;
				dano -= absorbed;

				if (armor.protectionPoints <= 0) {
					this.equipment.unequip("armor");
				}
			}
		}

		if (dano > 0) {
			this.lifePoints = Math.max(0, this.lifePoints - dano);
		}
	}

	beberPocao() {
		const potion = this.backpack.items.find(
			(item) => item.slotType === "potion"
		);
		if (potion) {
			const lifeBefore = this.lifePoints;
			const wearinessBefore = this.weariness;

			if (typeof potion.effect === "function") {
				potion.effect(this);
			}

			console.log(`Potion used: ${potion.name}`);
			console.log(`Life: ${lifeBefore} -> ${this.lifePoints}`);
			console.log(`Weariness: ${wearinessBefore} -> ${this.weariness}`);

			this.backpack.removeItem(potion);
			return true;
		}
		return false;
	}

	esquivar() {
		this.weariness = Math.min(6, this.weariness + 1);
	}

	esconder() {
		const baseRoll = rolld6();
		const hideBonus = this.attributes?.hide || 0;
		const result = baseRoll + hideBonus;

		return result;
	}
}
