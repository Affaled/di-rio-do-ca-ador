export default class Equipment {
	constructor() {
		this.slots = {
			helmet: null,
			armor: null,
			bracelets: null,
			boots: null,
			shield: null,
			weapons: [null, null, null],
		};
	}

	equip(item) {
		const slot = item.slotType;
		if (slot === "weapon") {
			const emptyIndex = this.slots.weapons.findIndex((w) => w === null);
			if (emptyIndex === -1) {
				throw new Error("Todos os espaços de armas já estão ocupados.");
			}
			this.slots.weapons[emptyIndex] = item;
			item.equipped = true;
		} else {
			if (!this.slots.hasOwnProperty(slot)) {
				throw new Error(`Slot ${slot} não existe.`);
			}
			if (this.slots[slot]) {
				this.slots[slot].equipped = false;
			}
			this.slots[slot] = item;
			item.equipped = true;
		}
	}

	unequip(slot, index = null) {
		if (slot === "weapon") {
			if (index === null || index < 0 || index >= this.slots.weapons.length) {
				throw new Error("Índice inválido de slot para armas.");
			}
			const item = this.slots.weapons[index];
			if (item) {
				item.equipped = false;
			}
			this.slots.weapons[index] = null;
			return item;
		} else {
			const item = this.slots[slot];
			if (item) {
				item.equipped = false;
				this.slots[slot] = null;
				return item;
			}
			return null;
		}
	}
}
