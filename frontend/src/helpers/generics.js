export const pipe = (...fns) => x => fns.reduce((y, f) => f(y), x);

export const update = old => (...updates) =>
	Object.assign({}, old, ...updates);
