#!/usr/bin/env node
const path = require("path");
const rimraf = require("rimraf");
const fsp = require("fs").promises;
const { red, yellow, bgBlue, blue, green, bold } = require("kleur");
const GET = require("./lib/get-files.js");
const LIST = require("./lib/list.js");
const ACTION = require("./lib/actions.js");
const { fileName } = require("./lib/helpers.js");
const settings = require("./lib/settings.js");

// If remove old is set, the destination folder will be removed in order to be sure all files are new.
if (settings.options.removeOld)
	async () => {
		await rimraf.sync(settings.dest + "/*", () => {
			console.log("Cleaned destination folder");
		});
	};

GET.SrcFiles().then(() => setTimeout(() => buildComponents(), 0));

const writeComponent = async function(file) {
	try {
		ACTION.BuildFile(file, settings);
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
			console.log(`\tsrc:\t ${green().italic(settings.src)} `);
		else
			console.log(
				`\tsrc:\t ${yellow().italic(settings.src)} ${red(
					"Your source folder doesn't contain any"
				) +
					red().bold(" .svg ") +
					red("files.")}`
			);

		console.log(`\tdest:\t ${green().italic(settings.dest)}`);
		console.log(`\n`);

		if (settings.files && settings.files.length > 0) {
			console.log(
				`\t${bold("Files")} ${blue().bold("(" + settings.files.length + ")")}`
			);

			if (settings.options.list) LIST.Write(settings);

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
