const routes = {
	404: "/pages/404.html",
	"/": "src/pages/menu.html",
	"/modulo-basico": "src/pages/basic-set.html",
	"/novo-personagem": "src/pages/new-character.html",
	"/jogo": "src/pages/game.html",
};

function route(event) {
	event = event || window.event;
	event.preventDefault();
	const href = event.target.getAttribute("href");
	window.location.hash = href;
}

function handleLocation() {
	let path = window.location.hash.replace(/^#/, "") || "/";
	const routePath = routes[path] || routes[404];

	$.get(routePath, function (html) {
		$("#root").html(html);
	});
}

$(document).ready(function () {
	window.onhashchange = handleLocation;
	window.route = route;

	$(document).on("click", "a.route-link", function (e) {
		route(e);
	});

	handleLocation();
});
