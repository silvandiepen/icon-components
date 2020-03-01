const log = require("cli-block");
const { SETTINGS } = require("./settings.js");
const { WAIT } = require("../utils");

exports.START = async () => {
	await WAIT();
	log.START("Icon Component");
	return SETTINGS;
};
