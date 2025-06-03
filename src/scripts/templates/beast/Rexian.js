import Beast from "./Beast.js";

export default class Rexian extends Beast {
	static name = "Rexian";
	static attacks = [
		{
			name: "Cauda",
			damage: {
				normal: 6,
			},
		},
		{
			name: "Mordida",
			damage: {
				normal: 5,
			},
		},
	];
	static parts = [
		{
			name: "Cabeça",
			defense: 40,
			height: 1,
		},
		{
			name: "Tronco",
			defense: 35,
			height: 1,
		},
	];
	static image = "/src/assets/images/rexian-image.png";

	constructor(element, weakness) {
		super(
			Rexian.name,
			element,
			weakness,
			Rexian.attacks,
			4,
			Rexian.parts,
			100,
			Rexian.image
		);
	}
}
