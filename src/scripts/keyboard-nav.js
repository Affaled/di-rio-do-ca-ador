function setupKeyboardNavigation({
	containerSelector,
	itemSelector,
	selectedClass,
	vertical = true,
	onSelect = () => {},
}) {
	const $container = $(containerSelector);
	const $item = $container.find(itemSelector);
	if ($item.length === 0) return;

	let currentIndex = 0;

	function updateSelection() {
		$item.removeClass(selectedClass);
		$item.eq(currentIndex).addClass(selectedClass).focus();
	}

	$container.attr("tabindex", "0").focus();

	$(document).on("keydown", (e) => {
		const key = e.key;

		if ((vertical && key === "ArrowUp") || (!vertical && key === "ArrowLeft")) {
			currentIndex = (currentIndex - 1 + $item.length) % $item.length;
			updateSelection();
			e.preventDefault();
		}

		if (
			(vertical && key === "ArrowDown") ||
			(!vertical && key === "ArrowRight")
		) {
			currentIndex = (currentIndex + 1) % $item.length;
			updateSelection();
			e.preventDefault();
		}

		if (key === "Enter") {
			onSelect($item.eq(currentIndex).get(0));
			e.preventDefault();
		}
	});

	updateSelection();
}
