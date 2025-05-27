import Character from "./Character.js";

export default class Hermit extends Character {
	constructor(name) {
		const profession = "Eremita";
		const attributes = {
			hide: 1,
		};
		const advantages = [
			{
				name: "Companheiro",
				description: "Você possui um animal de estimação.",
			},
			{
				name: "Furtividade",
				description:
					"Sempre que tentar se esconder da besta, você soma 1 ao resultado do dado.",
			},
		];
		const maxLifePoints = 22;
		super(name, profession, attributes, advantages, maxLifePoints);
	}
}
