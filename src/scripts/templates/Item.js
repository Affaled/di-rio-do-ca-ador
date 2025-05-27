class Item {
	constructor(name, description, slotType, craft) {
		this.name = name;
		this.description = description;
		this.slotType = slotType;
		this.craft = craft || null;

		this.equipped = false;
	}

	isConsumable() {
		return (
			this.slotType === "potion" ||
			this.slotType === "arrow" ||
			this.slotType === "utility" ||
			this.slotType === "material"
		);
	}

	isEquippable() {
		return (
			this.slotType === "weapons" ||
			this.slotType === "helmet" ||
			this.slotType === "armor" ||
			this.slotType === "bracelets" ||
			this.slotType === "boots" ||
			this.slotType === "shield"
		);
	}
}

class Weapon extends Item {
	constructor(name, description, craft, damage, range, hands, features = {}) {
		this.damage = damage;
		this.range = range;
		this.hands = hands;
		this.features = {
			throwable: false,
			long: false,
			heavy: false,
			torque: false,
			arrows: false,
			...features,
		};

		super(name, description, "weapon", craft);
	}
}

class Helmet extends Item {
	constructor(name, description, craft, protectionPoints) {
		this.protectionPoints = protectionPoints;

		super(name, description, "helmet", craft);
	}
}

class Armor extends Item {
	constructor(name, description, craft, protectionPoints) {
		this.protectionPoints = protectionPoints;

		super(name, description, "armor", craft);
	}
}

class Bracelet extends Item {
	constructor(name, description, craft, protectionPoints) {
		this.protectionPoints = protectionPoints;

		super(name, description, "bracelets", craft);
	}
}

class Boots extends Item {
	constructor(name, description, craft, protectionPoints) {
		this.protectionPoints = protectionPoints;

		super(name, description, "boots", craft);
	}
}

class Shield extends Item {
	constructor(name, description, craft, protectionPoints) {
		this.protectionPoints = protectionPoints;

		super(name, description, "shield", craft);
	}
}

class Potion extends Item {
	constructor(name, description, craft, effect) {
		this.effect = effect;

		super(name, description, "potion", craft);
	}
}

class Arrow extends Item {}

class Utility extends Item {}

class Material extends Item {
	constructor(name, description) {
		super(name, description, "material");
	}
}

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
	Material,
};
