#!/usr/bin/env node
const argv = require("yargs").argv;
const path = require("path");
// const mkdirp = require("mkdirp");
const rimraf = require("rimraf");
const SVGO = require("svgo");
const ejs = require("ejs");
const { lstat, readdir } = require("fs");
const fsp = require("fs").promises;
const BUILD = require("./build/files.js");
const { red, yellow, bgBlue, black, blue, green, bold } = require("kleur");
const {
	kebabCase,
	fileName,
	prefixedName,
	PascalCase
} = require("./build/helpers.js");

let settings = {
	src: path.join(argv.src),
	dest: path.join(argv.dest),
	filelist: [],
	files: [],
	error: null,
	options: {
		template: argv.template ? argv.template : false,
		inRoot: argv.inRoot ? true : false,
		removeOld: argv.removeOld ? true : false,
		prefix: argv.prefix ? `${argv.prefix}-` : "",
		list: argv.list ? argv.list : false
	}
};

// If remove old is set, the destination folder will be removed in order to be sure all files are new.
if (settings.options.removeOld) {
	rimraf(settings.dest + "/*", () => {
		console.log("Cleaned destination folder");
	});
}

const getSrcFiles = async (log) => {
	try {
		// Get the files
		await getFileList();
		await getFilesData();
	} catch (err) {
		console.log(err);
	}
	return log;
};

const getFileList = async () => {
	// Genereate a list of svg files from the source folder.
	let files = await fsp.readdir(settings.src);

	files.forEach((fileName) => {
		if (path.extname(fileName) == ".svg") {
			try {
				settings.filelist.push(fileName);
			} catch (err) {
				console.log(err);
			}
		}
	});
};
const getFilesData = async () => {
	// Go through each file and write it to the settings.
	let files = [];

	const svgo = new SVGO({
		removeAttrs: {
			attrs: ["xmlns"]
		}
	});

	await Promise.all(
		settings.filelist.map(async (srcFileName) => {
			try {
				await getFileData(srcFileName).then((fileData) => {
					const optimizedSVG = svgo.optimize(fileData).then((result) => {
						if (argv.optimize) fileData = optimizedSVG.data;
					});

					let file = { name: kebabCase(fileName(srcFileName)), data: fileData };
					settings.files.push(file);
				});
			} catch (err) {
				console.warn(err);
			}
		})
	);
};
const getFileData = async (srcFileName) => {
	try {
		return fsp.readFile(path.join(settings.src, srcFileName)).then((file) => {
			return file.toString();
		});
	} catch (err) {
		console.warn(err);
	}
};

const writeList = async () => {
	// Set the default template for lists
	let template = path.join(__dirname, "build/templates/list.json.template");
	// If the there is a template given. Use that.
	if (typeof settings.options.list == "string")
		template = settings.options.list;

	// Define the filelist.
	const files = settings.files.map(
		(file) =>
			(file = {
				name: file.name,
				componentName: PascalCase(
					prefixedName(file.name, settings.options.prefix)
				),
				fileName: prefixedName(file.name, settings.options.prefix)
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
						writeListFile(path.join(template, file), files);
					});
				});
			}
		});
	} catch (err) {
		console.warn(err);
	}
};
const writeListFile = async (template, files) => {
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

getSrcFiles(settings).then((result) => setTimeout(() => buildComponents(), 0));

const buildFile = async (file, ext, data) => {
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

const writeComponent = async function(file) {
	try {
		// Check if the tedmplate is a path. If so.. we can try to get those files and run them.
		if (settings.options.template.indexOf("/") > 0) {
			await buildFile(
				file,
				path.extname(settings.options.template.replace(".template", "")),
				await BUILD.FROM_TEMPLATE(file, settings.options)
			);
		} else if (settings.options.template) {
			switch (settings.options.template) {
				case "stencil":
					await buildFile(
						file,
						".tsx",
						await BUILD.STENCIL.TSX(file, settings.options)
					);
					await buildFile(
						file,
						".css",
						await BUILD.STENCIL.CSS(file, settings.options)
					);
					await buildFile(
						file,
						".e2e.ts",
						await BUILD.STENCIL.E2E(file, settings.options)
					);
					await buildFile(
						file,
						".spec.ts",
						await BUILD.STENCIL.SPEC(file, settings.options)
					);
					break;
				case "react-material":
					await buildFile(
						file,
						".js",
						await BUILD.REACT_MATERIAL(file, settings.options)
					);
					break;
				case "react":
					await buildFile(
						file,
						".js",
						await BUILD.REACT(file, settings.options)
					);
					break;
			}
		}
		console.log(`\t${green("✔")} ${file.name}`);
	} catch (err) {
		console.log(`\t${red("×")} ${file.name} ${err}`);
	}
};

function buildComponents() {
	// Log it all\

	console.log("\n");
	console.log(
		`\t${bold("Generating")} ${bgBlue().black(
			" " + settings.options.template.toUpperCase() + " "
		)} ${bold("components from svg files.")}`
	);
	console.log("\n");

	if (settings.src && settings.dest) {
		if (settings.files && settings.files.length > 0)
			console.log(`\tsrc:\t ${green().italic(argv.src)} `);
		else
			console.log(
				`\tsrc:\t ${yellow().italic(argv.src)} ${red(
					"Your source folder doesn't contain any"
				) +
					red().bold(" .svg ") +
					red("files.")}`
			);

		console.log(`\tdest:\t ${green().italic(argv.dest)}`);
		console.log(`\n`);

		if (settings.files && settings.files.length > 0) {
			console.log(
				`\t${bold("Files")} ${blue().bold("(" + settings.files.length + ")")}`
			);

			if (settings.options.list) writeList(settings.files);

			settings.files.forEach(async (file, i) => {
				if (!settings.options.inRoot)
					await fsp.mkdir(path.join(settings.dest, fileName(file.name)), {
						recursive: true,
						mode: 0o775
					});

				writeComponent(file);

				if (settings.files.length == i + 1) {
					setTimeout(() => {
						console.log(" Done! ");
						console.log(`\n`);
					}, 1000);
				}
			});
		}
	} else {
		console.log(`\tdefine --src and --dest`);
		process.exit(1);
	}
}
