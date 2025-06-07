import {
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
} from "./templates/Item.js";

function reconstructItem(itemData) {
	if (!itemData || !itemData.slotType) return itemData;

	try {
		switch (itemData.slotType) {
			case "weapon":
				return new Weapon(
					itemData.name,
					itemData.description,
					itemData.craft,
					itemData.damage,
					itemData.range,
					itemData.hands,
					itemData.features
				);
			case "helmet":
				return new Helmet(
					itemData.name,
					itemData.description,
					itemData.craft,
					itemData.protectionPoints
				);
			case "armor":
				return new Armor(
					itemData.name,
					itemData.description,
					itemData.craft,
					itemData.protectionPoints
				);
			case "bracelets":
				return new Bracelet(
					itemData.name,
					itemData.description,
					itemData.craft,
					itemData.protectionPoints
				);
			case "boots":
				return new Boots(
					itemData.name,
					itemData.description,
					itemData.craft,
					itemData.protectionPoints
				);
			case "shield":
				return new Shield(
					itemData.name,
					itemData.description,
					itemData.craft,
					itemData.protectionPoints
				);
			case "potion":
				return new Potion(
					itemData.name,
					itemData.description,
					itemData.craft,
					itemData.effect
				);
			case "arrow":
				return new Arrow(itemData.name, itemData.description, itemData.craft);
			case "utility":
				return new Utility(itemData.name, itemData.description, itemData.craft);
			case "material":
				return new Material(itemData.name, itemData.description);
			default:
				return itemData;
		}
	} catch (error) {
		console.warn("Failed to reconstruct item:", itemData, error);
		return itemData;
	}
}

export function saveToLocal(key, value) {
	try {
		localStorage.setItem(key, JSON.stringify(value));
		return true;
	} catch (e) {
		console.error("Erro ao salvar no localStorage:", e);
		return false;
	}
}

export function loadFromLocal(key) {
	try {
		const item = localStorage.getItem(key);
		const data = item ? JSON.parse(item) : null;

		// Reconstruct items if this is character data
		if (key === "character" && data) {
			// Reconstruct backpack items
			if (data.backpack && Array.isArray(data.backpack)) {
				data.backpack = data.backpack.map(reconstructItem);
			}

			// Reconstruct equipment items
			if (data.equipment && data.equipment.slots) {
				const slots = data.equipment.slots;

				// Reconstruct single slot items
				["helmet", "armor", "bracelets", "boots", "shield"].forEach(
					(slotName) => {
						if (slots[slotName]) {
							slots[slotName] = reconstructItem(slots[slotName]);
						}
					}
				);

				// Reconstruct weapon array
				if (slots.weapons && Array.isArray(slots.weapons)) {
					slots.weapons = slots.weapons.map((weapon) =>
						weapon ? reconstructItem(weapon) : null
					);
				}
			}
		}

		return data;
	} catch (e) {
		console.error("Erro ao carregar item do localStorage:", e);
		return null;
	}
}

export function removeFromLocal(key) {
	try {
		localStorage.removeItem(key);
	} catch (e) {
		console.error("Erro ao remover do localStorage:", e);
	}
}
