import { Backpack } from "../Backpack.js";
import { Equipment } from "../Equipment.js";

class Character {
	constructor(name, profession, attributes, advantages, maxLifePoints) {
		this.name = name;
		this.profession = profession;
		this.attributes = attributes;
		this.advantages = advantages;
		this.maxLifePoints = maxLifePoints;
		this.lifePoints = maxLifePoints;

		this.weariness = 0;
		this.packpack = new Backpack();
		this.equipment = new Equipment();
	}
}
