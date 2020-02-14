const BUILD = require("./build.js");
const path = require("path");
const fsp = require("fs").promises;
const { kebabCase, fileName } = require("./helpers.js");

const ACTION = {};

ACTION.WriteFile = async (file, ext, data, settings) => {
	let filePath = path.join(
		settings.dest,
		fileName(file.name),
		kebabCase(fileName(file.name)) + (ext ? ext : "")
	);
	if (settings.options.inRoot)
		filePath = path.join(
			settings.dest,
			kebabCase(fileName(file.name)) + (ext ? ext : "")
		);

	await fsp.writeFile(filePath, data);
};

ACTION.BuildFile = async (file, settings) => {
	if (
		settings.options &&
		settings.options.template &&
		settings.options.template.indexOf("/") > 0
	) {
		await ACTION.WriteFile(
			file,
			path.extname(settings.options.template.replace(".template", "")),
			await BUILD.FROM_TEMPLATE(file, settings.options),
			settings
		);
	} else if (settings.options.template) {
		switch (settings.options.template) {
			case "stencil":
				await ACTION.WriteFile(
					file,
					".tsx",
					await BUILD.STENCIL.TSX(file, settings.options),
					settings
				);
				await ACTION.WriteFile(
					file,
					".css",
					await BUILD.STENCIL.CSS(file, settings.options),
					settings
				);
				await ACTION.WriteFile(
					file,
					".e2e.ts",
					await BUILD.STENCIL.E2E(file, settings.options),
					settings
				);
				await ACTION.WriteFile(
					file,
					".spec.ts",
					await BUILD.STENCIL.SPEC(file, settings.options),
					settings
				);
				break;
			case "react-material":
				await ACTION.WriteFile(
					file,
					".js",
					await BUILD.REACT_MATERIAL(file, settings.options),
					settings
				);
				break;
			case "react":
				await ACTION.WriteFile(
					file,
					".js",
					await BUILD.REACT(file, settings.options),
					settings
				);
				break;
		}
	}
};

module.exports = ACTION;
