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

		// Don't interfere with inputs, textareas, selects, or game dialogs
		if (
			["input", "textarea", "select"].includes(tag) ||
			$(e.target).closest(".vn-dialog, .game__window").length > 0
		) {
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
			// Don't trigger selection if we're in a game dialog
			if (
				$(document.activeElement).closest(".vn-dialog, .game__window")
					.length === 0
			) {
				onSelect($items.get(currentIndex));
				e.preventDefault();
			}
		}
	});

	updateSelection();
}
