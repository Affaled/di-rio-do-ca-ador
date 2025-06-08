export function rolld6() {
	const result = Math.floor(Math.random() * 6) + 1;
	console.log("=== ROLLD6 DEBUG ===");
	console.log("Random value:", Math.random());
	console.log("Dice result:", result);
	console.log("=== FIM ROLLD6 DEBUG ===");
	return result;
}
