const { makePrefix } = require("./helpers.js");
const argv = require("yargs").argv;
const { red } = require("kleur");
const settings = {};

settings.DATA = {
	src: argv.src,
	dest: argv.dest,
	template: argv.template ? argv.template : false,
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
	let error = false;
	await makeItAPromise();
	if (!settings.DATA.template) {
		console.log(`- ${red("You didn't specify a template")}`);
		error = true;
	}
	if (!settings.DATA.src) {
		console.log(`- ${red("You didn't specify a source")}`);
		error = true;
	}
	if (!settings.DATA.dest) {
		console.log(`- ${red("You didn't specify a destination")}`);
		error = true;
	}
	if (!error) return { settings: settings.DATA };
	else process.exit();
};

module.exports = settings;
