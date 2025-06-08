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
import { PoçãoDeVida } from "../database/Potions.js";

// Known potions database for effect restoration
const knownPotions = {
	"Poção de vida": PoçãoDeVida,
};

function reconstructItem(itemData) {
	if (!itemData || !itemData.slotType) return itemData;

	try {
		let reconstructedItem;
		switch (itemData.slotType) {
			case "weapon":
				reconstructedItem = new Weapon(
					itemData.name,
					itemData.description,
					itemData.craft,
					itemData.damage,
					itemData.range,
					itemData.hands,
					itemData.features
				);
				break;
			case "helmet":
				reconstructedItem = new Helmet(
					itemData.name,
					itemData.description,
					itemData.craft,
					itemData.protectionPoints
				);
				break;
			case "armor":
				reconstructedItem = new Armor(
					itemData.name,
					itemData.description,
					itemData.craft,
					itemData.maxProtectionPoints || itemData.protectionPoints
				);
				// Restore current protection points if different from max
				if (itemData.protectionPoints !== undefined) {
					reconstructedItem.protectionPoints = itemData.protectionPoints;
				}
				break;
			case "bracelets":
				reconstructedItem = new Bracelet(
					itemData.name,
					itemData.description,
					itemData.craft,
					itemData.protectionPoints
				);
				break;
			case "boots":
				reconstructedItem = new Boots(
					itemData.name,
					itemData.description,
					itemData.craft,
					itemData.protectionPoints
				);
				break;
			case "shield":
				reconstructedItem = new Shield(
					itemData.name,
					itemData.description,
					itemData.craft,
					itemData.protectionPoints
				);
				break;
			case "potion":
				// Check if this is a known potion with a predefined effect
				const knownPotion = knownPotions[itemData.name];
				if (knownPotion) {
					return knownPotion;
				}
				// Fallback to generic reconstruction
				reconstructedItem = new Potion(
					itemData.name,
					itemData.description,
					itemData.craft,
					itemData.effect
				);
				break;
			case "arrow":
				reconstructedItem = new Arrow(
					itemData.name,
					itemData.description,
					itemData.craft
				);
				break;
			case "utility":
				reconstructedItem = new Utility(
					itemData.name,
					itemData.description,
					itemData.craft
				);
				break;
			case "material":
				return new Material(itemData.name, itemData.description);
			default:
				return itemData;
		}

		// Preserve equipped state
		if (itemData.equipped !== undefined) {
			reconstructedItem.equipped = itemData.equipped;
		}

		return reconstructedItem;
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
