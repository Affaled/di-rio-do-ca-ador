const GameState = {
	INVESTIGATION: "investigação",
	HUNT: "caçada",
	FIGHT: "combate",
};

class GameController {
	constructor() {
		this.state = GameState.INVESTIGATION;
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

	handleInvestigation() {}

	handleHunt() {}

	handleFight() {}
}

const game = new GameController();
