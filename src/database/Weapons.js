import { Weapon } from "../scripts/templates/Item.js";
import { Minerio } from "./Material.js";

/* Arquivo para armazenar as armas */
export const Sabre = new Weapon(
	"Sabre", // name
	"Uma espada curva e afiada, ideal para cortes rápidos.", // description
	{ [Minerio.nome]: 4 }, // craft
	{ normal: 3 }, // damage
	"melee", // range
	1 // hands
);

export const Adaga = new Weapon(
	"Adaga",
	"Uma lâmina curta e afiada, perfeita para ataques furtivos.",
	{ [Minerio.nome]: 3 },
	{ normal: 2 },
	"melee",
	1,
	{ throwable: true } // features
);

export const ArcoComposto = new Weapon(
	"Arco Composto",
	"Um arco poderoso feito de madeira flexível e corda resistente.",
	{ [Minerio.nome]: 7 },
	{ normal: 3 },
	"ranged",
	2,
	{ arrows: true }
);
