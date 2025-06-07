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
		this.lifePoints = maxLifePoints; // Start with full life
		this.weariness = 0; // Start with no fatigue
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
			// Logic for armor absorption
			const armor = this.equipment.slots.armor;
			if (armor && armor.protectionPoints > 0) {
				const absorbed = Math.min(dano, armor.protectionPoints);
				armor.protectionPoints -= absorbed;
				dano -= absorbed;
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
			if (typeof potion.effect === "function") {
				potion.effect(this);
			}
			this.backpack.removeItem(potion);
			return true; // Indicate potion was consumed
		}
		return false; // Indicate no potion was found/consumed
	}

	esquivar() {
		this.weariness = Math.min(6, this.weariness + 1);
	}

	esconder() {
		const baseRoll = rolld6();
		const hideBonus = this.attributes?.hide || 0;
		return baseRoll + hideBonus;
	}
}
