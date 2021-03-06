import path from 'path';
const { mkdir } = require('fs').promises;

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

const tagsRegex = (tag: string): any =>
	new RegExp(`<[\/]{0,1}(${tag}|${tag})[^><]*>`, 'g');

export const removeTags = (str: string, tags: Array<string>): string => {
	tags.forEach((tag) => {
		str = str.replace(tagsRegex(tag), '');
	});
	return str;
};

export const asyncRemoveTags = async (
	str: string,
	tags: Array<string>
): Promise<string> => {
	await asyncForEach(tags, (tag: string) => {
		str = str.replace(tagsRegex(tag), '');
	});
	return str;
};

const attrRegex = (attr: string): any => new RegExp(` ${attr}="[^"]*"`, 'gi');

export const removeAttrs = (str: string, attrs: Array<string>): string => {
	attrs.forEach((attr) => {
		str = str.replace(attrRegex(attr), '');
	});
	return str;
};

export const asyncRemoveAttrs = async (
	str: string,
	attrs: Array<string>
): Promise<string> => {
	await asyncForEach(attrs, (attr: string) => {
		str = str.replace(attrRegex(attr), '');
	});
	return str;
};

export const svgOnly = (str: string): string => {
	return str.substring(
		str.indexOf('<svg'),
		str.indexOf('</svg>') + '</svg>'.length
	);
};

export const prefixedName = (name: string, prefix: string): string => {
	if (prefix === '') return kebabCase(fileName(name));
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

export const createAFolder = async (dir: string): Promise<void> => {
	try {
		await mkdir(dir, {
			recursive: true,
			mode: 0o775
		});
	} catch (error) {
		console.log(`error creating folder ${dir}`);
	}
	return;
};
