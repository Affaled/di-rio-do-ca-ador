import beastCreate from "../../beast-create.js";

export default class Beast {
	constructor(
		name,
		element,
		weakness,
		attacks = [],
		size,
		parts = [],
		maxLifePoints,
		image
	) {
		this.name = name;
		this.element = element;
		this.wewakness = weakness;
		this.attacks = attacks;
		this.size = size;
		this.parts = parts;
		this.maxLifePoints = maxLifePoints;
		this.lifePoints = maxLifePoints;
		this.currentAttack = 3;
		this.image = image;
	}
}
