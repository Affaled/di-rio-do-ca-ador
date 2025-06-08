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
		console.log("=== UNEQUIP DEBUG ===");
		console.log("Slot:", slot);
		console.log("Index:", index);

		if (slot === "weapon") {
			if (index === null || index < 0 || index >= this.slots.weapons.length) {
				console.log("Erro: Índice inválido de slot para armas.");
				throw new Error("Índice inválido de slot para armas.");
			}
			const item = this.slots.weapons[index];
			if (item) {
				console.log("Removendo arma:", item.name);
				item.equipped = false;
			}
			this.slots.weapons[index] = null;
			console.log("=== FIM UNEQUIP DEBUG ===");
			return item;
		} else {
			const item = this.slots[slot];
			if (item) {
				console.log("Removendo item do slot", slot + ":", item.name);
				item.equipped = false;
				this.slots[slot] = null;
				console.log("=== FIM UNEQUIP DEBUG ===");
				return item;
			}
			console.log("Slot", slot, "já estava vazio");
			console.log("=== FIM UNEQUIP DEBUG ===");
			return null; // Slot já está vazio
		}
	}
}
