import { join, dirname } from 'path';
const { mkdir, stat, writeFile } = require('fs').promises;
import ejs from 'ejs';
import { red, yellow, blue, bold } from 'kleur';
import {
	blockErrors,
	blockHeader,
	blockLineError,
	blockLineSuccess,
	blockMid,
	blockRowLine,
	blockSettings
} from 'cli-block';

import * as helpers from '../helpers';
import {
	fileName,
	asyncForEach,
	getExtension,
	WAIT,
	createAFolder,
	formatFile
} from '../helpers';
import { kebabCase, PascalCase, upperSnakeCase } from '@sil/case';

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
		blockErrors(['Woops, something happened during writing. ', err]);
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
		PascalCase,
		kebabCase,
		upperSnakeCase
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
			const data = await CombineTemplateWithData(file, template, settings);
			const ext = getExtension(template.file);

			await writeAFile(settings, {
				data: formatFile(data, ext),
				ext,
				name: file.name
			});
			blockLineSuccess(`${file.name}${blue(getExtension(template.file))}`);
		} catch (err) {
			blockLineError(`${file.name}${blue(getExtension(template.file))} ${err}`);
		}
	});
};

/*

	Start the building process

	*/

export const startBuild = async (settings: SettingsType): Promise<void> => {
	// Log it all\

	blockHeader(
		`Generating ${
			settings.template ? settings.template : settings.type ? settings.type : ''
		}`
	);
	blockMid(`Settings`);

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

		await blockSettings(showSettings);

		if (settings.files.length < 1) {
			blockMid(`Warnings`);
			blockRowLine([
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
		blockMid(
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
