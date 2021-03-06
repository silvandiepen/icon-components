import { join, dirname } from 'path';
const { mkdir, stat, writeFile } = require('fs').promises;
import ejs from 'ejs';
import { red, yellow, blue, green, bold } from 'kleur';
import * as clog from 'cli-block';

import * as helpers from '../helpers';
import {
	fileName,
	asyncForEach,
	getExtension,
	WAIT,
	createAFolder
} from '../helpers';
import { kebabCase, pascalCase } from 'str-convert';

import {
	SettingsType,
	FilesType,
	TemplateFileType,
	WriteFileType
} from '../types';

/*

	Create the path if it doesn't exist.

	*/
const makePath = async (filePath: string) => {
	const directoryName = dirname(filePath);
	if ((await stat(directoryName)).isDirectory()) {
		return true;
	}
	makePath(directoryName);
	mkdir(directoryName);
};

/*

	Write the file

	*/

export const writeAFile = async (
	settings: SettingsType,
	file: WriteFileType
) => {
	try {
		let filePath = join(
			settings.dest,
			kebabCase(fileName(file.name)),
			kebabCase(fileName(file.name)) + (file.ext ? file.ext : '')
		);

		if (settings.inRoot)
			filePath = join(
				settings.dest,
				kebabCase(fileName(file.name)) + (file.ext ? file.ext : '')
			);

		await makePath(filePath);

		await writeFile(filePath, file.data, {
			encoding: 'utf8',
			flag: 'w'
		});
	} catch (err) {
		clog.BLOCK_ERRORS(['Woops, something happened during writing. ', err]);
	}
};
/*

	Build/Combine the template with the data using EJS 

	*/

export const CombineTemplateWithData = async (
	file: any,
	template: TemplateFileType,
	settings: SettingsType
): Promise<string> =>
	ejs.render(template.data, {
		...settings,
		...file,
		...helpers,
		pascalCase,
		kebabCase
	});

/*

	Write a single Component

	*/

const buildComponent = async function (
	settings: SettingsType,
	file: FilesType
): Promise<void> {
	await asyncForEach(settings.templates, async (template: TemplateFileType) => {
		try {
			await writeAFile(settings, {
				data: await CombineTemplateWithData(file, template, settings),
				ext: getExtension(template.file),
				name: file.name
			});
			clog.BLOCK_LINE(
				`${green('✔')} ${file.name}${blue(getExtension(template.file))}`
			);
		} catch (err) {
			clog.BLOCK_LINE(
				`${red('×')} ${file.name}${blue(getExtension(template.file))} ${err}`
			);
		}
	});
};

/*

	Start the building process

	*/

export const startBuild = async (settings: SettingsType): Promise<void> => {
	// Log it all\

	clog.START(`Generating ${settings.template}`);
	clog.BLOCK_START(`Settings`);

	if (settings.src && settings.dest) {
		let showSettings = {
			destination: settings.dest,
			source: settings.src,
			prefix: settings.prefix,
			template: settings.template ? settings.template : settings.type,
			optimize: settings.optimize,
			removeOld: settings.removeOld,
			list: settings.list ? settings.list : false,
			listTemplate: settings.listTemplate ? settings.listTemplate : false,
			index: settings.index ? settings.index : false,
			indexTemplate: settings.indexTemplate ? settings.indexTemplate : false,
			totalFiles: settings.files.length
		};

		await clog.BLOCK_SETTINGS(showSettings);

		if (settings.files.length < 1) {
			clog.BLOCK_MID(`Warnings`);
			clog.BLOCK_ROW_LINE([
				'src',
				`${yellow().italic(settings.src)} ${
					red("Your source folder doesn't contain any") +
					red().bold(' .svg ') +
					red('files.')
				}`,
				''
			]);
		}
	}
};

export const buildComponents = async (
	settings: SettingsType
): Promise<void> => {
	if (settings.files.length > 0) {
		clog.BLOCK_MID(
			`${bold('Files')} ${blue().bold('(' + settings.files.length + ')')}`
		);

		await asyncForEach(settings.files, async (file: FilesType) => {
			if (!settings.inRoot)
				await createAFolder(join(settings.dest, fileName(file.name)));

			buildComponent(settings, file);
		});
	}
	await WAIT(100);
};

/*

	Build the files!

	*/

export const buildFiles = async (
	settings: SettingsType
): Promise<SettingsType> => {
	await startBuild(settings);
	await buildComponents(settings);
	return settings;
};
