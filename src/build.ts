import path from 'path';

import { promises as fs } from 'fs';
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
import { kebabCase, fileName } from './helpers';
import { writeList } from './list';

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
	console.log(
		'jemoeder',
		data // typeof data.dest,
		// typeof fileName(file.name),
		// typeof kebabCase(fileName(file.name)) + (ext ? ext : '')
	);
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
		console.log(`\t${green('✔')} ${file.name}`);
	} catch (err) {
		console.log(`\t${red('×')} ${file.name} ${err}`);
	}
};

export const buildComponents = async (data) => {
	// Log it all\

	console.log('\n');
	console.log(
		`\t${bold('Generating')} ${bgBlue().black(
			' ' + data.template.toUpperCase() + ' '
		)} ${bold('components from svg files.')}`
	);
	console.log('\n');

	if (data.src && data.dest) {
		if (data.files && data.files.length > 0)
			console.log(`\tsrc:\t ${green().italic(data.src)} `);
		else
			console.log(
				`\tsrc:\t ${yellow().italic(data.src)} ${
					red("Your source folder doesn't contain any") +
					red().bold(' .svg ') +
					red('files.')
				}`
			);

		console.log(`\tdest:\t ${green().italic(data.dest)}`);
		console.log(`\n`);

		if (data.files && data.files.length > 0) {
			console.log(
				`\t${bold('Files')} ${blue().bold('(' + data.files.length + ')')}`
			);

			if (data.list) writeList(data);

			data.files.forEach(async (file, i) => {
				if (!data.inRoot)
					await fs.mkdir(path.join(data.dest, fileName(file.name)), {
						recursive: true,
						mode: 0o775
					});

				writeComponent(data, file);

				if (data.files.length == i + 1) {
					setTimeout(() => {
						console.log(' Done! ');
						console.log(`\n`);
					}, 1000);
				}
			});
		}
	} else {
		console.log(`\tdefine --src and --dest`);
		process.exit(1);
	}
};
