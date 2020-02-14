const ejs = require("ejs");
const LIST = {};
const { lstat } = require("fs").promises;
const {
	prefixedName,
	PascalCase,
	removeTags,
	removeAttrs
} = require("./helpers.js");
const path = require("path");

LIST.Write = async (settings) => {
	let template;
	if (settings.options.list) {
		// Set the default template for lists
		template = path.join(__dirname, "../templates/list.json.template");
		// If the there is a template given. Use that.
		if (typeof settings.options.list == "string")
			template = settings.options.list;
	} else {
		return;
	}

	// Define the filelist.
	const files = settings.files.map(
		(file) =>
			(file = {
				data: file.data,
				data_clean: removeAttrs(file.data, ["id", "fill"]),
				data_stripped: removeAttrs(removeTags(file.data, ["svg", "title"]), [
					"id",
					"fill"
				]),
				name: file.name,
				title: PascalCase(file.name),
				title_lowercase: file.name.toLowerCase(),
				fileName: prefixedName(file.name, settings.options.prefix),
				componentName: PascalCase(
					prefixedName(file.name, settings.options.prefix)
				)
			})
	);

	// Get the template
	try {
		await lstat(template, (err, stats) => {
			if (err) console.log(err);

			if (stats.isFile()) writeListFile(template, files);

			// If the given template is a folder. Just get all files in the folder and compile them.
			if (stats.isDirectory()) {
				readdir(template, (err, templates) => {
					if (err) console.log(err);
					templates.forEach((file) => {
						LIST.writeFile(path.join(template, file), files);
					});
				});
			}
		});
	} catch (err) {
		console.warn(err);
	}
};

LIST.WriteFile = async (template, files) => {
	fsp.readFile(template).then(async (file) => {
		// Get the template and create the file with our components.
		const contents = ejs.render(file.toString(), {
			files: files,
			...settings.options
		});
		// Write the File
		await fsp.writeFile(
			path.join(
				settings.dest,
				path.basename(template.replace(".template", ""))
			),
			contents
		);
	});
};

module.exports = LIST;
