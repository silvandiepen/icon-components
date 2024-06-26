import { join, dirname } from 'path';
const { mkdir, stat, writeFile } = require('fs').promises;
import { render } from 'ejs';
import { kebabCase, PascalCase } from '@sil/case';
import { CONST_CASE } from '@/helpers';



import {
	red, yellow, blue, bold,
	blockHeader,
	blockLineError,
	blockLineSuccess,
	blockMid,
	blockRowLine,
	blockSettings
} from 'cli-block';

import { defaultSettings } from '@/settings';

import * as helpers from '@/helpers';
import {
	fileName,
	asyncForEach,
	getExtension,
	WAIT,
	createAFolder,
	formatFile
} from '@/helpers';

import {
	SettingsType,
	FilesType,
	TemplateFileType,
	WriteFileType
} from '@/types';

const packageJson = require('../../package.json');

/*

	Create the path if it doesn't exist.

	*/
const makePath = async (filePath: string) => {
	const directoryName = dirname(filePath);
	if ((await stat(directoryName)).isDirectory()) {
		return true;
	}
	mkdir(directoryName);
};

/*

	Write the file

	*/

export const writeAFile = async (
	settings: SettingsType,
	file: WriteFileType
) => {
	const dest = file.dest ? file.dest : settings.dest;

	// Check if dest exists, if it doesnt, create it
	await createAFolder(dest);


	const filePath = join(dest, file.name + (file.ext ? file.ext : ''));
	const data = settings.prependLine
		? `${settings.prependLine}\n${file.data}`
		: file.data;

	try {
		await makePath(filePath);

		await writeFile(filePath, data, {
			encoding: 'utf8',
			flag: 'w'
		});
	} catch (err) {
		console.log(err);
		// blockErrors(['Woops, something happened during writing. ', err]);
	}
};
/*

	Build/Combine the template with the data using EJS 

	*/

export const CombineTemplateWithData = async (
	file: any,
	template: TemplateFileType,
	settings: SettingsType
): Promise<string> => {
	return render(template.data, {
		...settings,
		...file,
		...helpers,
		PascalCase,
		kebabCase,
		upperSnakeCase: CONST_CASE
	});
};

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
				name: kebabCase(fileName(file.name)),
				dest: settings.dest
			});

			blockLineSuccess(
				`${file.name}${blue(getExtension(template.file))}${file.style ? ` ${blue('+ style')}` : ''
				}`
			);

			if (!(!settings.inRoot && settings.parentIndex)) return;

			const indexData = `export * from "./${file.name}";`;
			const indexExt = ['.ts', '.tsx'].includes(ext) ? '.ts' : '.js';

			await writeAFile(settings, {
				data: formatFile(indexData, indexExt),
				ext: indexExt,
				name: 'index',
				dest: settings.dest
			});
		} catch (err) {
			blockLineError(`${file.name}${blue(getExtension(template.file))} ${err}`);
		}
	});
};

/*

	Start the building process

	*/

const getShowSettings = (settings: SettingsType): Partial<SettingsType> => {
	const show: Partial<SettingsType> = {};
	Object.keys(settings).forEach((key) => {
		const value = settings[key];
		if (typeof value === 'object' && value.length > 0) {
			show[key] = value;
		} else if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
			value && (show[key] = value);
		}
	});
	return show;
}

export const startBuild = async (settings: SettingsType): Promise<void> => {
	// Log it all\

	blockHeader(`Generating Icons - ${packageJson.version}`);
	blockMid(`Settings`);

	if (settings.src && settings.dest) {
		const showSettings = { ...getShowSettings(settings), files: settings.files.length };

		await blockSettings(showSettings);

		if (settings.files.length < 1) {
			blockMid(`Warnings`);
			blockRowLine([
				'src',
				`${yellow().italic(settings.src)} ${red("Your source folder doesn't contain any") +
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
			let newFolder = join(settings.dest);
			if (settings.iconFolder && !settings.inRoot)
				newFolder = join(
					settings.dest,
					settings.iconFolder,
					fileName(file.name)
				);
			else if (!settings.inRoot)
				newFolder = join(settings.dest, fileName(file.name));
			else if (settings.iconFolder)
				newFolder = join(settings.dest, settings.iconFolder);

			await createAFolder(newFolder);

			buildComponent({ ...settings, dest: newFolder }, file);
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
