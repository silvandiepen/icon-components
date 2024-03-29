import path from 'path';
const fs = require('fs').promises;
import { SettingsType, TemplateFileType } from '@/types';
import { asyncForEach } from '@/helpers';

/*
  When there is no Template given, but a type. The templates will be gotten from the package.
*/

const getLocalTemplates = async (
	settings: SettingsType
): Promise<TemplateFileType[]> => {
	if (!settings.type) return;

	let templates: any = [];
	try {
		let localTemplateDir = await fs.readdir(
			path.join(__dirname, '../../src/templates', settings.type)
		);

		await asyncForEach(localTemplateDir, async (template: string) => {
			let fileData = await fs.readFile(
				path.join(__dirname, '../../src/templates/', settings.type, template)
			);
			templates.push({
				file: template,
				data: fileData.toString()
			});
		});
		return templates;
	} catch (err) {
		console.error('Type does not exist');
	}
};

/*
  Get all templates.
*/

export const getFileTemplates = async (
	settings: SettingsType
): Promise<TemplateFileType[]> => {
	if (settings.template == null) {
		return await getLocalTemplates(settings);
	}

	let templates = [];

	const stats = await fs.lstat(settings.template);
	if (stats.isDirectory()) {
		let templateFiles = await fs.readdir(settings.template);

		await asyncForEach(templateFiles, async (template: string) => {
			let fileData = await fs.readFile(path.join(settings.template, template));
			templates.push({
				file: template,
				data: fileData.toString()
			});
		});
	} else {
		let fileData = await fs.readFile(
			path.join(settings.template)
			// path.join(__dirname, '../../', settings.template)
		);
		templates.push({
			file: settings.template,
			data: fileData.toString()
		});
	}
	return templates;
};
