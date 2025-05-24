import { rolld6 } from "../rolld6";

class Beast {
	constructor(name, parts, element) {
		this.name = name;
		this.parts = parts;
		this.element = element;
	}

	takeDamage(partIndex, damage, type = "normal") {
		const part = this.parts[partIndex];
		if (part.armor > 0) {
			const excessDamage = damage - part.armor;
			part.armor = Math.max(part.armor - damage, 0);
			if (excessDamage > 0) part.lifePoints -= excessDamage;
		} else {
			part.lifePoints -= damage;
		}

		if (part.lifePoints <= 0) {
			console.log(`${this.name}'s ${part.name} has been destroyed!`);
		}
	}

	isDead() {
		return this.parts.every((part) => part.lifePoints <= 0);
	}
}
