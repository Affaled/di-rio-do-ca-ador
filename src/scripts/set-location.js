import { rolld6 } from "./rolld6.js";

export default function setLocation() {
	const prefixA = ["Krud", "Oden", "Sieg", "Hilde", "Saltz", "Erlan"];
	const prefixB = ["Lind", "Rosen", "Degen", "Ans", "Kings", "Bay"];
	const sufixA = ["burg", "gard", "heim", "hut", "wood", "ville"];
	const sufixB = ["born", "stad", "sen", "ia", "berg", "bach"];
	const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

	const table = [
		() => pick(prefixA) + pick(sufixA),
		() => pick(prefixB) + pick(sufixA),
		() => pick(prefixA) + pick(sufixB) + pick(sufixA),
		() => "Nova " + pick(sufixB) + pick(sufixA),
		() => pick(prefixA) + pick(sufixB),
		() => pick(prefixB) + pick(sufixB),
	];

	const idx = rolld6() - 1;
	const locationName = table[idx]();

	return locationName;
}
