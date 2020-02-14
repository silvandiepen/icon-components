const { makePrefix } = require("./helpers.js");
const argv = require("yargs").argv;

let settings = {
	src: argv.src,
	dest: argv.dest,
	deep: argv.deep,
	optimize: argv.optimize,
	filelist: [],
	files: [],
	error: null,
	options: {
		template: argv.template ? argv.template : false,
		inRoot: argv.inRoot ? true : false,
		removeOld: argv.removeOld ? true : false,
		prefix: makePrefix(argv.prefix),
		list: argv.list ? argv.list : false
	}
};

module.exports = settings;
