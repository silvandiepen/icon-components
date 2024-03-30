import { basename, join, extname } from 'path';
import { blockErrors, blockLineError, blockLineSuccess, blockMid } from 'cli-block';
import { PascalCase, kebabCase } from '@sil/case';
import { CONST_CASE, dirExists } from '@/helpers';
const { readdir, readFile, lstat } = require('fs').promises;
import ejs from 'ejs';

import { asyncForEach, getExtension, fileName } from '@/helpers';
import { SettingsType, TemplateFileType, ListFilesType } from '@/types';
import { writeAFile } from '@/build';
/*
  When there is no Template given, but a type. The templates will be gotten from the package.
*/



const getLocalTemplates = async (dir: string): Promise<TemplateFileType[]> => {
	let templates: any = [];
	try {
		const exists = await dirExists(dir);
		if(!exists) {
			blockLineError(`The directory ${dir} does not exist`);
			return;
		}

		let localTemplateDir = await readdir(join(__dirname, dir));

		await asyncForEach(localTemplateDir, async (template: string) => {
			let fileData = await readFile(join(__dirname, dir, template));
			templates.push({
				file: template,
				data: fileData.toString()
			});
		});

		return templates;
	} catch (error) {
		console.log(error);
		// blockErrors(["Couldn't get the template ", error]);
	}
};

const getTemplateFiles = async (list): Promise<TemplateFileType[]> => {
	let templates = [];

	await asyncForEach(list, async (templateFile) => {
		const stats = await lstat(templateFile);
		if (stats.isDirectory()) {
			let templateFiles = await readdir(templateFile);

			try {
				await asyncForEach(templateFiles, async (template: string) => {
					let fileData = await readFile(join(templateFile, template));

					templates.push({
						file: template,
						data: fileData.toString()
					});
				});
			} catch (error) {
				blockErrors(["Couldn't get the template ", error, templateFiles]);
			}
		} else {
			try {
				let fileData = await readFile(templateFile);
				templates.push({
					file: templateFile,
					data: fileData.toString()
				});
			} catch (error) {
				blockErrors(["Couldn't get the template ", error, templateFile]);
			}
		}
	});
	return templates;
};

export const getListTemplates = async (
	settings: SettingsType,
	type: string = 'list'
): Promise<TemplateFileType[]> => {
	let listTemplate = [];
	switch (type) {
		case 'list':
			listTemplate = settings.listTemplate;
			break;
		case 'index':
			listTemplate = settings.indexTemplate;
			break;
		case 'types':
			listTemplate = settings.typesTemplate;
			break;
	}

	if (listTemplate[0] == null || listTemplate.length < 1) {
		const templateDir = `../src/templates/${type}`;
		return await getLocalTemplates(templateDir);
	}

	return await getTemplateFiles(listTemplate);
};

export const buildLists = async (
	settings: SettingsType,
	templates: TemplateFileType[]
): Promise<ListFilesType[]> => {
	let files = [];

	try {
		await asyncForEach(templates, (template) => {
			files.push({
				name: fileName(template.file),
				ext: getExtension(template.file),
				data: ejs.render(template.data, {
					...settings,
					PascalCase,
					kebabCase,
					upperSnakeCase: CONST_CASE
				})
			});
		});
	} catch (error) {
		console.warn(error);
	}
	return files;
};

export const writeLists = async (
	settings: SettingsType,
	lists: ListFilesType[]
): Promise<void> => {
	await asyncForEach(lists, async (file) => {
		// console.log(file);
		await writeAFile(settings, {
			...file,
			name: basename(file.name).replace(extname(file.name), '')
		});
		blockLineSuccess(file.name);
	});
};

export const createListType = async (
	settings: SettingsType,
	type: string = 'list'
): Promise<void> => {
	if (!settings[type]) return;

	blockMid(type);

	const templates = await getListTemplates(settings, type);
	const files = await buildLists(settings, templates);
	await writeLists(settings, files);
};

// export const createLists = async (settings: SettingsType): Promise<void> => {
// 	if (!settings.list) return;

// 	blockMid('Lists');

// 	settings.inRoot = true;

// 	const templates = await getListTemplates(settings);
// 	const files = await buildLists(settings, templates);
// 	await writeLists(settings, files);
// };

// export const createIndexes = async (settings: SettingsType): Promise<void> => {
// 	if (!settings.index) return;

// 	blockMid('Indexes');

// 	settings.inRoot = true;

// 	const templates = await getIndexTemplates(settings);
// 	const files = await buildLists(settings, templates);
// 	await writeLists(settings, files);
// };

// export const createTypes = async (settings: SettingsType): Promise<void> => {
// 	if (!settings.types) return;

// 	blockMid('Types');

// 	settings.inRoot = true;

// 	const templates = await getTypesTemplates(settings);
// 	const files = await buildLists(settings, templates);
// 	await writeLists(settings, files);
// };
