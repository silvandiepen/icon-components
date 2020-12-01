import { join } from 'path';
const { readdir, readFile, lstat } = require('fs').promises;

import ejs from 'ejs';
import { asyncForEach, getExtension, fileName } from '../helpers';
import { SettingsType, TemplateFileType, ListFilesType } from '../types';
import * as clog from 'cli-block';
import { writeAFile } from '../build';
/*
  When there is no Template given, but a type. The templates will be gotten from the package.
*/

const getLocalListTemplates = async (
	settings: SettingsType
): Promise<TemplateFileType[]> => {
	let templates: any = [];
	try {
		let localTemplateDir = await readdir(
			join(__dirname, '../../src/templates/list')
		);

		await asyncForEach(localTemplateDir, async (template: string) => {
			let fileData = await readFile(
				join(__dirname, '../../src/templates/list', template)
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
	if (settings.listTemplate[0] == null || settings.listTemplate.length < 1)
		return await getLocalListTemplates(settings);

	let templates = [];

	await asyncForEach(settings.listTemplate, async (templateFile) => {
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
				throw new Error(error);
			}
		} else {
			try {
				let fileData = await readFile(templateFile);
				templates.push({
					file: templateFile,
					data: fileData.toString()
				});
			} catch (error) {
				throw new Error(error);
			}
		}
	});
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
		await writeAFile(settings, file);
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

	return settings;
};
