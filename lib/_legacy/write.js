const fs = require("fs").promises;
const path = require("path");
const ejs = require("ejs");
const { asyncForEach, fileName } = require("./helpers");
const log = require("cli-block");

const write = {};

write.CREATE_COMPONENTS = async (data) => {
	const components = [];
	await asyncForEach(data.files, async (file) => {
		await asyncForEach(data.templates, (template) => {
			const componentFileName = fileName(template.file, data.settings, [
				template.file,
				file.name
			]);

			let destination = path.join(
				data.settings.dest,
				file.name,
				componentFileName
			);
			if (data.settings.inRoot)
				destination = path.join(data.settings.dest, componentFileName);

			components.push({
				file: componentFileName,
				dest: destination,
				data: ejs.render(template.data, {
					...data.settings,
					...file
				})
			});
		});
	});
	return { ...data, components: components };
};

write.WRITE_COMPONENTS = async (data) => {
	await asyncForEach(data.components, async (file) => {
		// console.log("Writing file:", file.dest, path.join(path.dirname(file.dest)));

		await fs.mkdir(path.join(__dirname, "../", path.dirname(file.dest)), {
			recursive: true
		});

		// await fs
		// 	.lstat(path.join(path.dirname(file.dest)))
		// 	.then((res) => {
		// 		console.log(res);
		// 	})
		// 	.catch(async (err) => {
		// 		console.log("kutver, een error! Hier issie..; ");
		// 		console.log(err);
		// 	});
		await fs
			.writeFile(file.dest, file.data)
			.finally(() => {
				log.BLOCK_LINE_SUCCESS(file.dest);
			})
			.catch((err) => {
				LOG.BLOCK_LINE_ERROR(file.dest + err);
			});
	});
	return data;
};

module.exports = write;
