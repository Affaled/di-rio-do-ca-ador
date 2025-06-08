import { Weapon } from "../scripts/templates/Item.js";
import { Minerio } from "./Material.js";

export const Sabre = new Weapon(
	"Sabre",
	"Uma espada curva e afiada, ideal para cortes rápidos.",
	{ [Minerio.nome]: 4 },
	{ normal: 3 },
	"melee",
	1
);

export const Adaga = new Weapon(
	"Adaga",
	"Uma lâmina curta e afiada, perfeita para ataques furtivos.",
	{ [Minerio.nome]: 3 },
	{ normal: 2 },
	"melee",
	1,
	{ throwable: true }
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

export const Machado = new Weapon(
	"Machado",
	"Uma ferramenta afiada, ideal para cortar madeira e atacar inimigos.",
	{ [Minerio.nome]: 9 },
	{ normal: 6 },
	"melee",
	2,
	{ heavy: true }
);

export const ArcoSimples = new Weapon(
	"Arco Simples",
	"Um arco básico feito de madeira, adequado para iniciantes.",
	{ [Minerio.nome]: 2 },
	{ normal: 2 },
	"ranged",
	2,
	{ arrows: true }
);
