import path from 'path';
const { mkdir } = require('fs').promises;
import { existsSync } from 'fs';

import { format } from 'prettier';
import { kebabCase, upperSnakeCase } from '@sil/case';
import { SettingsType } from '@/types';
import { lstat } from 'fs/promises';

/**
 * Delays execution for a specified amount of time.
 * @param {number} [time=0] - The time to wait in milliseconds
 * @returns {Promise<string>} A promise that resolves with 'resolved' after the delay
 */
export const WAIT = async (time: number = 0) => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve('resolved');
		}, time);
	});
};

/**
 * Executes an async callback for each element in an array sequentially.
 * @param {any[]} array - The array to iterate over
 * @param {Function} callback - The async callback function to execute for each element
 * @returns {Promise<void>} A promise that resolves when all iterations are complete
 */
export const asyncForEach = async (array: any, callback: any) => {
	for (let index = 0; index < array.length; index++) {
		await callback(array[index], index, array);
	}
};

/**
 * Extracts and formats a file name from a path string.
 * @param {string} str - The file path string
 * @param {any} [settings=null] - Optional settings object containing prefix configuration
 * @returns {string} The formatted file name
 */
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

/**
 * Removes specified HTML tags from a string.
 * @param {string} str - The input string containing HTML
 * @param {string[]} tags - Array of tag names to remove
 * @returns {string} The string with specified tags removed
 */
export const removeTags = (str: string, tags: Array<string>): string => {
	tags.forEach((tag) => {
		str = str.replace(tagsRegex(tag), '');
	});
	return str;
};

/**
 * Asynchronously removes specified HTML tags from a string.
 * @param {string} str - The input string containing HTML
 * @param {string[]} tags - Array of tag names to remove
 * @returns {Promise<string>} A promise that resolves with the modified string
 */
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

/**
 * Removes specified attributes from HTML elements in a string.
 * @param {string} str - The input string containing HTML
 * @param {string[]} attrs - Array of attribute names to remove
 * @returns {string} The string with specified attributes removed
 */
export const removeAttrs = (str: string, attrs: Array<string>): string => {
	attrs.forEach((attr) => {
		str = str.replace(attrRegex(attr), '');
	});
	return str;
};

/**
 * Asynchronously removes specified attributes from HTML elements in a string.
 * @param {string} str - The input string containing HTML
 * @param {string[]} attrs - Array of attribute names to remove
 * @returns {Promise<string>} A promise that resolves with the modified string
 */
export const asyncRemoveAttrs = async (
	str: string,
	attrs: Array<string>
): Promise<string> => {
	await asyncForEach(attrs, (attr: string) => {
		str = str.replace(attrRegex(attr), '');
	});
	return str;
};

/**
 * Removes style tags and their content from an HTML string.
 * @param {string} str - The input string containing HTML
 * @returns {string} The string with style tags removed
 */
export const removeStyle = (str: string): string => {
	return str.replace(/<style.*?>.*?<\/style>/ig, '');
}

/**
 * Extracts the SVG content from a string.
 * @param {string} str - The input string containing SVG
 * @returns {string} The extracted SVG content
 */
export const svgOnly = (str: string): string => {
	return str.substring(
		str.indexOf('<svg'),
		str.indexOf('</svg>') + '</svg>'.length
	);
};

/**
 * Generates a prefixed component name.
 * @param {string} name - The base name
 * @param {string} prefix - The prefix to add
 * @returns {string} The prefixed component name
 */
export const prefixedName = (name: string, prefix: string): string => {
	if (prefix === '') return kebabCase(fileName(name));
	return prefix
		? `${prefix}-${kebabCase(fileName(name))}`
		: `icon-${kebabCase(fileName(name))}`;
};

/**
 * Gets the file extension from a file path.
 * @param {string} file - The file path
 * @returns {string} The file extension
 */
export const getExtension = (file: string) => {
	let names = path.basename(file.replace('.template', '')).split('.');
	names[0] = '';
	return names.join('.');
};

/**
 * Fixes JSX attribute names in SVG content.
 * @param {string} str - The SVG content string
 * @returns {string} The string with JSX-compatible attribute names
 */
export const fixJsx = (str: string): string => {
	return str
		.replaceAll('fill-rule', 'fillRule')
		.replaceAll('clip-rule', 'clipRule')
		.replace('xlink:href', 'xlinkHref')
		.replace('xmlns:xlink', 'xmlnsXlink');
};

/**
 * Creates a directory with specified permissions.
 * @param {string} dir - The directory path to create
 * @returns {Promise<void>} A promise that resolves when the directory is created
 */
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

/**
 * Checks if a directory exists.
 * @param {string} dir - The directory path to check
 * @returns {Promise<boolean>} A promise that resolves with true if directory exists, false otherwise
 */
export const dirExists = async (dir: string): Promise<boolean> => {
	try {
		await lstat(dir);
		return true;
	} catch (error) {
		return false;
	}
}


/**
 * Extracts content between specified XML/HTML tags.
 * @param {string} str - The input string containing XML/HTML
 * @param {string} tag - The tag name to extract content from
 * @returns {string} The content between the specified tags
 */
export const getTagData = (str: string, tag: string): string => {
	const regex = new RegExp(`<${tag}>(.|\n)*?<\/${tag}>`, 'gi');
	const matches = str.match(regex);

	return matches ? removeTags(matches[0], [tag]) : '';
};

/**
 * Extracts attribute data from XML/HTML elements.
 * @param {string} str - The input string containing XML/HTML
 * @param {string} tag - The attribute name to extract
 * @returns {string} The extracted attribute data
 */
export const getAttrData = (str: string, tag: string): string => {
	const regex = new RegExp(`${tag}="(.|\n)*?"`, 'gi');
	const matches = str.match(regex);

	return matches ? removeTags(matches[0], [tag]) : '';
};

/**
 * Formats a file's content based on its extension using prettier.
 * @param {string} str - The content to format
 * @param {string} ext - The file extension
 * @returns {string} The formatted content
 */
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

/**
 * Checks if a directory exists (synchronous version).
 * @param {string} dir - The directory path to check
 * @returns {boolean} True if directory exists, false otherwise
 */
export const dirExist = (dir: string): boolean => {
	try {
		return existsSync(dir);
	} catch (e) {
		return false;
	}
};


/**
 * Converts a string to CONSTANT_CASE format.
 * @param {string} str - The input string
 * @returns {string} The string in CONSTANT_CASE format
 */
export const CONST_CASE = (str: string): string => {
	const ConvertedString = upperSnakeCase(str);
	// Check if the first character is a number, in that case we need to return the string with a _ in front.
	if (!isNaN(parseInt(ConvertedString.charAt(0)))) {
		return `_${ConvertedString}`;
	}
	return ConvertedString;

}



/**
 * Removes specified prefixes, affixes, and strings from a string.
 * @param {string} str - The input string
 * @param {SettingsType} settings - Settings containing removal configurations
 * @returns {string} The string with specified parts removed
 */
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
