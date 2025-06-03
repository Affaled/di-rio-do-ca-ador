export default function beastCreate() {
	const sortElement = ["Fogo", "Gelo", "Ácido", "Eletricidade"];
	const sortWeakness = ["Ácido", "Eletricidade", "Fogo", "Gelo"];
	const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

	const element = pick(sortElement);
	const weakness = pick(sortWeakness);

	return {
		element: element,
		weakness: weakness,
	};
}
