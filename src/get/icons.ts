const path = require('path');
const fs = require('fs').promises;

import { SettingsType, FilesType, FilesDataType } from '../types';

// import SVGO from 'svgo';
import {
	kebabCase,
	PascalCase,
	asyncForEach,
	fileName,
	prefixedName,
	removeAttrs,
	removeTags
} from '../helpers';

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
		const fileData = await getFileData(settings, file);
		filelist.push({
			og_name: file,
			name: kebabCase(fileName(file)),
			title: PascalCase(path.basename(file)),
			title_lowercase: path.basename(file).toLowerCase(),
			fileName: prefixedName(file, settings.prefix),
			componentName: PascalCase(prefixedName(file, settings.prefix)),
			data: fileData,
			data_clean: removeAttrs(fileData, settings.removeAttrs),
			data_stripped: removeAttrs(
				removeTags(fileData, settings.removeTags),
				settings.removeAttrs
			)
		});
	});
	return filelist;
};

// // Get the template
// export const getTemplate = async (
// 	srcFileName: string,
// 	external: boolean = false
// ): Promise<string> => {
// 	let currentPath = external
// 		? srcFileName
// 		: path.join(__dirname, '../src/templates', srcFileName + '.template');
// 	try {
// 		return fs.readFile(currentPath).then((file: any) => {
// 			return file.toString();
// 		});
// 	} catch (err) {
// 		console.warn(err);
// 	}
// };
