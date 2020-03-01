const { makePrefix } = require("./helpers.js");
const argv = require("yargs").argv;
const { red } = require("kleur");
const settings = {};

settings.DATA = {
	src: argv.src,
	dest: argv.dest,
	template: argv.template,
	prefix: makePrefix(argv.prefix),
	list: argv.list ? argv.list : false,
	deep: argv.deep ? argv.deep : false,
	optimize: argv.optimize ? argv.optimize : false,
	inRoot: argv.inRoot ? argv.inRoot : false,
	removeOld: argv.removeOld ? true : false,
	log: argv.log ? argv.log : false
};

function makeItAPromise() {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve("resolved");
		}, 100);
	});
}

settings.HAS_NECESSARY_ARGUMENTS = async () => {
	let errors = [];
	await makeItAPromise();
	if (!settings.DATA.template) {
		errors.push(` ${red("You didn't specify a template")}`);
	}
	if (!settings.DATA.src) {
		errors.push(` ${red("You didn't specify a source")}`);
	}
	if (!settings.DATA.dest) {
		errors.push(` ${red("You didn't specify a destination")}`);
	}
	return { settings: settings.DATA, error: errors };
};

module.exports = settings;
