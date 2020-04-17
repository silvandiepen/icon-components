export {};
import {
	removeTags,
	asyncRemoveTags,
	removeAttrs,
	asyncRemoveAttrs,
	fixJsx,
	prefixedName,
	fileName
} from './helpers';

test('Remove requested Tags', () => {
	// assert

	const input = `<svg><test id="test"><g><path fill="test"></path></g></test></svg>`;
	const output = `<test id="test"><path fill="test"></path></test>`;

	const tags = ['svg', 'g'];

	// Expect
	expect(removeTags(input, tags)).toStrictEqual(output);
});

test('Remove requested Tags - async', async () => {
	// assert

	const input = `<svg><test id="test"><g><path fill="test"></path></g></test></svg>`;
	const output = `<test id="test"><path fill="test"></path></test>`;

	const tags = ['svg', 'g'];

	// Expect
	return asyncRemoveTags(input, tags).then((data) => {
		expect(data).toStrictEqual(output);
	});
});

test('Remove requested Attributes', () => {
	// assert

	const input = `<svg><test id="test"><path fill="test"></path></test></svg>`;
	const output = `<svg><test><path></path></test></svg>`;

	const attributes = ['id', 'fill'];

	// Expect
	expect(removeAttrs(input, attributes)).toStrictEqual(output);
});

test('Remove requested Attributes - async', async () => {
	// assert

	const input = `<svg><test id="test"><path fill="test"></path></test></svg>`;
	const output = `<svg><test><path></path></test></svg>`;

	const attributes = ['id', 'fill'];

	// Expect
	return asyncRemoveAttrs(input, attributes).then((data) => {
		expect(data).toStrictEqual(output);
	});
});

test('Fix JSX', () => {
	// assert

	const input = `<svg xmlns:xlink><test id="test"><path xlink:href fill="test"></path></test></svg>`;
	const output = `<svg xmlnsXlink><test id="test"><path xlinkHref fill="test"></path></test></svg>`;

	// Expect
	expect(fixJsx(input)).toStrictEqual(output);
});

test('prefixName', () => {
	// assert

	const input = `Some name`;
	const output = `icon-some-name`;
	const settings = {
		prefix: 'icon'
	};

	// Expect
	expect(prefixedName(input, settings.prefix)).toStrictEqual(output);
});

test('fileName', () => {
	// assert

	const input = `some/path/is/needed/Some name.test.template`;
	const output1 = `Some name.test`;
	const output2 = `iconSome name.test`;
	const settings = {
		prefix: 'icon'
	};

	// Expect
	expect(fileName(input)).toStrictEqual(output1);
	expect(fileName(input, settings)).toStrictEqual(output2);
});
