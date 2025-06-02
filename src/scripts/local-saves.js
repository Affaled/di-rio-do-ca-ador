export function saveToLocal(key, value) {
	try {
		localStorage.setItem(key, JSON.stringify(value));
		return true;
	} catch (e) {
		console.error("Erro ao salvar no localStorage:", e);
		return false;
	}
}

export function loadFromLocal(key) {
	try {
		const item = localStorage.getItem(key);
		return item ? JSON.parse(item) : null;
	} catch (e) {
		console.error("Erro ao carregar item do localStorage:", e);
		return null;
	}
}

export function removeFromLocal(key) {
	try {
		localStorage.removeItem(key);
	} catch (e) {
		console.error("Erro ao remover do localStorage:", e);
	}
}
