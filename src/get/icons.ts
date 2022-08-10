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
	getTagData,
	dirExist
} from '../helpers';

import { kebabCase, PascalCase } from '@sil/case';
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
	try {
		const files = await getFileList(settings).then((result) => result);
		const templates = await getFileTemplates(settings).then((result) => result);
		return { ...settings, files: files, templates: templates };
	} catch (err) {
		console.log(err);
	}
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

const getFileData = async (filedata: FilesDataType, srcFileName: string) => {
	try {
		return fs.readFile(path.join(filedata.src, srcFileName)).then((file) => {
			return file.toString();
		});
	} catch (err) {
		console.warn(err);
	}
};

const getStyleData = (
	settings: SettingsType,
	name: string,
	filedata: string
): string => {
	const tagData = getTagData(filedata, 'style');

	const cssFile = settings.styles
		? settings.styles.find((style) => style.name === name)
		: null;

	const style = tagData + (cssFile ? cssFile.data : '');
	return style;
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
		const name = kebabCase(fileName(file));

		filelist.push({
			og_name: file,
			name: name,
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
			style: getStyleData(settings, name, fileData)
		});
	});
	return filelist;
};

export const getStyleFileList = async (
	settings: SettingsType
): Promise<FilesType[]> => {

	
	const fileDirectory = path.join(settings.src, 'styles');
	if (!dirExist(fileDirectory)) return [];

	const files = await fs.readdir(fileDirectory);
	const filelist = [];

	await asyncForEach(files, async (file: string) => {
		if (path.extname(file) !== '.css') return;

		const fileData = await fs
			.readFile(path.join(fileDirectory, file))
			.then((f) => {
				return f.toString();
			});

		filelist.push({
			name: kebabCase(fileName(file)),
			data: fileData || ''
		});
	});
	return filelist;
};
