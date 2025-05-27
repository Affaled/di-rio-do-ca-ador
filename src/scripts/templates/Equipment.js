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
		if (slot === weapons) {
			const emptyIndex = this.slots.weapons.findIndex((w) => w === null);
			if (emptyIndex === -1) {
				throw new Error("Todos os espaços de armas já estão ocupados.");
			}
			this.slots.weapons[emptyIndex] = item;
			/* item equipado no slot de armas */
		} else {
			if (!this.slots.hasOwnProperty(slot)) {
				throw new Error(`Slot ${slot} não existe.`);
			}
			if (this.slots[slot]) {
				/* subsitui o slot já ocupado */
			}
			this.slots[slot] = item;
			/* item equipado no slot */
		}
	}

	unequip(slot, index = null) {
		if (slot === "weapons") {
			if (index === null || index < 0 || index >= this.slots.weapons.length) {
				throw new Error("Índice inválido de slot para armas.");
			}
			const item = this.slots.weapons[index];
			this.slots.weapons[index] = null;
			return item;
		} else {
			if (this.slots[slot]) {
				const item = this.slots[slot];
				this.slots[slot] = null;
				return item;
			}
			return null;
			/* Slot já está vazio */
		}
	}
}
