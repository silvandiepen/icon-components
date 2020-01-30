#!/usr/bin/env node
const argv = require("yargs").argv;
const path = require("path");
const mkdirp = require("mkdirp");
const rimraf = require("rimraf");
const SVGO = require("svgo");
const fsp = require("fs").promises;
const BUILD = require("./build/files.js");
const { red, yellow, bgWhite, blue, green, bold } = require("kleur");
const { kebabCase, fileName } = require("./build/helpers.js");

let settings = {
	src: path.join(argv.src),
	dest: path.join(argv.dest),
	filelist: [],
	files: [],
	error: null,
	options: {
		removeOld: argv.removeOld ? true : false,
		prefix: argv.prefix ? `${argv.prefix}-` : ""
	}
};

// If remove old is set, the destination folder will be removed in order to be sure all files are new.
if (settings.options.removeOld) {
	rimraf(settings.dest, () => {
		console.log("Removed destination folder");
	});
}

const getSrcFiles = async function(log) {
	try {
		// Get the files
		await getFileList();
		await getFilesData();
	} catch (err) {
		console.log(err);
	}
	return log;
};

const getFileList = async function() {
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
const getFilesData = async function() {
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
const getFileData = async function(srcFileName) {
	try {
		// let fileData = 'hoi';
		return fsp.readFile(path.join(settings.src, srcFileName)).then((file) => {
			return file.toString();
		});
	} catch (err) {
		console.warn(err);
	}
};

getSrcFiles(settings).then((result) => setTimeout(() => logResult(), 1000));

const buildFile = async (file, ext, data) => {
	await fsp.writeFile(
		path.join(
			settings.dest,
			fileName(file.name),
			kebabCase(fileName(file.name)) + ext
		),
		data
	);
};

const writeComponent = async function(file) {
	try {
		await buildFile(file, ".tsx", await BUILD.TSX(file, settings.options));
		await buildFile(file, ".css", await BUILD.CSS(file, settings.options));
		await buildFile(file, ".e2e.ts", await BUILD.E2E(file, settings.options));
		await buildFile(file, ".spec.ts", await BUILD.SPEC(file, settings.options));
		console.log(`\t${green("✔")} ${file.name}`);
	} catch (err) {
		console.log(`\t${red("×")} ${file.name} ${err}`);
	}
};

function logResult() {
	// Log it all\

	console.log("\n");
	console.log(
		`\t${bold("Generating")} ${bgWhite().black(" Stencil ")} ${bold(
			"web components from svg files."
		)}`
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
			settings.files.forEach((file, i) => {
				mkdirp(path.join(settings.dest, fileName(file.name)), function(err) {
					writeComponent(file);

					if (settings.files.length == i + 1)
						setTimeout(() => {
							console.log(`\n`);
						}, 10);
				});
			});
		}
	} else {
		console.log(`\tdefine --src and --dest`);
		process.exit(1);
	}
}
