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
		console.log("=== RECEBER DANO DEBUG ===");
		console.log("Dano inicial:", dano);
		console.log("Usar armadura:", usarArmadura);
		console.log("Vida antes:", this.lifePoints);

		if (usarArmadura) {
			// Logic for armor absorption
			const armor = this.equipment.slots.armor;
			console.log("Armadura equipada:", armor);

			if (armor && armor.protectionPoints > 0) {
				console.log(
					"Pontos de proteção da armadura antes:",
					armor.protectionPoints
				);
				const absorbed = Math.min(dano, armor.protectionPoints);
				armor.protectionPoints -= absorbed;
				dano -= absorbed;

				console.log("Dano absorvido pela armadura:", absorbed);
				console.log(
					"Pontos de proteção da armadura depois:",
					armor.protectionPoints
				);
				console.log("Dano restante:", dano);

				// If armor is broken, remove it
				if (armor.protectionPoints <= 0) {
					console.log(`${armor.name} quebrou! Removendo armadura.`);
					this.equipment.unequip("armor");
				}
			} else {
				console.log("Nenhuma armadura válida encontrada ou sem proteção");
			}
		}

		// Only apply remaining damage to life
		if (dano > 0) {
			console.log("Aplicando dano restante à vida:", dano);
			this.lifePoints = Math.max(0, this.lifePoints - dano);
		} else {
			console.log("Nenhum dano restante para aplicar à vida");
		}

		console.log("Vida depois:", this.lifePoints);
		console.log("=== FIM RECEBER DANO DEBUG ===");
	}

	beberPocao() {
		const potion = this.backpack.items.find(
			(item) => item.slotType === "potion"
		);
		if (potion) {
			// Store values before effect for debugging
			const lifeBefore = this.lifePoints;
			const wearinessBefore = this.weariness;

			if (typeof potion.effect === "function") {
				potion.effect(this);
			}

			// Log the effect for debugging
			console.log(`Potion used: ${potion.name}`);
			console.log(`Life: ${lifeBefore} -> ${this.lifePoints}`);
			console.log(`Weariness: ${wearinessBefore} -> ${this.weariness}`);

			this.backpack.removeItem(potion);
			return true; // Indicate potion was consumed
		}
		return false; // Indicate no potion was found/consumed
	}

	esquivar() {
		this.weariness = Math.min(6, this.weariness + 1);
	}

	esconder() {
		console.log("=== ESCONDER DEBUG ===");
		console.log("Character attributes:", this.attributes);
		console.log("Hide attribute:", this.attributes?.hide);

		const baseRoll = rolld6();
		const hideBonus = this.attributes?.hide || 0;
		const result = baseRoll + hideBonus;

		console.log("Base roll:", baseRoll);
		console.log("Hide bonus:", hideBonus);
		console.log("Final result:", result);
		console.log("=== FIM ESCONDER DEBUG ===");

		return result;
	}
}
