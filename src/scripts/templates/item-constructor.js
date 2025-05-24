import { rolld6 } from "../rolld6";

class Item {
	constructor(name, effect, quantity = 1) {
		this.name = name;
		this.effect = effect;
		this.quantity = quantity;
	}

	use() {
		if (this.quantity > 0) {
			this.quantity--;
			console.log(`Used ${this.name}. Remaining quantity: ${this.quantity}`);
			return this.effect;
		} else {
			console.log("No more items left to use.");
		}
	}
}
