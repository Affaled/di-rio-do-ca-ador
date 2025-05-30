function setupGameScale() {
	const BASE_WIDTH = 1366;
	const BASE_HEIGHT = 768;
	const BASE_RATIO = BASE_WIDTH / BASE_HEIGHT;

	function scaleGame() {
		const windowWidth = $(window).width();
		const windowHeight = $(window).height();
		const windowRatio = windowWidth / windowHeight;

		let scale;
		let translateX = 0;
		let translateY = 0;

		if (windowRatio > BASE_RATIO) {
			scale = windowHeight / BASE_HEIGHT;
			translateX = (windowWidth - BASE_WIDTH * scale) / 2;
		} else {
			scale = windowWidth / BASE_WIDTH;
			translateY = (windowHeight - BASE_HEIGHT * scale) / 2;
		}

		$("#root").css({
			transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`,
			"transform-origin": "0 0",
			width: `${BASE_WIDTH}px`,
			height: `${BASE_HEIGHT}px`,
			transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`,
			"backface-visibility": "hidden",
			"will-change": "transform",
		});
	}

	scaleGame();

	$(window).on("resize", scaleGame);
}
