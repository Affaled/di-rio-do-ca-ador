class Item {
	constructor(name, description, slotType, craft) {
		this.name = name;
		this.description = description;
		this.slotType = slotType;
		this.craft = craft || null;

		this.equipped = false;
	}
}

class Weapon extends Item {
	constructor(name, description, craft, damage, range, hands, features = {}) {
		const slotType = "weapons";

		this.damage = damage;
		this.range = range;
		this.hands = hands;
		this.features = {
			throwable: false,
			long: false,
			heavy: false,
			torque: false,
			arrows: false,
		};

		super(name, description, slotType, craft);
	}
}

class Helmet extends Item {
	constructor(name, description, craft, protectionPoints) {
		const slotType = "helmet";
		this.protectionPoints = protectionPoints;

		super(name, description, "helmet", craft);
	}
}

class Armor extends Item {}

class Bracelet extends Item {}

class Boots extends Item {}

class Shield extends Item {}

class Potion extends Item {
	constructor(name, description, craft, effect) {
		this.effect = effect;

		super(name, description, "potion", craft);
	}
}

class Arrow extends Item {}

class Utility extends Item {}

export {
	Item,
	Weapon,
	Helmet,
	Armor,
	Bracelet,
	Boots,
	Shield,
	Potion,
	Arrow,
	Utility,
};
