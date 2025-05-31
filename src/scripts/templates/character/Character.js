import Backpack from "../Backpack.js";
import Equipment from "../Equipment.js";

export default class Character {
	constructor(name, profession, attributes, advantages, maxLifePoints, image) {
		this.name = name;
		this.profession = profession;
		this.attributes = attributes;
		this.advantages = advantages;
		this.maxLifePoints = maxLifePoints;
		this.lifePoints = maxLifePoints;
		this.image = image;

		this.weariness = 0;
		this.backpack = new Backpack();
		this.equipment = new Equipment();
	}
}
