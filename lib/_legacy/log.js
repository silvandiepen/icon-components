const log = {};
const path = require("path");
const { red, yellow, bgBlue, blue, green, bold, italic } = require("kleur");
const {
	asyncForEach,
	spaces,
	repeat,
	centerText,
	stylelizeValue
} = require("./helpers");
let totalLength = 100;

// let block = {
// 	line: gray("═"),
// 	midLine: gray("─"),
// 	side: gray("║"),
// 	topStart: gray("╔"),
// 	topEnd: gray("╗"),
// 	bottomStart: gray("╚"),
// 	bottomEnd: gray("╝"),
// 	midStart: gray("╟"),
// 	midEnd: gray("╢")
// };
let block = {
	line: yellow("━"),
	midLine: yellow("─"),
	side: yellow("┃"),
	topStart: yellow("┏"),
	topEnd: yellow("┓"),
	bottomStart: yellow("┗"),
	bottomEnd: yellow("┛"),
	midStart: yellow("┠"),
	midEnd: yellow("┨")
};

exports.START = (data) => {
	console.log("\n");
	let title = "ICON";
	if (data.settings.template) title = data.settings.template.toUpperCase();
	console.log(
		`\t${bold("Generating")} ${bgBlue()
			.bold()
			.black(" " + title + " ")} ${bold("components from svg files.")}`
	);
	console.log("\n");
	return data;
};

exports.LINE = (data = null, txt = null) => {
	let msg = "";
	if (txt) msg = txt;
	// console.log(msg.length, totalLength - msg.length);
	console.log(
		`${block.side}${spaces(10)}${msg}${spaces(totalLength - 10, msg)}${
			block.side
		}`
	);
	return data;
};

exports.LINE_SUCCESS = (msg) => {
	let fileName = `${green("✔")} ${msg}`;
	exports.LINE(null, fileName);
};
exports.LINE_ERROR = (msg) => {
	let fileName = `${red("×")} ${msg}`;
	exports.LINE(null, fileName);
};

exports.WRITE_FILE = async (msg) => {
	exports.LINE(null, msg);
};
exports.WRITE_FILE_SUCCESS = (msg) => {
	exports.LINE_SUCCESS(msg);
};
exports.WRITE_FILE_ERROR = (msg) => {
	exports.LINE_ERROR(msg);
};

exports.START_BLOCK = (data = null, txt = null) => {
	if (txt)
		console.log(
			`${block.topStart}${repeat(30, block.line)}${centerText(
				totalLength - 60,
				txt
			)}${repeat(30, block.line)}${block.topEnd}`
		);
	else
		console.log(
			`${block.topStart}${repeat(totalLength, block.line)}${block.topRight}`
		);
	exports.LINE();
	return data;
};
exports.MID_BLOCK = (data = null, txt = null) => {
	if (txt)
		console.log(
			`${block.midStart}${repeat(30, block.midLine)}${centerText(
				totalLength - 60,
				bold(txt)
			)}${repeat(30, `${block.midLine}`)}${block.midEnd}`
		);
	else
		console.log(
			`${block.midStart}${repeat(totalLength, block.midLine)}${block.midEnd}`
		);
	exports.LINE();
	return data;
};
exports.END_BLOCK = (data = null) => {
	exports.LINE();
	console.log(
		`${block.bottomStart}${repeat(totalLength, `${block.line}`)}${
			block.bottomEnd
		}`
	);
	return data;
};

exports.FILES = async (data) => {
	await asyncForEach(data.files, (file) => {
		let fileName = file.name;
		exports.LINE(
			null,
			`${yellow("✒")} ${file.dir ? blue(file.dir + "/") : ""}${bold(
				fileName
			)}${italic().blue(".svg")}`
		);
	});
	exports.LINE();
	return data;
};

exports.NO_FILES = (data) => {
	if (data.files.length < 1)
		data.error.push(
			`${red("No SVG files are found in your src; ")}${bold(data.settings.src)}`
		);
	exports.ERRORS(data);
	return data;
};

exports.ERRORS = (data) => {
	if (data.error.length < 1) return false;
	exports.LINE();
	exports.MID_BLOCK(null, `${red("× Errors")}`);
	data.error.forEach((error) => {
		exports.LINE_ERROR(error);
	});
	exports.END_BLOCK();
	process.exit();
};

exports.SETTINGS = async (data) => {
	let lines = [];
	Object.keys(data.settings).forEach((value) => {
		let styledValue = stylelizeValue(data.settings[value]);
		let error;
		switch (value) {
			case "src":
			case "dest":
			case "template":
				if (!data.settings[value]) error = true;
				break;
			default:
				error = false;
				break;
		}

		if (error) styledValue = `${red("×")} ${styledValue}`;
		let settingLine = `${bold(value)}${spaces(20, value)}${styledValue}`;

		lines.push(settingLine);
	});

	lines.forEach((line) => {
		exports.LINE(null, line);
	});

	if (!exports.ERRORS(data)) exports.LINE();

	return data;
};
