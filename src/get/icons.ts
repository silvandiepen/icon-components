const path = require('path');
const fs = require('fs').promises;

import { SettingsType, FilesType, FilesDataType } from '../types';

// import SVGO from 'svgo';
import {
	asyncForEach,
	fileName,
	prefixedName,
	asyncRemoveAttrs,
	asyncRemoveTags,
	svgOnly,
	getTagData
} from '../helpers';

import { kebabCase, PascalCase } from '@sil/case';
import { getFileTemplates } from './templates';

export const getFiles = async (
	settings: SettingsType
): Promise<SettingsType> => {
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
		return fs.readFile(path.join(filedata.src, srcFileName)).then((file) => {
			return file.toString();
		});
	} catch (err) {
		console.warn(err);
	}
};

const getStyleData = (filedata: string): string => getTagData(filedata,'style');

/*
  Get A list of all the files and their data. 
*/

export const getFileList = async (
	settings: SettingsType
): Promise<FilesType[]> => {
	let files = await fs.readdir(settings.src);
	let filelist = [];

	await asyncForEach(files, async (file: string) => {
		if (path.extname(file) !== '.svg') return;

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

		filelist.push({
			og_name: file,
			name: kebabCase(fileName(file)),
			title: PascalCase(path.basename(file)),
			title_lowercase: path.basename(file).toLowerCase(),
			fileName: prefixedName(file, settings.prefix),
			componentName: PascalCase(prefixedName(file, settings.prefix)),
			data: fileData,
			data_clean: {
				attrs: fileData__clean_attrs,
				tags: fileData__clean_tags,
				both: fileData__clean_both
			},
			style: getStyleData(fileData)
		});
	});
	return filelist;
};
