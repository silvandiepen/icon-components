const fs = require("fs").promises;

const check = {};

check.DOES_DEST_EXIST = async (data) => {
	let stats = await fs.lstat(data.settings.dest);
	if (stats.isDirectory()) {
		return data;
	} else {
		await fs.mkdir(data.settings.dest, "0777", true);
	}

	return data;
};

check.DOES_SRC_EXIST = async (data) => {
	let stats = await fs.lstat(data.settings.src);
	if (!stats.isDirectory()) {
		console.log("Your Source folder doesn't exist or it not correct");
		process.exit();
	} else {
		return data;
	}
};

module.export = check;
