function setupKeyboardNavigation({
	containerSelector,
	itemSelector,
	selectedClass,
	vertical = true,
	onSelect = () => {},
}) {
	const $container = $(containerSelector);
	const $items = $container.find(itemSelector);
	if ($items.length === 0) return;

	let currentIndex = 0;

	function updateSelection() {
		$items.removeClass(selectedClass);
		$items.eq(currentIndex).addClass(selectedClass).focus();
	}

	$items.on("mouseenter", function () {
		currentIndex = $items.index(this);
		updateSelection();
	});

	$container.attr("tabindex", "0").focus();

	// Remove qualquer handler anterior para evitar duplicidade
	$(document).off("keydown.keyboardNav");

	$(document).on("keydown.keyboardNav", function (e) {
		const key = e.key;

		if ((vertical && key === "ArrowUp") || (!vertical && key === "ArrowLeft")) {
			currentIndex = (currentIndex - 1 + $items.length) % $items.length;
			updateSelection();
			e.preventDefault();
		}

		if (
			(vertical && key === "ArrowDown") ||
			(!vertical && key === "ArrowRight")
		) {
			currentIndex = (currentIndex + 1) % $items.length;
			updateSelection();
			e.preventDefault();
		}

		if (key === "Enter" || key === " ") {
			onSelect($items.get(currentIndex));
			e.preventDefault();
		}
	});

	updateSelection();
}
