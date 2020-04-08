const path = require('path');
const fs = require('fs').promises;

import ejs from 'ejs';
import { PascalCase, removeTags, removeAttrs, prefixedName } from './helpers';

export const writeList = async (settings) => {
	// Set the default template for lists
	let template = path.join(__dirname, '../src/templates/list.json.template');
	// If the there is a template given. Use that.
	if (typeof settings.list == 'string') template = settings.list;

	// Define the filelist.
	const files = settings.files.map(
		(file) =>
			(file = {
				data: file.data,
				data_clean: removeAttrs(file.data, ['id', 'fill']),
				data_stripped: removeAttrs(removeTags(file.data, ['svg', 'title']), [
					'id',
					'fill'
				]),
				name: file.name,
				title: PascalCase(file.name),
				title_lowercase: file.name.toLowerCase(),
				fileName: prefixedName(file.name, settings.prefix),
				componentName: PascalCase(prefixedName(file.name, settings.prefix))
			})
	);

	// Get the template
	try {
		const stats = await fs.lstat(template);
		// if (err) console.log(err);

		if (stats.isFile()) writeListFile(template, files, settings);

		// If the given template is a folder. Just get all files in the folder and compile them.
		if (stats.isDirectory()) {
			const templates = await fs.readdir(template);

			templates.forEach((file) => {
				writeListFile(path.join(template, file), files, settings);
			});
		}
	} catch (err) {
		console.warn(err);
	}
};
export const writeListFile = async (
	template: string,
	files: Array<string>,
	settings
) => {
	fs.readFile(template).then(async (file) => {
		// Get the template and create the file with our components.
		const contents = ejs.render(file.toString(), {
			files: files,
			...settings
		});
		// Write the File
		await fs.writeFile(
			path.join(
				settings.dest,
				path.basename(template.replace('.template', ''))
			),
			contents
		);
	});
};
