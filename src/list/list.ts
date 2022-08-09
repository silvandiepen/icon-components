import { join } from 'path';
const { readdir, readFile, lstat } = require('fs').promises;

import ejs from 'ejs';
import { asyncForEach, getExtension, fileName } from '../helpers';
import { SettingsType, TemplateFileType, ListFilesType } from '../types';
import { blockErrors, blockLineSuccess, blockMid } from 'cli-block';
import { writeAFile } from '../build';
import { PascalCase, kebabCase, upperSnakeCase } from '@sil/case';
/*
  When there is no Template given, but a type. The templates will be gotten from the package.
*/

const getLocalTemplates = async (dir: string): Promise<TemplateFileType[]> => {
	let templates: any = [];
	try {
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
		blockErrors(["Couldn't get the template ", error]);
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
	settings: SettingsType
): Promise<TemplateFileType[]> => {
	if (settings.listTemplate[0] == null || settings.listTemplate.length < 1)
		return await getLocalTemplates('../../src/templates/list');

	const templates = getTemplateFiles(settings.listTemplate);

	return templates;
};

export const getIndexTemplates = async (
	settings: SettingsType
): Promise<TemplateFileType[]> => {
	if (settings.indexTemplate[0] == null || settings.indexTemplate.length < 1)
		return await getLocalTemplates('../../src/templates/index');

	const templates = getTemplateFiles(settings.indexTemplate);

	return templates;
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
					upperSnakeCase
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
		await writeAFile(settings, file);
		blockLineSuccess(file.name);
	});
};

export const createLists = async (settings: SettingsType): Promise<void> => {
	if (!settings.list) return;

	blockMid('Lists');

	settings.inRoot = true;

	const templates = await getListTemplates(settings);
	const files = await buildLists(settings, templates);
	await writeLists(settings, files);
};

export const createIndexes = async (settings: SettingsType): Promise<void> => {
	// console.log(settings);
	if (!settings.index) return;

	blockMid('Indexes');

	settings.inRoot = true;

	const templates = await getIndexTemplates(settings);
	const files = await buildLists(settings, templates);
	await writeLists(settings, files);
};
