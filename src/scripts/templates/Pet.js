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

	atacar(beast) {
		if (
			!beast.parts ||
			!Array.isArray(beast.parts) ||
			beast.parts.length === 0
		) {
			console.error("Beast has no valid parts to attack");
			return null;
		}

		const availableParts = beast.parts.filter((part) => part && part.name);

		if (availableParts.length === 0) {
			console.error("No valid parts found on beast");
			return null;
		}

		const randomPart =
			availableParts[Math.floor(Math.random() * availableParts.length)];
		const damage = this.damage.normal || 1;

		console.log("Pet attacking part:", randomPart.name, "with damage:", damage);

		const result = beast.receberDanoNaParte(randomPart.name, damage);

		return {
			targetPart: randomPart.name,
			damage: damage,
			result: result,
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
	static abilities = [
		{
			name: "Força Bruta",
			description:
				"Causa 2 de dano por ataque e possui maior resistência em combate.",
		},
	];

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
