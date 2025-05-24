import { rolld6 } from "./rolld6";

class Character {
	constructor(
		name,
		profession,
		lifePoints,
		advantages,
		startingEquipment = {}
	) {
		this.name = name;
		this.profession = profession;
		this.lifePoints = lifePoints;
		this.maxLifePoints = lifePoints;
		this.weariness = weariness;
		this.advantages = advantages;
		this.equipments = {
			weapons: startingEquipment.weapons || [],
			clothing: startingEquipment.clothing || [],
			backpack: startingEquipment.backpack || [],
			shield: startingEquipment.shield || null,
			pet: startingEquipment.pet || null,
		};
	}

	takeDamage(damage) {
		this.pv = Math.max(this.pv - damage, 0);
	}

	healLifePoints(healing) {
		this.lifePoints = Math.min(this.lifePoints + healing, this.maxLifePoints);
	}

	increaseWeariness(quantity) {
		this.weariness += quantity;
		if (this.weariness > 6) {
			console.log(`${this.name} fainted due to exhaustion!`);
		}
	}

	rest() {
		let diceResult = rolld6();
		this.weariness -= diceResult;
		if (this.weariness < 0) {
			this.weariness = 0;
		}
	}
}
