import {
	pipe, update
} from './generics';

describe('Testing pipe fn', () => {
	test('Works if the functions are good', () => {
		const f = n => n * 2;
		const g = n => n + 1;
		const h = n => n - 4;

		expect(pipe(h, g, f)(9)).toEqual(12);
		expect(pipe(f, g, h)(9)).toEqual(15);
	});

	test('Errors otherwise', () => {
		const f = n => n * 2;
		const g = 6;

		expect(() => pipe(f, g)(20)).toThrow(TypeError);
	});
});

describe('Testing update fn', () => {
	test('Works if all elements are good', () => {
		const old = {
			foo: 'bar', name: 'old', bool: false
		};
		const updateOne = {
			foo: 'baz', meaning: 42
		};
		const updateTwo = {
			foo: 'fizz', bool: true, arr: []
		};
		expect(update(old)(updateOne, updateTwo)).toEqual({
			name: 'old', meaning: 42, foo: 'fizz', bool: true, arr: []
		});

		expect(update(old)(updateTwo, updateOne)).toEqual({
			name: 'old', meaning: 42, foo: 'baz', bool: true, arr: []
		});
	});

	test('Returns defaults with no updates', () => {
		const obj = { foo: 'bar ' };
		expect(update(obj)()).toEqual(obj);
		expect(update(obj)(null)).toEqual(obj);
		expect(update(obj)({})).toEqual(obj);
	});

	test('Leaves original unchanges', () => {
		const obj = { foo: 'bar' };
		update(obj)({ foo: 'baz' });
		expect(obj).toEqual({ foo: 'bar' });
	});
});
