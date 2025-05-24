import { rolld6 } from "../rolld6";

class Equipment {
	constructor(name, type, props = {}) {
		this.name = name;
		this.type = type;
		this.damage = props.damage || 0;
		this.element = props.element || null;
		this.hands = props.hands || 1;
		this.effects = props.effects || [];
		this.protectionPoints = props.protectionPoints || null;
	}
}
