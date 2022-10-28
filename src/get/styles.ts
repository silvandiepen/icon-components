const fs = require('fs').promises;
import { join, extname } from 'path';
import { kebabCase } from '@sil/case';

import { SettingsType, StyleFilesType } from '../types';
import { asyncForEach, fileName, getTagData, dirExist } from '../helpers';

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
			name: kebabCase(fileName(file)).replace(settings.removePrefix, ''),
			extension: extname(file),
			data: fileData || ''
		});
	});
	return filelist;
};

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
