function setupKeyboardNavigation({
	containerSelector,
	itemSelector,
	selectedClass,
	vertical = true,
	onSelect = () => {},
}) {
	const container = document.querySelector(containerSelector);
	if (!container) return;

	const items = container.querySelectorAll(itemSelector);
	if (items.length === 0) return;

	let currentIndex = 0;

	function updateSelection() {
		items.forEach((item) => item.classList.remove(selectedClass));
		items[currentIndex].classList.add(selectedClass);
		items[currentIndex].focus();
	}

	items.forEach((item, index) => {
		item.addEventListener("mouseenter", () => {
			currentIndex = index;
			updateSelection();
		});
	});

	container.setAttribute("tabindex", "0");
	container.focus();

	document.addEventListener("keydown", (e) => {
		const key = e.key;

		if ((vertical && key === "ArrowUp") || (!vertical && ley === "ArrowLeft")) {
			currentIndex = (currentIndex - 1 + items.length) % items.length;
			updateSelection();
			e.preventDefault();
		}

		if (
			(vertical && key === "ArrowDown") ||
			(!vertical && key === "ArrowRight")
		) {
			currentIndex = (currentIndex + 1) % items.length;
			updateSelection();
			e.preventDefault();
		}

		if (key === "Enter" || key === " ") {
			onSelect(items[currentIndex]);
			e.preventDefault();
		}
	});

	updateSelection();
}
