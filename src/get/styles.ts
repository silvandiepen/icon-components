const fs = require('fs').promises;
import { join, extname } from 'path';
import { kebabCase } from '@sil/case';

import { SettingsType, StyleFilesType } from '@/types';
import { asyncForEach, fileName, getTagData, dirExist, removeFix } from '@/helpers';

/**
 * Retrieves style data for a given component.
 * @param {SettingsType} settings - The settings object containing style configuration
 * @param {string} name - The name of the component
 * @param {string} filedata - The file content containing style data
 * @returns {{ data: string; ext: string }} An object containing style data and extension
 */
export const getStyleData = (
	settings: SettingsType,
	name: string,
	filedata: string
): { data: string; ext: string } => {
	const tagData = getTagData(filedata, 'style');
	const cssFile = settings.styles
		? settings.styles.find((style) => style.name === name)
		: null;

	return {
		data: tagData + (cssFile ? cssFile.data : ''),
		// ext: cssFile.extension || 'css',
		ext: 'css'
	};
};

/**
 * Retrieves a list of style files from the specified directory.
 * @param {SettingsType} settings - The settings object containing style directory configuration
 * @returns {Promise<StyleFilesType[]>} A promise that resolves with an array of style file objects
 */
export const getStyleFileList = async (
	settings: SettingsType
): Promise<StyleFilesType[]> => {
	const fileDirectory = settings.styleDir ? settings.styleDir : settings.src;

	if (!dirExist(fileDirectory)) return [];

	const files = await fs.readdir(fileDirectory);
	const filelist = [];

	await asyncForEach(files, async (file: string) => {
		if (!['.css', '.scss', '.sass', '.less', '.stylus'].includes(extname(file)))
			return;

		const fileData = await fs.readFile(join(fileDirectory, file)).then((f) => {
			return f.toString();
		});

		filelist.push({
			name: removeFix(kebabCase(fileName(file)),settings),
			extension: extname(file),
			data: fileData || ''
		});
	});
	return filelist;
};

/**
 * Processes and adds style information to the settings object.
 * @param {SettingsType} settings - The settings object to be updated with styles
 * @returns {Promise<SettingsType>} A promise that resolves with the updated settings object
 */
export const getStyles = async (
	settings: SettingsType
): Promise<SettingsType> => {
	try {
		const styles = await getStyleFileList(settings).then((result) => result);
		return { ...settings, styles: styles };
	} catch (err) {
		console.log(err);
	}
};
