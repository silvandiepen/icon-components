const log = {};
const path = require("path");
const { red, yellow, gray, bgBlue, blue, green, bold } = require("kleur");
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

log.START = (data) => {
	console.log("\n");
	console.log(
		`\t${bold("Generating")} ${bgBlue().black(
			" " + data.settings.template.toUpperCase() + " "
		)} ${bold("components from svg files.")}`
	);
	console.log("\n");
	return data;
};

log.LINE = (data = null, txt = null) => {
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
log.START_BLOCK = (data = null, txt = null) => {
	if (txt)
		console.log(
			`${block.topStart}${repeat(30, block.line)}${centerText(
				totalLength - 60,
				bold(txt)
			)}${repeat(30, block.line)}${block.topEnd}`
		);
	else
		console.log(
			`${block.topStart}${repeat(totalLength, block.line)}${block.topRight}`
		);
	log.LINE();
	return data;
};
log.MID_BLOCK = (data = null, txt = null) => {
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
	log.LINE();
	return data;
};
log.END_BLOCK = (data = null) => {
	log.LINE();
	console.log(
		`${block.bottomStart}${repeat(totalLength, `${block.line}`)}${
			block.bottomEnd
		}`
	);
	return data;
};

log.FILES = async (data) => {
	await asyncForEach(data.files, (file) => {
		let fileName = file.name;
		log.LINE(null, `${file.dir ? blue(file.dir + "/") : ""}${bold(fileName)}`);
	});
	log.LINE();
	return data;
};

log.WRITE_FILE = async (msg) => {
	let fileName = `${msg}`;
	log.LINE(null, fileName);
};
log.WRITE_FILE_SUCCESS = async (msg) => {
	let fileName = `${green("✔")} ${msg}`;
	log.LINE(null, fileName);
};
log.WRITE_FILE_ERROR = async (file) => {
	let fileName = `${red("×")} ${msg}`;
	log.LINE(null, fileName);
};

log.SETTINGS = async (data) => {
	Object.keys(data.settings).forEach((value) => {
		let styledValue = stylelizeValue(data.settings[value]);
		let settingLine = `${bold(value)}${spaces(20, value)}${styledValue}`;
		// console.log(
		// 	settingLine.length,
		// 	totalLength - settingLine.length,
		// 	totalLength
		// );

		log.LINE(null, settingLine);
	});
	log.LINE();

	return data;
};

module.exports = log;
