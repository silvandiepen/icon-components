import path from 'path';

import { kebabCase } from 'str-convert';

export const WAIT = async (time: number = 0) => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve('resolved');
		}, time);
	});
};

export const asyncForEach = async (array: any, callback: any) => {
	for (let index = 0; index < array.length; index++) {
		await callback(array[index], index, array);
	}
};

// export const kebabCase = (str: string): string =>
// 	str
// 		.match(/[A-Z]{2,}(?=[A-Z][a-z0-9]*|\b)|[A-Z]?[a-z0-9]*|[A-Z]|[0-9]+/g)
// 		.filter(Boolean)
// 		.map((x) => x.toLowerCase())
// 		.join('-');

export const fileName = (str: string, settings = null) => {
	if (settings)
		return `${settings.prefix}${path
			.basename(str)
			.replace('.template', '')
			.replace(path.extname(str), '')}`;
	else
		return `${path
			.basename(str)
			.replace('.template', '')
			.replace(path.extname(str), '')}`;
};

// export const PascalCase = (str: string): string =>
// 	str
// 		.replace('-', ' ')
// 		.match(/[a-zA-Z0-9]+/gi)
// 		.map(function (word) {
// 			return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
// 		})
// 		.join('');

export const removeTags = (str: string, tags: Array<string>): string => {
	tags.forEach((tag) => {
		const regex = new RegExp(`<[\/]{0,1}(${tag}|${tag})[^><]*>`, 'g');
		str = str.replace(regex, '');
	});
	return str;
};

export const removeAttrs = (str, attrs: Array<string>): string => {
	attrs.forEach((attr) => {
		const regex = new RegExp(`${attr}="[a-zA-Z0-9:;\.\s\(\)\-\,]*"`, 'gi');
		str = str.replace(regex, '').replace(' >', '>');
	});
	return str;
};

export const prefixedName = (name: string, prefix: string): string => {
	return prefix
		? `${prefix}-${kebabCase(fileName(name))}`
		: `icon-${kebabCase(fileName(name))}`;
};

export const getExtension = (file: string) => {
	let names = path.basename(file.replace('.template', '')).split('.');
	names[0] = '';
	return names.join('.');
};

export const fixJsx = (str: string): string => {
	return str
		.replace('xlink:href', 'xlinkHref')
		.replace('xmlns:xlink', 'xmlnsXlink');
};
