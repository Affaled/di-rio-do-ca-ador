import Character from "./Character.js";

export default class Hermit extends Character {
	static profession = "Eremita";
	static initialAttributes = {
		hide: 1,
	};
	static initialAdvantages = [
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
	static initialMaxLifePoints = 22;

	constructor(name) {
		super(
			name,
			Hermit.profession,
			Hermit.initialAttributes,
			Hermit.initialAdvantages,
			Hermit.initialMaxLifePoints
		);
	}
}
