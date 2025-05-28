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

	$(document).off("keydown.keyboardNav");

	$(document).on("keydown.keyboardNav", function (e) {
		const key = e.key;
		const tag = document.activeElement.tagName.toLowerCase();

		if (["input", "textarea", "select"].includes(tag)) {
			return;
		}

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
