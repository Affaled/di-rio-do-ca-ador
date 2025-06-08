import { loadFromLocal } from "./local-saves.js";
import { rolld6 } from "./rolld6.js";
import Rexian from "./templates/beast/Rexian.js";

const save = loadFromLocal("save");
const characterData = loadFromLocal("character");

const beastName = save?.beast?.type || "Rexian";
const beastElement = save?.beast?.element || "fogo";
const beastWeakness = save?.beast?.weakness || "gelo";

const GameState = {
	INVESTIGATION: "investigação",
	HUNT: "caçada",
	FIGHT: "combate",
};

const investigationTable = [
	{
		type: "raça",
		getInfo: () => `A besta é um ${beastName}`,
	},
	{
		type: "elemento",
		getInfo: () => `O elemento da besta é ${beastElement}.`,
	},
	{
		type: "fraqueza",
		getInfo: () => `A fraqueza da besta é ${beastWeakness}.`,
	},
	{
		type: "fracasso",
		getInfo: () => `Você não conseguiu maiores informações.`,
	},
];

const investigationDialog = [
	{
		speaker: "Narrador",
		text: "Você chega a cidade, você pode buscar por mais informações e seguir para a caçada da besta.",
		next: "Clique ou aperte Enter para investigar",
		effect: function () {
			const baseRolls = 3;
			let rolls = baseRolls;
			const social = this.character?.attributes?.social ?? 0;
			if (social < 0) {
				rolls = Math.max(1, baseRolls + social);
			}
			const indices = [];
			while (indices.length < rolls) {
				const idx = Math.floor(Math.random() * investigationTable.length);
				if (!indices.includes(idx)) indices.push(idx);
			}
			const infos = indices.map((i) => investigationTable[i].getInfo());
			this.lastInvestigationInfo = `
        		${infos.join("<br>")}
    			`;
		},
	},
	{
		speaker: "Narrador",
		text: function () {
			return (
				this.lastInvestigationInfo || "Você não conseguiu nenhuma informação"
			);
		},
		next: "Clique ou aperte Enter para iniciar a caçada.",
		effect: null,
	},
];

class GameController {
	constructor() {
		this.state = GameState.INVESTIGATION;
		this.character = null;

		const beastData = save?.beast || {
			element: beastElement,
			weakness: beastWeakness,
		};
		this.beast = new Rexian(beastData.element, beastData.weakness);

		if (save?.beast?.lifePoints !== undefined) {
			this.beast.lifePoints = save.beast.lifePoints;
		}
		this.playerHidden = false;
		this.playerTurn = false;
		this.petTurn = false;
		this.beastTurnActive = false;

		this.initializeCharacter();
	}

	initializeCharacter() {
		const checkCharacter = () => {
			if (window.gameCharacter) {
				this.character = window.gameCharacter;
				console.log("Character initialized in GameController:", this.character);
				if (!this.character.ataques) {
					this.character.ataques = [];
				}
			} else {
				setTimeout(checkCharacter, 100);
			}
		};
		checkCharacter();
	}

	handleFight() {
		const $window = $(".game__window");
		$window.empty();

		if (this.playerTurn) {
			this.showPlayerActions($window);
		} else if (this.petTurn) {
			this.handlePetTurn($window);
		} else {
			this.beastTurn($window);
		}
	}

	showPlayerActions($window) {
		$window.off();
		$(document).off("keydown.vnDialog");

		$window.html(`
			<div style="display: flex; flex-direction: column; height: 100%; gap: 1rem;">
				<div style="display: flex; justify-content: center; align-items: center; flex: 1; background: rgba(20,15,10,0.8); border-radius: 12px; padding: 1rem;">
					<img src="${this.beast.image}" alt="${this.beast.name}" style="max-width: 300px; max-height: 200px; object-fit: contain; border: 2px solid #a68763; border-radius: 8px; background: #222;">
				</div>
				<div class="vn-dialog" style="margin: 0;">
					<div style="text-align: center; margin-bottom: 1rem;">
						<strong>Seu turno - Escolha uma ação:</strong>
					</div>
					<div style="display: flex; gap: 1rem; justify-content: center;">
						<button id="fight-attack" style="padding: 0.5rem 1rem; background: var(--color-item-weapon); color: white; border: none; border-radius: 0.5rem; cursor: pointer;">Atacar</button>
						<button id="fight-hide" style="padding: 0.5rem 1rem; background: var(--color-primary); color: white; border: none; border-radius: 0.5rem; cursor: pointer;">Esconder</button>
						<button id="fight-potion" style="padding: 0.5rem 1rem; background: var(--color-item-potion); color: white; border: none; border-radius: 0.5rem; cursor: pointer;">Usar Poção</button>
					</div>
				</div>
			</div>
		`);

		$window.find("#fight-attack").on("click", (e) => {
			e.preventDefault();
			e.stopPropagation();
			this.chooseAttack($window);
		});
		$window.find("#fight-hide").on("click", (e) => {
			e.preventDefault();
			e.stopPropagation();
			this.playerHide($window);
		});
		$window.find("#fight-potion").on("click", (e) => {
			e.preventDefault();
			e.stopPropagation();
			this.playerPotion($window);
		});
	}

	chooseAttack($window) {
		if (!this.character) {
			console.warn("Character not initialized yet");
			setTimeout(() => this.chooseAttack($window), 100);
			return;
		}

		console.log("Character attacks:", this.character.ataques);

		if (!this.character.ataques || !Array.isArray(this.character.ataques)) {
			console.warn("Character attacks not available or not an array");
			this.character.ataques = [];
		}

		const availableAttacks = this.character.ataques.filter(
			(attack) => attack && attack.disponivel
		);

		console.log("Available attacks:", availableAttacks);

		if (availableAttacks.length === 0) {
			$window.html(`
				<div style="display: flex; flex-direction: column; height: 100%; gap: 1rem;">
					<div style="display: flex; justify-content: center; align-items: center; flex: 1; background: rgba(20,15,10,0.8); border-radius: 12px; padding: 1rem;">
						<img src="${this.beast.image}" alt="${this.beast.name}" style="max-width: 300px; max-height: 200px; object-fit: contain; border: 2px solid #a68763; border-radius: 8px; background: #222;">
					</div>
					<div class="vn-dialog" style="margin: 0;">
						<div style="text-align: center; margin-bottom: 1rem;">
							<strong>Nenhuma arma disponível!</strong>
						</div>
						<div style="display: flex; gap: 1rem; justify-content: center;">
							<button id="back-to-actions" style="padding: 0.5rem 1rem; background: var(--color-primary); color: white; border: none; border-radius: 0.5rem; cursor: pointer;">Voltar</button>
						</div>
					</div>
				</div>
			`);

			$("#back-to-actions").on("click", () => this.showPlayerActions($window));
			return;
		}

		$window.html(`
			<div style="display: flex; flex-direction: column; height: 100%; gap: 1rem;">
				<div style="display: flex; justify-content: center; align-items: center; flex: 1; background: rgba(20,15,10,0.8); border-radius: 12px; padding: 1rem;">
					<img src="${this.beast.image}" alt="${
			this.beast.name
		}" style="max-width: 300px; max-height: 200px; object-fit: contain; border: 2px solid #a68763; border-radius: 8px; background: #222;">
				</div>
				<div class="vn-dialog" style="margin: 0;">
					<div style="text-align: center; margin-bottom: 1rem;">
						<strong>Escolha a arma:</strong>
					</div>
					<div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
						${availableAttacks
							.map(
								(a, i) => `
							<button class="choose-attack" data-i="${i}" style="padding: 0.5rem 1rem; background: var(--color-item-weapon); color: white; border: none; border-radius: 0.5rem; cursor: pointer;">
								${a.name} (${a.damage?.normal || 0} dano)
							</button>
						`
							)
							.join("")}
						<button id="back-to-actions" style="padding: 0.5rem 1rem; background: var(--color-secondary); color: white; border: none; border-radius: 0.5rem; cursor: pointer;">Voltar</button>
					</div>
				</div>
			</div>
		`);

		$window.off();

		$window.find(".choose-attack").on("click", (e) => {
			e.preventDefault();
			e.stopPropagation();
			const attackIndex = parseInt($(e.target).data("i"));
			const attack = availableAttacks[attackIndex];
			console.log("Selected attack:", attack, "Index:", attackIndex);
			if (attack) {
				this.chooseBeastPart($window, attack);
			}
		});

		$window.find("#back-to-actions").on("click", (e) => {
			e.preventDefault();
			e.stopPropagation();
			this.showPlayerActions($window);
		});
	}

	chooseBeastPart($window, weapon) {
		console.log("Choosing beast part with weapon:", weapon);
		console.log("Beast parts:", this.beast.parts);

		if (!this.beast.parts || !Array.isArray(this.beast.parts)) {
			console.error("Beast parts not available");
			this.showPlayerActions($window);
			return;
		}

		$window.html(`
			<div style="display: flex; flex-direction: column; height: 100%; gap: 1rem;">
				<div style="display: flex; justify-content: center; align-items: center; flex: 1; background: rgba(20,15,10,0.8); border-radius: 12px; padding: 1rem;">
					<img src="${this.beast.image}" alt="${
			this.beast.name
		}" style="max-width: 300px; max-height: 200px; object-fit: contain; border: 2px solid #a68763; border-radius: 8px; background: #222;">
				</div>
				<div class="vn-dialog" style="margin: 0;">
					<div style="text-align: center; margin-bottom: 1rem;">
						<strong>Atacando com ${weapon.name} - Escolha a parte da besta:</strong>
					</div>
					<div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
						${this.beast.parts
							.map(
								(p, i) => `
							<button class="choose-part" data-part-index="${i}" style="padding: 0.5rem 1rem; background: var(--color-item-armor); color: white; border: none; border-radius: 0.5rem; cursor: pointer;">
								${p.name}<br><small>Defesa: ${p.currentDefense ?? p.defense}</small>
							</button>
						`
							)
							.join("")}
						<button id="back-to-weapons" style="padding: 0.5rem 1rem; background: var(--color-secondary); color: white; border: none; border-radius: 0.5rem; cursor: pointer;">Voltar</button>
					</div>
				</div>
			</div>
		`);

		$window.off();

		$window.find(".choose-part").on("click", (e) => {
			e.preventDefault();
			e.stopPropagation();

			const partIndex = parseInt($(e.currentTarget).attr("data-part-index"));
			console.log("Selected part index:", partIndex);

			if (
				isNaN(partIndex) ||
				partIndex < 0 ||
				partIndex >= this.beast.parts.length
			) {
				console.error("Invalid part index:", partIndex);
				return;
			}

			const part = this.beast.parts[partIndex];
			console.log("Selected part:", part, "Index:", partIndex);

			if (part && weapon.damage) {
				const result = this.beast.receberDanoNaParte(
					part.name,
					weapon.damage.normal || 0
				);

				$window.html(`
					<div style="display: flex; flex-direction: column; height: 100%; gap: 1rem;">
						<div style="display: flex; justify-content: center; align-items: center; flex: 1; background: rgba(20,15,10,0.8); border-radius: 12px; padding: 1rem;">
							<img src="${this.beast.image}" alt="${this.beast.name}" style="max-width: 300px; max-height: 200px; object-fit: contain; border: 2px solid #a68763; border-radius: 8px; background: #222;">
						</div>
						<div class="vn-dialog" style="margin: 0;">
							<p style="text-align: center; font-size: 1.1rem;"><strong>${result.mensagem}</strong></p>
						</div>
					</div>
				`);

				setTimeout(() => {
					if (window.updateGameSidebar) window.updateGameSidebar();
				}, 100);

				if (this.beast.lifePoints <= 0) {
					setTimeout(() => {
						$window.html(`
							<div class="vn-dialog">
								<p style="text-align: center; font-size: 1.2rem; color: #27ae60;"><strong>Você venceu a besta!</strong></p>
							</div>
						`);
					}, 2000);
					return;
				}

				setTimeout(() => {
					this.playerHidden = false;
					this.playerTurn = false;
					if (this.character?.pet && this.character.pet.lifePoints > 0) {
						this.petTurn = true;
					}
					this.handleFight();
				}, 2000);
			}
		});

		$window.find("#back-to-weapons").on("click", (e) => {
			e.preventDefault();
			e.stopPropagation();
			this.chooseAttack($window);
		});
	}

	handlePetTurn($window) {
		if (!this.character?.pet || this.character.pet.lifePoints <= 0) {
			this.petTurn = false;
			this.handleFight();
			return;
		}

		$window.html(`
			<div style="display: flex; flex-direction: column; height: 100%; gap: 1rem;">
				<div style="display: flex; justify-content: center; align-items: center; flex: 1; background: rgba(20,15,10,0.8); border-radius: 12px; padding: 1rem;">
					<img src="${this.beast.image}" alt="${this.beast.name}" style="max-width: 300px; max-height: 200px; object-fit: contain; border: 2px solid #a68763; border-radius: 8px; background: #222;">
				</div>
				<div class="vn-dialog" style="margin: 0;">
					<div style="text-align: center; margin-bottom: 1rem;">
						<strong>Turno do ${this.character.pet.type}</strong>
					</div>
					<div style="display: flex; gap: 1rem; justify-content: center;">
						<button id="pet-attack" style="padding: 0.5rem 1rem; background: var(--color-item-weapon); color: white; border: none; border-radius: 0.5rem; cursor: pointer;">Atacar</button>
					</div>
				</div>
			</div>
		`);

		$window.find("#pet-attack").on("click", (e) => {
			e.preventDefault();
			e.stopPropagation();
			this.executePetAttack($window);
		});
	}

	executePetAttack($window) {
		const attackResult = this.character.pet.atacar(this.beast);

		if (!attackResult) {
			$window.html(`
				<div style="display: flex; flex-direction: column; height: 100%; gap: 1rem;">
					<div style="display: flex; justify-content: center; align-items: center; flex: 1; background: rgba(20,15,10,0.8); border-radius: 12px; padding: 1rem;">
						<img src="${this.beast.image}" alt="${this.beast.name}" style="max-width: 300px; max-height: 200px; object-fit: contain; border: 2px solid #a68763; border-radius: 8px; background: #222;">
					</div>
					<div class="vn-dialog" style="margin: 0;">
						<p style="text-align: center; font-size: 1.1rem;"><strong>O pet não conseguiu atacar!</strong></p>
					</div>
				</div>
			`);
		} else {
			$window.html(`
				<div style="display: flex; flex-direction: column; height: 100%; gap: 1rem;">
					<div style="display: flex; justify-content: center; align-items: center; flex: 1; background: rgba(20,15,10,0.8); border-radius: 12px; padding: 1rem;">
						<img src="${this.beast.image}" alt="${this.beast.name}" style="max-width: 300px; max-height: 200px; object-fit: contain; border: 2px solid #a68763; border-radius: 8px; background: #222;">
					</div>
					<div class="vn-dialog" style="margin: 0;">
						<p style="text-align: center; font-size: 1.1rem;"><strong>${this.character.pet.type} atacou ${attackResult.targetPart}!</strong></p>
						<p style="text-align: center; font-size: 1rem;">${attackResult.result.mensagem}</p>
					</div>
				</div>
			`);
		}

		setTimeout(() => {
			if (window.updateGameSidebar) window.updateGameSidebar();
		}, 100);

		if (this.beast.lifePoints <= 0) {
			setTimeout(() => {
				$window.html(`
					<div class="vn-dialog">
						<p style="text-align: center; font-size: 1.2rem; color: #27ae60;"><strong>Você venceu a besta!</strong></p>
					</div>
				`);
			}, 2000);
			return;
		}

		setTimeout(() => {
			this.petTurn = false;
			this.handleFight();
		}, 2000);
	}

	beastTurn($window) {
		if (this.playerHidden) {
			console.log("=== BEAST TURN - SEARCHING ===");
			console.log("Player hide value:", this.hideValue);

			const busca = this.beast.procurar(this.hideValue);

			console.log("Beast search result:", busca);
			console.log("=== FIM BEAST TURN - SEARCHING ===");

			if (busca.encontrou) {
				$window.html(
					`<div class="vn-dialog">
						<p>A besta te encontrou! (Rolou ${busca.rolagem} vs ${busca.necessario})</p>
						<p>Ela vai atacar.</p>
					</div>`
				);
				setTimeout(() => this.beastAttack($window), 1500);
			} else {
				$window.html(
					`<div class="vn-dialog">
						<p>A besta não te encontrou! (Rolou ${busca.rolagem} vs ${busca.necessario})</p>
						<p>Ela fugiu. Você venceu!</p>
					</div>`
				);
				return;
			}
		} else {
			this.beastAttack($window);
		}
	}

	beastAttack($window) {
		const ataque = this.beast.escolherAtaque();
		const dano = ataque.damage.normal;

		const target = this.beast.escolherAlvo(this.character);
		const targetName = target === "pet" ? this.character.pet.type : "você";

		$window.html(`
			<div style="display: flex; flex-direction: column; height: 100%; gap: 1rem;">
				<div style="display: flex; justify-content: center; align-items: center; flex: 1; background: rgba(20,15,10,0.8); border-radius: 12px; padding: 1rem;">
					<img src="${this.beast.image}" alt="${
			this.beast.name
		}" style="max-width: 300px; max-height: 200px; object-fit: contain; border: 2px solid #a68763; border-radius: 8px; background: #222;">
				</div>
				<div class="vn-dialog" style="margin: 0;">
					<div style="text-align: center; margin-bottom: 1rem;">
						<strong>A besta usou ${ataque.name} contra ${targetName}!</strong><br>
						<span style="color: #e74c3c;">Dano: ${dano}</span>
					</div>
					${
						target === "pet"
							? `<div style="display: flex; gap: 1rem; justify-content: center;">
							<button id="defend-pet-take" style="padding: 0.5rem 1rem; background: var(--color-item-weapon); color: white; border: none; border-radius: 0.5rem; cursor: pointer;">Pet Toma Dano</button>
						</div>`
							: `<div style="display: flex; gap: 1rem; justify-content: center;">
							<button id="defend-dodge" style="padding: 0.5rem 1rem; background: var(--color-primary); color: white; border: none; border-radius: 0.5rem; cursor: pointer;">Esquivar</button>
							<button id="defend-armor" style="padding: 0.5rem 1rem; background: var(--color-item-armor); color: white; border: none; border-radius: 0.5rem; cursor: pointer;">Usar Armadura</button>
							<button id="defend-life" style="padding: 0.5rem 1rem; background: var(--color-item-weapon); color: white; border: none; border-radius: 0.5rem; cursor: pointer;">Tomar na Vida</button>
						</div>`
					}
				</div>
			</div>
		`);

		$window.off();

		if (target === "pet") {
			$window.find("#defend-pet-take").on("click", (e) => {
				e.preventDefault();
				e.stopPropagation();

				const result = this.character.pet.receberDano(dano);

				$window.html(`
					<div style="display: flex; flex-direction: column; height: 100%; gap: 1rem;">
						<div style="display: flex; justify-content: center; align-items: center; flex: 1; background: rgba(20,15,10,0.8); border-radius: 12px; padding: 1rem;">
							<img src="${this.beast.image}" alt="${
					this.beast.name
				}" style="max-width: 300px; max-height: 200px; object-fit: contain; border: 2px solid #a68763; border-radius: 8px; background: #222;">
						</div>
						<div class="vn-dialog" style="margin: 0;">
							<p style="text-align: center; font-size: 1.1rem;"><strong>${
								result.message
							}</strong></p>
							${
								result.defeated
									? `<p style="text-align: center; color: #e74c3c;"><strong>Seu pet foi derrotado!</strong></p>`
									: ""
							}
						</div>
					</div>
				`);
				this.endBeastTurn($window);
			});
		} else {
			$window.find("#defend-dodge").on("click", (e) => {
				e.preventDefault();
				e.stopPropagation();
				this.character.esquivar();
				$window.html(`
					<div style="display: flex; flex-direction: column; height: 100%; gap: 1rem;">
						<div style="display: flex; justify-content: center; align-items: center; flex: 1; background: rgba(20,15,10,0.8); border-radius: 12px; padding: 1rem;">
							<img src="${this.beast.image}" alt="${this.beast.name}" style="max-width: 300px; max-height: 200px; object-fit: contain; border: 2px solid #a68763; border-radius: 8px; background: #222;">
						</div>
						<div class="vn-dialog" style="margin: 0;">
							<p style="text-align: center; font-size: 1.1rem;"><strong>Você esquivou, mas ganhou 1 de fadiga!</strong></p>
						</div>
					</div>
				`);
				this.endBeastTurn($window);
			});

			$window.find("#defend-armor").on("click", (e) => {
				e.preventDefault();
				e.stopPropagation();
				this.character.receberDano(dano, true);
				$window.html(`
					<div style="display: flex; flex-direction: column; height: 100%; gap: 1rem;">
						<div style="display: flex; justify-content: center; align-items: center; flex: 1; background: rgba(20,15,10,0.8); border-radius: 12px; padding: 1rem;">
							<img src="${this.beast.image}" alt="${this.beast.name}" style="max-width: 300px; max-height: 200px; object-fit: contain; border: 2px solid #a68763; border-radius: 8px; background: #222;">
						</div>
						<div class="vn-dialog" style="margin: 0;">
							<p style="text-align: center; font-size: 1.1rem;"><strong>Você usou a armadura para absorver o dano!</strong></p>
						</div>
					</div>
				`);
				this.endBeastTurn($window);
			});

			$window.find("#defend-life").on("click", (e) => {
				e.preventDefault();
				e.stopPropagation();
				this.character.receberDano(dano, false);
				$window.html(`
					<div style="display: flex; flex-direction: column; height: 100%; gap: 1rem;">
						<div style="display: flex; justify-content: center; align-items: center; flex: 1; background: rgba(20,15,10,0.8); border-radius: 12px; padding: 1rem;">
							<img src="${this.beast.image}" alt="${this.beast.name}" style="max-width: 300px; max-height: 200px; object-fit: contain; border: 2px solid #a68763; border-radius: 8px; background: #222;">
						</div>
						<div class="vn-dialog" style="margin: 0;">
							<p style="text-align: center; font-size: 1.1rem;"><strong>Você tomou o dano na vida!</strong></p>
						</div>
					</div>
				`);
				this.endBeastTurn($window);
			});
		}
	}

	endBeastTurn($window) {
		setTimeout(() => {
			if (window.updateGameSidebar) window.updateGameSidebar();
		}, 100);

		if (this.character.lifePoints <= 0) {
			setTimeout(() => {
				$window.html(`
					<div class="vn-dialog">
						<p style="text-align: center; font-size: 1.2rem; color: #e74c3c;"><strong>Você foi derrotado!</strong></p>
					</div>
				`);
			}, 2000);
			return;
		}

		if (this.beast.lifePoints <= 0) {
			setTimeout(() => {
				$window.html(`
					<div class="vn-dialog">
						<p style="text-align: center; font-size: 1.2rem; color: #27ae60;"><strong>Você venceu a besta!</strong></p>
					</div>
				`);
			}, 2000);
			return;
		}

		setTimeout(() => {
			this.playerTurn = true;
			this.petTurn = false;
			this.beastTurnActive = false;
			this.playerHidden = false;
			this.handleFight();
		}, 2000);
	}

	update() {
		switch (this.state) {
			case GameState.INVESTIGATION:
				this.handleInvestigation();
				break;
			case GameState.HUNT:
				this.handleHunt();
				break;
			case GameState.FIGHT:
				this.handleFight();
				break;
		}
	}

	handleInvestigation() {
		const $window = $(".game__window");
		$window.empty();
		this.dialogIndex = 0;
		this.showDialog($window);
	}

	showDialog($window) {
		const dialog = investigationDialog[this.dialogIndex];
		if (!dialog) {
			this.state = GameState.HUNT;
			this.update();
			return;
		}
		const dialogText =
			typeof dialog.text === "function" ? dialog.text.call(this) : dialog.text;
		$window.html(`
			<div class="vn-dialog">
				<strong>${dialog.speaker}:</strong>
				<div>
					<p>${dialogText}</p>
				<div class="vn-dialog__next">${dialog.next}</div>
			</div>
			`);
		const next = () => {
			if (typeof dialog.effect === "function") {
				dialog.effect.call(this);
			}

			if (this.dialogIndex < investigationDialog.length - 1) {
				this.dialogIndex++;
				this.showDialog($window);
			} else {
				this.state = GameState.HUNT;
				this.update();
			}
		};

		$window.off("click");
		$(document).off("keydown.vnDialog");

		$window.on("click", ".vn-dialog", (e) => {
			e.preventDefault();
			e.stopPropagation();
			next();
		});
		$(document).on("keydown.vnDialog", (e) => {
			if (e.key === "Enter") {
				e.preventDefault();
				next();
			}
		});
	}

	handleHunt() {
		const $window = $(".game__window");
		$window.empty();

		const hasFloatingPet =
			this.character?.pet &&
			this.character.pet.abilities?.some(
				(ability) => ability.name === "Voo" || ability.name === "Flying"
			);

		let found;
		if (hasFloatingPet) {
			found = "player";
		} else {
			found = Math.random() < 0.5 ? "player" : "beast";
		}

		if (found === "player") {
			const message = hasFloatingPet
				? "Seu pet voador avistou a besta! Você age primeiro."
				: "Você encontrou a Besta! Você age primeiro.";

			$window.html(`
				<div class="vn-dialog">
					<strong>Narrador:</strong>
					<p>${message}</p>
				</div>
				`);
			this.playerStarts = true;
		} else {
			$window.html(`
				<div class="vn-dialog">
					<strong>Narrador:</strong>
					<p>A besta encontrou você! Ela age primeiro.</p>
				</div>
				`);
			this.playerStarts = false;
		}

		setTimeout(() => {
			this.state = GameState.FIGHT;
			this.playerTurn = this.playerStarts;
			this.petTurn = false;
			this.beastTurnActive = false;
			this.update();
		}, 2000);
	}
}

setTimeout(() => {
	window.game = new GameController();
	window.game.update();
}, 500);
