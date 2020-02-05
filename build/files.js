const svgtojsx = require("svg-to-jsx");
const {
	kebabCase,
	PascalCase,
	fileName,
	removeTags,
	removeAttrs,
	prefixedName
} = require("./helpers.js");
const fsp = require("fs").promises;
const path = require("path");
const ejs = require("ejs");

// Get the template
const getTemplate = async (srcFileName, external = false) => {
	let currentPath = external
		? srcFileName
		: path.join(__dirname, "templates", srcFileName + ".template");
	try {
		return fsp.readFile(currentPath).then((file) => {
			return file.toString();
		});
	} catch (err) {
		console.warn(err);
	}
};

const BUILD = {};

BUILD.FROM_TEMPLATE = async (fileData, options) => {
	let template = await getTemplate(options.template, true);
	return ejs.render(template, {
		...options,
		data: fileData,
		data_clean: removeAttrs(fileData.data, ["id", "fill"]),
		data_stripped: removeAttrs(removeTags(fileData.data, ["svg", "title"]), [
			"id",
			"fill"
		]),
		name: fileData.name,
		title: PascalCase(fileData.name),
		title_lowercase: fileData.name.toLowerCase(),
		fileName: prefixedName(fileData.name, settings.options.prefix),
		componentName: PascalCase(prefixedName(fileData.name, options.prefix))
	});
};

BUILD.STENCIL = {
	SPEC: async (fileData, options) => {
		const currentFileName = prefixedName(fileData.name, options.prefix);
		let template = await getTemplate("stencil_spec");

		return ejs.render(template, {
			title: PascalCase(currentFileName),
			filename: options.prefix
				? options.prefix
				: `icon-${kebabCase(fileName(fileData.name))}`
		});
	},
	E2E: async (fileData, options) => {
		const currentFileName = prefixedName(fileData.name, options.prefix);
		let template = await getTemplate("stencil_e2e");

		return ejs.render(template, {
			title: PascalCase(currentFileName),
			filename: options.prefix
				? options.prefix
				: `icon-${kebabCase(fileName(fileData.name))}`
		});
	},
	CSS: async (fileData, options) => {
		let template = await getTemplate("stencil_css");

		return ejs.render(template);
	},
	TSX: async (fileData, options) => {
		const currentFileName = prefixedName(fileData.name, options.prefix);
		let template = await getTemplate("stencil_tsx");

		return await svgtojsx(fileData.data).then(function(jsx) {
			return ejs.render(template, {
				data: jsx,
				fileName: currentFileName,
				title_lowercase: kebabCase(fileName(fileData.name)),
				title: PascalCase(currentFileName)
			});
		});
	}
};

BUILD.REACT_MATERIAL = async (fileData, options) => {
	const currentFileName = prefixedName(fileData.name, options.prefix);
	let template = await getTemplate("react-material");

	return ejs.render(template, {
		data: removeTags(fileData.data, ["svg", "title"]),
		title: PascalCase(currentFileName)
	});
};

BUILD.REACT = async (fileData, options) => {
	const currentFileName = prefixedName(fileData.name, options.prefix);
	let template = await getTemplate("react");
	let svg = fileData.data;

	return await svgtojsx(svg).then(function(jsx) {
		return ejs.render(template, {
			data: svg,
			title: PascalCase(currentFileName)
		});
	});
};

module.exports = BUILD;
