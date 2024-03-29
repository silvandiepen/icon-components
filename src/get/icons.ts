import { join, basename, extname } from 'path';
import { blockLineError } from 'cli-block';
const fs = require('fs').promises;
import { kebabCase, PascalCase } from '@sil/case';

import { getStyles, getStyleData } from '@/get/styles';
import { SettingsType, FilesType, FilesDataType } from '@/types';
import {
	asyncForEach,
	fileName,
	prefixedName,
	asyncRemoveAttrs,
	removeStyle,
	asyncRemoveTags,
	svgOnly,
	getAttrData,
	removeFix
} from '@/helpers';
import { getFileTemplates } from '@/get/templates';

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
	try {
		let files = await getFileList(settings).then((result) => result);

		const templates = await getFileTemplates(settings).then((result) => result);

		if (settings.filter) files = files.filter((file) => file.name.includes(settings.filter));

		return { ...settings, files: files, templates: templates };
	} catch (err) {
		console.log(err);
	}
};

export const getFileData = async (filedata: FilesDataType, srcFileName: string) => {
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
export const getSizes = (file: string): { width: number; height: number } => {
	const viewBox: string[] = getAttrData(file, 'viewbox')
		.replace(/[^\d. ]/g, '')
		.split(' ');

	if (viewBox.length !== 4) {
		blockLineError('Some file does not have a viewbox');
	}
	return {
		width: parseInt(viewBox[2], 10),
		height: parseInt(viewBox[3], 10)
	};
};



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

		const name = removeFix(kebabCase(fileName(file)), settings);
		const style = getStyleData(settings, name, fileData);

		const { width, height } = getSizes(fileData);

		filelist.push({
			og_name: file,
			name,
			title: PascalCase(basename(file)),
			title_lowercase: basename(file).toLowerCase(),
			fileName: prefixedName(file, settings.prefix),
			componentName: PascalCase(prefixedName(file, settings.prefix)),
			data: settings.removeStyle ? removeStyle(fileData) : fileData,
			data_clean: {
				attrs: settings.removeStyle
					? removeStyle(fileData__clean_attrs)
					: fileData__clean_attrs,
				tags: settings.removeStyle
					? removeStyle(fileData__clean_tags)
					: fileData__clean_tags,
				both: settings.removeStyle
					? removeStyle(fileData__clean_both)
					: fileData__clean_both
			},
			width,
			height,
			style
		});
	});
	return filelist;
};
