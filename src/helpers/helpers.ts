import path from 'path';
const { mkdir } = require('fs').promises;
import { existsSync } from 'fs';

import { format } from 'prettier';
import { kebabCase, upperSnakeCase } from '@sil/case';
import { SettingsType } from '@/types';
import { lstat } from 'fs/promises';

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

export const removeStyle = (str: string): string => {
	return str.replace(/<style.*?>.*?<\/style>/ig, '');
}

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
		.replaceAll('fill-rule', 'fillRule')
		.replaceAll('clip-rule', 'clipRule')
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

export const dirExists = async (dir: string): Promise<boolean> => {
	try {
		await lstat(dir);
		return true;
	} catch (error) {
		return false;
	}
}


export const getTagData = (str: string, tag: string): string => {
	const regex = new RegExp(`<${tag}>(.|\n)*?<\/${tag}>`, 'gi');
	const matches = str.match(regex);

	return matches ? removeTags(matches[0], [tag]) : '';
};

export const getAttrData = (str: string, tag: string): string => {
	const regex = new RegExp(`${tag}="(.|\n)*?"`, 'gi');
	const matches = str.match(regex);

	return matches ? removeTags(matches[0], [tag]) : '';
};

export const formatFile = (str: string, ext: string) => {
	let parserFormat: string = null;

	const allowed = [
		'scss',
		'css',
		'less',
		'graphql',
		'html',
		'vue',
		'yaml',
		'mdx'
	];

	if (allowed.includes(ext)) {
		parserFormat = ext;
	} else {
		switch (ext) {
			case 'js':
			case 'jsx':
				parserFormat = 'babel';
				break;
			case 'ts':
			case 'tsx':
				parserFormat = 'typescript';
				break;
			case 'json':
				parserFormat = 'json5';
				break;
			case 'md':
				parserFormat = 'markdown';
				break;
		}
	}

	return parserFormat ? format(str, { parser: parserFormat }) : str;
};

export const dirExist = (dir: string): boolean => {
	try {
		return existsSync(dir);
	} catch (e) {
		return false;
	}
};


export const CONST_CASE = (str: string): string => {
	const ConvertedString = upperSnakeCase(str);
	// Check if the first character is a number, in that case we need to return the string with a _ in front. 
	if (!isNaN(parseInt(ConvertedString.charAt(0)))) {
		return `_${ConvertedString}`;
	}
	return ConvertedString;

}



export const removeFix = (str: string, settings: SettingsType): string => {
	// Remove settings.removePrefix from the start of the file name
	if (str.startsWith(settings.removePrefix)) {
		str = str.replace(settings.removePrefix, '');
	}
	if (str.endsWith(settings.removeAffix)) {
		str = str.replace(settings.removeAffix, '');
	}
	if (str.includes(settings.removeString)) {
		str = str.replace(settings.removeString, '');
	}
	return str;
}