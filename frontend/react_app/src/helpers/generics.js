export const pipe = (...fns) => x => fns.reduce((y, f) => f(y), x);

export const update = old => (...updates) =>
	Object.assign({}, old, ...updates);

export const titleCase = str =>
	str && typeof str === 'string' ? str.toLowerCase().split(' ').map(word => (
		word.replace(word[0], word[0].toUpperCase())
	)).join(' ') : '';
