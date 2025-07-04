import beastCreate from "../../beast-create.js";
import { rolld6 } from "../../rolld6.js";

export default class Beast {
	constructor(
		name,
		element,
		weakness,
		attacks = [],
		size,
		parts = [],
		maxLifePoints,
		image
	) {
		this.name = name;
		this.element = element;
		this.wewakness = weakness;
		this.attacks = attacks;
		this.size = size;
		this.parts = parts.map((p) => ({
			...p,
			currentDefense: typeof p.defense === "number" ? p.defense : 0,
		}));
		this.maxLifePoints = maxLifePoints;
		this.lifePoints = maxLifePoints;
		this.image = image;
	}

	escolherAtaque() {
		const idx = Math.floor(Math.random() * this.attacks.length);
		return this.attacks[idx];
	}

	receberDanoNaParte(nomeParte, valorDano) {
		const parte = this.parts.find((p) => p.name === nomeParte);
		if (!parte) return { sucesso: false, motivo: "Parte não encontrada" };

		if (parte.currentDefense > 0) {
			parte.currentDefense -= valorDano;
			if (parte.currentDefense < 0) parte.currentDefense = 0;
			return {
				sucesso: true,
				mensagem: `A parte ${parte.name} perdeu ${valorDano} de defesa. Defesa restante: ${parte.currentDefense}`,
				vidaAtingida: false,
			};
		} else {
			this.lifePoints -= valorDano;
			if (this.lifePoints < 0) this.lifePoints = 0;
			return {
				sucesso: true,
				mensagem: `A parte ${parte.name} está vulnerável! A besta perdeu ${valorDano} de vida. Vida restante: ${this.lifePoints}`,
				vidaAtingida: true,
			};
		}
	}

	procurar(valorParaAchar) {
		const resultado = rolld6();
		const encontrou = resultado >= valorParaAchar;

		return {
			encontrou: encontrou,
			rolagem: resultado,
			necessario: valorParaAchar,
		};
	}

	escolherAlvo(character) {
		const targets = ["character"];

		if (character.pet && character.pet.lifePoints > 0) {
			const isFlying = character.pet.abilities?.some(
				(ability) => ability.name === "Voo" || ability.name === "Flying"
			);

			if (!isFlying) {
				targets.push("pet");
			}
		}

		const randomIndex = Math.floor(Math.random() * targets.length);
		return targets[randomIndex];
	}
}
