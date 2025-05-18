const routes = {
	404: "/pages/404.html",
	"/": "src/pages/menu.html",
};

function route(event) {
	event = event || window.event;
	event.preventDefault();
	window.history.pushState({}, "", event.target.href);
	handleLocation();
}

function handleLocation() {
	let path = window.location.pathname;

	if (path === "/index.html") {
		window.history.replaceState({}, "", "/");
		path = "/";
	}

	const routePath = routes[path] || routes[404];

	$.get(routePath, function (html) {
		$("#root").html(html);
	});
}

$(document).ready(function () {
	window.onpopstate = handleLocation;
	window.route = route;

	$(document).on("click", "a.route-link", function (e) {
		route(e);
	});

	handleLocation();
});
