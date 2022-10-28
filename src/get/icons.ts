import { join, basename, extname } from 'path';
const fs = require('fs').promises;
import { kebabCase, PascalCase } from '@sil/case';

import { getStyles, getStyleData } from './styles';
import { SettingsType, FilesType, FilesDataType } from '../types';
import {
	asyncForEach,
	fileName,
	prefixedName,
	asyncRemoveAttrs,
	asyncRemoveTags,
	svgOnly
} from '../helpers';
import { getFileTemplates } from './templates';

export const getData = async (
	settings: SettingsType
): Promise<SettingsType> => {
	settings = await getStyles(settings);	
	settings = await getFiles(settings);
	return settings;
};

export const getFiles = async (
	settings: SettingsType
): Promise<SettingsType> => {	

	const files = await getFileList(settings).then((result) => result);




	try {
		const files = await getFileList(settings).then((result) => result);

		const templates = await getFileTemplates(settings).then((result) => result);

		return { ...settings, files: files, templates: templates };
	} catch (err) {
		console.log(err);
	}
};

const getFileData = async (filedata: FilesDataType, srcFileName: string) => {
	try {
		return fs.readFile(join(filedata.src, srcFileName)).then((file) => {
			return file.toString();
		});
	} catch (err) {
		console.warn(err);
	}
};

/*
  Get A list of all the files and their data. 
*/

export const getFileList = async (
	settings: SettingsType
): Promise<FilesType[]> => {
	let files = await fs.readdir(settings.src);
	let filelist = [];


	await asyncForEach(files, async (file: string) => {

		if (extname(file) !== '.svg') return;

		const fileData = await getFileData(settings, file).then(svgOnly);

		const fileData__clean_attrs = await asyncRemoveAttrs(
			settings.svgOnly ? svgOnly(fileData) : fileData,
			settings.removeAttrs
		);

		const fileData__clean_tags = await asyncRemoveTags(
			settings.svgOnly ? svgOnly(fileData) : fileData,
			settings.removeTags
		);

		const fileData__clean_both = await asyncRemoveTags(
			fileData__clean_attrs,
			settings.removeTags
		);
		const name = kebabCase(fileName(file)).replace(settings.removePrefix, '');
		const style = getStyleData(settings, name, fileData);

		filelist.push({
			og_name: file,
			name,
			title: PascalCase(basename(file)),
			title_lowercase: basename(file).toLowerCase(),
			fileName: prefixedName(file, settings.prefix),
			componentName: PascalCase(prefixedName(file, settings.prefix)),
			data: fileData,
			data_clean: {
				attrs: fileData__clean_attrs,
				tags: fileData__clean_tags,
				both: fileData__clean_both
			},
			style
		});
	});
	return filelist;
};
