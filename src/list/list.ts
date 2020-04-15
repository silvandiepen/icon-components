const path = require('path');
const fs = require('fs').promises;

import ejs from 'ejs';
import { asyncForEach, getExtension, fileName } from '../helpers';
import { SettingsType, TemplateFileType, ListFilesType } from '../types';
import * as clog from 'cli-block';
import { writeFile } from '../build';
/*
  When there is no Template given, but a type. The templates will be gotten from the package.
*/

const getLocalListTemplates = async (
	settings: SettingsType
): Promise<TemplateFileType[]> => {
	let templates: any = [];
	try {
		let localTemplateDir = await fs.readdir(
			path.join(__dirname, '../../src/templates/list')
		);

		await asyncForEach(localTemplateDir, async (template: string) => {
			let fileData = await fs.readFile(
				path.join(__dirname, '../../src/templates/list', template)
			);
			templates.push({
				file: template,
				data: fileData.toString()
			});
		});

		return templates;
	} catch (err) {
		clog.BLOCK_ERRORS(["Couldn't get the template ", err]);
	}
};

export const getListTemplates = async (
	settings: SettingsType
): Promise<TemplateFileType[]> => {
	if (settings.listTemplate == null) {
		return await getLocalListTemplates(settings);
	}

	let templates = [];

	const stats = await fs.lstat(settings.listTemplate);
	if (stats.isDirectory()) {
		let templateFiles = await fs.readdir(settings.listTemplate);

		await asyncForEach(templateFiles, async (template: string) => {
			let fileData = await fs.readFile(
				path.join(settings.listTemplate, template)
			);

			templates.push({
				file: template,
				data: fileData.toString()
			});
		});
	} else {
		let fileData = await fs.readFile(settings.listTemplate);
		templates.push({
			file: settings.listTemplate,
			data: fileData.toString()
		});
	}
	return templates;
};

export const buildLists = async (
	settings: SettingsType,
	templates: TemplateFileType[]
): Promise<ListFilesType[]> => {
	let files = [];

	await asyncForEach(templates, (template) => {
		files.push({
			name: fileName(template.file),
			ext: getExtension(template.file),
			data: ejs.render(template.data, settings)
		});
	});

	return files;
};

export const writeLists = async (
	settings: SettingsType,
	lists: ListFilesType[]
): Promise<void> => {
	await asyncForEach(lists, async (file) => {
		await writeFile(settings, file);
		clog.BLOCK_LINE_SUCCESS(file.name);
	});
};

export const createLists = async (
	settings: SettingsType
): Promise<SettingsType> => {
	if (!settings.list) return settings;

	clog.BLOCK_MID('Lists');

	settings.inRoot = true;

	const templates = await getListTemplates(settings);
	const lists = await buildLists(settings, templates);

	await writeLists(settings, lists);

	// console.log('listTemplates', templates);

	return settings;
};
