#!/usr/bin/env node
// const path = require("path");
// const rimraf = require("rimraf");
// const fsp = require("fs").promises;
// const { red, yellow, bgBlue, blue, green, bold } = require("kleur");
// const GET = require("./lib/get-files.js");
// const LIST = require("./lib/list.js");
// const ACTION = require("./lib/actions.js");
// const { fileName } = require("./lib/helpers.js");
const {
	settings,
	files,
	templates,
	check,
	write,
	log,
	list
} = require("./lib");

settings
	.HAS_NECESSARY_ARGUMENTS()
	.then(log.START)
	.then((res) => log.START_BLOCK(res, "Settings"))
	.then(log.SETTINGS)
	.then(files.CLEANUP_DEST)
	.then(check.DOES_SRC_EXIST)
	.then(files.GET_FILES)
	.then(files.GET_DEEP_FILES)
	.then(files.CAST_TYPES)
	.then(files.FILTER_TYPES)
	.then((res) => log.MID_BLOCK(res, "Get SVG files"))
	.then(log.FILES)
	.then(templates.IS_EXT_TEMPLATE)
	.then(templates.GET_INT_TEMPLATE)
	.then(templates.GET_EXT_TEMPLATE)
	.then(templates.GET_EXT_TEMPLATES)
	.then(files.REMOVE_DOTFILES)
	.then(files.REMOVE_FOLDERS)
	.then(files.GET_FILE_DATA)
	.then(templates.GET_TEMPLATE_DATA)
	.then(write.CREATE_COMPONENTS)
	.then(check.DOES_DEST_EXIST)
	.then((res) => log.MID_BLOCK(res, "Build Components"))
	.then(write.WRITE_COMPONENTS)
	.then(log.END_BLOCK)
	.then(list.CREATE_LISTS)
	.then(list.WRITE_LISTS)
	// .then(WRITE_LISTS)
	.then((result) => {
		result.settings.log ? console.log(result.components) : null;
	});

// const writeComponent = async function(file) {
// 	try {
// 		ACTION.BuildFile(file, settings);
// 		console.log(`\t${green("✔")} ${file.name}`);
// 	} catch (err) {
// 		console.log(`\t${red("×")} ${file.name} ${err}`);
// 	}
// };

// function buildComponents() {
// 	// Log it all\

// 	if (settings.src && settings.dest) {
// 		if (settings.files && settings.files.length > 0)
// 			console.log(`\tsrc:\t ${green().italic(settings.src)} `);
// 		else
// 			console.log(
// 				`\tsrc:\t ${yellow().italic(settings.src)} ${red(
// 					"Your source folder doesn't contain any"
// 				) +
// 					red().bold(" .svg ") +
// 					red("files.")}`
// 			);

// 		console.log(`\tdest:\t ${green().italic(settings.dest)}`);
// 		console.log(`\n`);

// 		if (settings.files && settings.files.length > 0) {
// 			console.log(
// 				`\t${bold("Files")} ${blue().bold("(" + settings.files.length + ")")}`
// 			);

// 			if (settings.options.list) LIST.Write(settings);

// 			settings.files.forEach(async (file, i) => {
// 				if (!settings.options.inRoot)
// 					await fsp.mkdir(path.join(settings.dest, fileName(file.name)), {
// 						recursive: true,
// 						mode: 0o775
// 					});

// 				writeComponent(file);

// 				if (settings.files.length == i + 1) {
// 					setTimeout(() => {
// 						console.log(" Done! ");
// 						console.log(`\n`);
// 					}, 1000);
// 				}
// 			});
// 		}
// 	} else {
// 		console.log(`\tdefine --src and --dest`);
// 		process.exit(1);
// 	}
// }
