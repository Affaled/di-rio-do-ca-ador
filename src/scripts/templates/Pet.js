export class Pet {
	constructor(name, type, maxLifePoints, damage) {
		this.name = name;
		this.type = type;
		this.maxLifePoints = maxLifePoints;
		this.lifePoints = maxLifePoints;
		this.damage = damage;
	}

	receberDano(damage) {
		this.lifePoints = Math.max(0, this.lifePoints - damage);
		return {
			success: true,
			message: `O pet perdeu ${damage} pontos de vida. Vida restante: ${this.lifePoints}`,
			defeated: this.lifePoints <= 0,
		};
	}
}

export class FlyingPet extends Pet {
	static type = "Voador";
	static maxLifePoints = 8;
	static damage = { normal: 1 };
	static abilities = [
		{
			name: "Voo",
			description:
				"Pode voar e alcançar lugares altos, além de nunca ser atacado diretamente.",
		},
	];

	constructor(name) {
		super(name, FlyingPet.type, FlyingPet.maxLifePoints, FlyingPet.damage);

		this.abilities = FlyingPet.abilities;
	}
}

export class FightingPet extends Pet {
	static type = "Lutador";
	static maxLifePoints = 10;
	static damage = { normal: 2 };
	static abilities = [];

	constructor(name) {
		super(
			name,
			FightingPet.type,
			FightingPet.maxLifePoints,
			FightingPet.damage
		);

		this.abilities = FightingPet.abilities;
	}
}

export class TrackerPet extends Pet {
	static type = "Rastreador";
	static maxLifePoints = 10;
	static damage = { normal: 1 };
	static abilities = [
		{
			name: "Rastreamento",
			description: "Pode rolar o dado novamente uma vez ao rastrear.",
		},
	];

	constructor(name) {
		super(name, TrackerPet.type, TrackerPet.maxLifePoints, TrackerPet.damage);

		this.abilities = TrackerPet.abilities;
	}
}
