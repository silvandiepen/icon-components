const path = require('path');
const fs = require('fs').promises;
import { red, yellow, bgBlue, blue, green, bold } from 'kleur';
import {
	STENCIL_CSS,
	STENCIL_E2E,
	STENCIL_SPEC,
	STENCIL_TSX,
	REACT_MATERIAL,
	FROM_TEMPLATE,
	REACT
} from './files';
import { kebabCase, fileName, asyncForEach } from './helpers';
import { writeList } from './list';

import * as log from 'cli-block';

interface fileType {
	data: any;
	ext: string;
	name?: string;
	path?: string;
}
const makePath = async (filePath: string) => {
	const dirname = path.dirname(filePath);
	if ((await fs.stat(dirname)).isDirectory()) {
		return true;
	}
	makePath(dirname);
	fs.mkdir(dirname);
};

const buildFile = async (data, file: fileType) => {
	file.path = path.join(
		data.dest,
		fileName(file.name),
		kebabCase(fileName(file.name)) + (file.ext ? file.ext : '')
	);
	if (data.inRoot)
		file.path = path.join(
			data.dest,
			kebabCase(fileName(file.name)) + (file.ext ? file.ext : '')
		);
	await makePath(file.path);
	await fs.writeFile(file.path, file.data, {
		encoding: 'utf8',
		flag: 'w'
	});
};

const writeComponent = async function (data, file) {
	try {
		// Check if the tedmplate is a path. If so.. we can try to get those files and run them.
		if (data.template.indexOf('/') > 0) {
			await buildFile(data, {
				data: await FROM_TEMPLATE(file, data),
				ext: path.extname(data.template.replace('.template', '')),
				name: file.name
			});
		} else if (data.template) {
			switch (data.template) {
				case 'stencil':
					await buildFile(data, {
						data: await STENCIL_TSX(file, data),
						ext: '.ts',
						name: file.name
					});

					await buildFile(data, {
						data: await STENCIL_CSS(file, data),
						ext: '.css',
						name: file.name
					});
					await buildFile(data, {
						data: await STENCIL_E2E(file, data),
						ext: '.e2e.ts',
						name: file.name
					});
					await buildFile(data, {
						data: await STENCIL_SPEC(file, data),
						ext: '.spec.ts',
						name: file.name
					});

					break;
				case 'react-material':
					await buildFile(data, {
						data: await REACT_MATERIAL(file, data),
						ext: '.js',
						name: file.name
					});
					break;
				case 'react':
					await buildFile(data, {
						data: await REACT(file, data),
						ext: '.js',
						name: file.name
					});
					break;
			}
		}
		log.BLOCK_LINE(`${green('✔')} ${file.name}`);
	} catch (err) {
		log.BLOCK_LINE(`${red('×')} ${file.name} ${err}`);
	}
};

export const buildComponents = async (data) => {
	// Log it all\

	log.START(`Generating ${data.template}`);

	log.BLOCK_START(`Settings`);

	if (data.src && data.dest) {
		await log.BLOCK_SETTINGS({
			destination: data.dest,
			source: data.src,
			prefix: data.prefix,
			template: data.template,
			optimize: data.optimize,
			removeOld: data.removeOld
		});
		if (data.files && data.files.length < 1) {
			log.BLOCK_MID(`Warnings`);
			log.BLOCK_ROW_LINE([
				'src',
				`${yellow().italic(data.src)} ${
					red("Your source folder doesn't contain any") +
					red().bold(' .svg ') +
					red('files.')
				}`,
				''
			]);
		}

		log.BLOCK_LINE(``);

		if (data.files && data.files.length > 0) {
			log.BLOCK_MID(
				`${bold('Files')} ${blue().bold('(' + data.files.length + ')')}`
			);
			log.BLOCK_LINE();

			if (data.list) writeList(data);

			await asyncForEach(data.files, async (file, i) => {
				if (!data.inRoot)
					await fs.mkdir(path.join(data.dest, fileName(file.name)), {
						recursive: true,
						mode: 0o775
					});

				await writeComponent(data, file);
			});
			log.BLOCK_END('Done! ');
		}
	} else {
		console.log(`\tdefine --src and --dest`);
		process.exit(1);
	}
};
