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
		super(name, description, "weapon", craft);

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
	}
}

class Helmet extends Item {
	constructor(name, description, craft, protectionPoints) {
		super(name, description, "helmet", craft);

		this.protectionPoints = protectionPoints;
	}
}

class Armor extends Item {
	constructor(name, description, craft, protectionPoints) {
		super(name, description, "armor", craft);

		this.protectionPoints = protectionPoints;
	}
}

class Bracelet extends Item {
	constructor(name, description, craft, protectionPoints) {
		super(name, description, "bracelets", craft);

		this.protectionPoints = protectionPoints;
	}
}

class Boots extends Item {
	constructor(name, description, craft, protectionPoints) {
		super(name, description, "boots", craft);

		this.protectionPoints = protectionPoints;
	}
}

class Shield extends Item {
	constructor(name, description, craft, protectionPoints) {
		super(name, description, "shield", craft);

		this.protectionPoints = protectionPoints;
	}
}

class Potion extends Item {
	constructor(name, description, craft, effect) {
		super(name, description, "potion", craft);

		this.effect = effect;
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
