const fs = require("fs").promises;
const path = require("path");
const list = {};
const { asyncForEach } = require("./helpers.js");

list.CREATE_LISTS = async (data) => {
	if (!data.settings.list) return data;

	// console.log(typeof data.settings.list);
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

list.GET_LIST_TEMPLATES = async (data) => {
	if (!data.settings.list) return data;

	let templates = [];
	if (typeof data.settings.list == "string") {
		const stats = await fs.lstat(data.settings.list);

		if (stats.isFile())
			templates.push({
				file: path.basename(data.settings.list),
				path: data.settings.list
			});
		else if (stats.isDirectory()) {
			await fs.readdir(data.settings.list).then((result) => {
				return result.map((file) => {
					templates.push({
						// name: data.settings.options.template,
						file: file,
						path: path.join(data.settings.list, file)
					});
				});
			});
		}
	} else {
		let localTemplate = "templates/list.json.template";
		templates.push({ file: path.basename(localTemplate), path: localTemplate });
	}
	return { ...data, list: { templates: templates } };
};
list.WRITE_LISTS = async (data) => {
	if (!data.settings.list || !data.list || (data.list && !data.list.length < 1))
		return data;
	console.log("haaaai");

	await asyncForEach(data.list, (list) => {
		console.log(list);
	});

	return data;
};

module.exports = list;
