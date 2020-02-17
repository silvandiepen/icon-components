const templates = {};
const fs = require("fs").promises;
const path = require("path");
// const { PascalCase, kebabCase, asyncForEach } = require("./helpers");

templates.GET_EXT_TEMPLATES = async (data) => {
	try {
		// If its internal or not an external directory, just go on.
		if (!data.settings.external || !data.settings.externalDir) return data;

		// Process External templates
		const templates = await fs
			.readdir(data.settings.template)
			.then((result) => {
				return result.map((file) => {
					return {
						// name: data.settings.options.template,
						file: file,
						path: path.join(data.settings.template, file)
					};
				});
			});
		return { ...data, templates: templates };
	} catch (err) {
		console.log(err);
	}
};

templates.GET_EXT_TEMPLATE = (data) => {
	// If its internal or an external directory, just go on.
	if (
		!data.settings.external ||
		(!data.settings.external && data.settings.externalDir)
	)
		return data;

	// Process Single External template
	return {
		...data,
		templates: [
			{
				file: data.settings.template,
				path: data.settings.template
			}
		]
	};
};

templates.GET_INT_TEMPLATE = async (data) => {
	// If it's external, just continue.
	if (data.settings.external) return data;
	// Process Internal templates

	return {
		...data,
		templates: await fs
			.readdir(path.join(__dirname, "../templates"))
			.then((result) => {
				return result
					.filter((template) => {
						// Filter out any value which is not the template.
						return template.indexOf(data.settings.template + ".") > -1 ||
							template.indexOf(data.settings.template + "_") > -1
							? true
							: false;
					})
					.map((file) => {
						return {
							// name: data.settings.options.template,
							file: file,
							path: path.join(__dirname, "../templates", file)
						};
					});
			})
	};
};

templates.IS_EXT_TEMPLATE = async (data) => {
	const template = data.settings.template;

	// If it doesnt have a slash, its for sure not a path.
	if (template.indexOf("/") < 0) return data;

	// Get the stats of a path.
	let stats = await fs.lstat(template).then((res) => {
		return res;
	});

	// if it's a file or a directory.. it's external.
	if (stats.isFile() || stats.isDirectory()) {
		const updatedSettings = {
			...data.settings,
			external: true,
			externalDir: stats.isFile() ? false : true
		};
		return {
			...data,
			settings: updatedSettings
		};
	} else return data;
};

templates.GET_TEMPLATE_DATA = async (data) => {
	try {
		return Promise.all(
			data.templates.map(async (file) => {
				return {
					...file,
					data: await fs.readFile(file.path).then((result) => {
						// console.log(result.toString());
						return result.toString();
					})
				};
			})
		).then((result) => {
			// console.log(result);
			return { ...data, templates: result };
		});
	} catch (err) {
		console.log(err);
	}
};

module.exports = templates;
