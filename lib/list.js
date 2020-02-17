const fs = require("fs").promises;
const list = {};

list.CREATE_LISTS = async (data) => {
	if (!data.settings.list) return data;

	console.log(typeof data.settings.list);
	return data;
	// if (typeof data.settings.list == "boolean") {
	// 	console.log("Ok, use the basic internal one.");
	// 	return data;
	// } else {
	// 	await fs
	// 		.lstat(data.settings.list)
	// 		.then((res) => {
	// 			console.log(res);
	// 		})
	// 		.catch(async (err) => {
	// 			console.log("kutver, een error! Hier issie..; ");
	// 			console.log(err);
	// 		});
	// }
	// return data;
};
list.WRITE_LISTS = (data) => {
	if (!data.settings.list) return data;
	return data;
};

module.exports = list;
