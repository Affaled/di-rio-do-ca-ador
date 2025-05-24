import { rolld6 } from "../rolld6";

class Pet {
	constructor(type) {
		const petTypes = {
			agressive: { lifePoints: 10, damage: 2 },
			flying: { lifePoints: 8, damage: 1, flying: true },
			tracker: { lifePoints: 6, damage: 1, trackerBonus: true },
		};

		Object.assign(this, petTypes[type]);
		this.type = type;
	}
}
