import { rolld6 } from "./rolld6.js";

export default function setLocation() {
	const prefixA = ["Krud", "Oden", "Sieg", "Hilde", "Saltz", "Erlan"];
	const prefixB = ["Lind", "Rosen", "Degen", "Ans", "Kings", "Bay"];
	const sufixA = ["burg", "gard", "heim", "hut", "wood", "ville"];
	const sufixB = ["born", "stad", "sen", "ia", "berg", "bach"];
	const citySize = [
		{
			name: "Povoado",
			description: "Apenas algumas casas simples ou mesmo improvisadas.",
		},
		{
			name: "Aldeia",
			description:
				"Algumas casas, um poço e uma pequena taverna ou 'casa comum'.",
		},
		{
			name: "Vilarejo",
			description:
				"Não possui muros. Possui um pequeno templo e uma hospedaria ou taverna.",
		},
		{
			name: "Vila",
			description:
				"Possui uma simples defesa de madeira, um templo, uma mercearia e uma hospedaria ou taverna.",
		},
		{
			name: "Pequena Cidade",
			description:
				"Possui muros, um templo, um mercado  e alguns estabelecimentos.",
		},
		{
			name: "Grande Cidade",
			description:
				"Possui muros altos, um grande templo, um grande mercado e muitos estabelecimentos.",
		},
	];
	const cityType = [
		{
			name: "Raça",
			description:
				"Os habitantes são de uma raça diferente e única desta região.",
		},
		{
			name: "Ruínas",
			description:
				"Esta localidade foi destruída há algum tempo, mas segue tentando sobreviver desde então.",
		},
		{
			name: "Reiligião",
			description:
				"Os habitantes em geral são muito religiosos e os sacerdotes são as autoridades ali.",
		},
		{
			name: "Comércio",
			description:
				"O comércio é o principal meio de sustento desta localidade.",
		},
		{
			name: "Rural",
			description:
				"É uma região basicamente rural e os habitantes são bem pacíficos.",
		},
		{
			name: "Militar",
			description:
				"Esta localidade foi criada com uma função militar, embora já possa ter perdido esse objetivo.",
		},
	];
	const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

	const nameTable = [
		() => pick(prefixB) + pick(sufixB),
		() => pick(prefixA) + pick(sufixB),
		() => "Nova " + pick(sufixB) + pick(sufixA),
		() => pick(prefixA) + pick(sufixB) + pick(sufixA),
		() => pick(prefixB) + pick(sufixA),
		() => pick(prefixA) + pick(sufixA),
	];

	const idx = rolld6() - 1;
	const locationName = nameTable[idx]();
	const locationSize = citySize[idx];
	const locationType = cityType[idx];

	return {
		name: locationName,
		size: locationSize,
		type: locationType,
	};
}
