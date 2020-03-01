const files = {};
const fs = require("fs").promises;
const path = require("path");
const rimraf = require("rimraf");
const { PascalCase, kebabCase, asyncForEach } = require("./helpers");

const junk = require("junk");

files.GET_FILES = async (data) => {
	try {
		const files = await fs.readdir(data.settings.src).then((result) => {
			return result.filter(junk.not).map((file) => {
				return {
					file: file,
					path: path.join(data.settings.src, file)
				};
			});
		});
		return { ...data, files: files };
	} catch (err) {
		console.log(err);
	}
};

files.GET_DEEP_FILES = async (data) => {
	if (!data.settings.deep) return data;

	let deepFiles = [];
	let deepFolders = [];
	// console.log(data.files);
	await asyncForEach(data.files, async (file) => {
		await fs.readdir(path.join(data.settings.src, file.file)).then((result) => {
			const filteredResults = result.filter(junk.not).map((f) => {
				return {
					file: f,
					dir: file.file,
					path: path.join(data.settings.src, file.file, f)
				};
				// });
			});
			deepFiles = [...deepFiles, ...filteredResults];
		});
	});
	return { ...data, files: deepFiles };
};

files.CAST_TYPES = (data) => {
	try {
		const mappedFiles = data.files.map((file) => {
			const fileType = path.extname(path.join(__dirname, file.file));
			const fileName = fileType
				? file.file.slice(0, fileType.length * -1)
				: file.file;
			return {
				...file,
				name: kebabCase(fileName),
				ogName: fileName,
				component: PascalCase(file.file),
				type: fileType
			};
		});
		return { ...data, files: mappedFiles };
	} catch (err) {
		console.log(err);
	}
};

files.REMOVE_DOTFILES = (data) => {
	try {
		const filteredFiles = data.files.filter((item) => {
			return item.file.charAt(0) === "." ? false : true;
		});
		const filteredTemplates = data.templates.filter((item) => {
			return item.file.charAt(0) === "." ? false : true;
		});
		return { ...data, files: filteredFiles, templates: filteredTemplates };
	} catch (err) {
		console.log(err);
	}
};

files.REMOVE_FOLDERS = (data) => {
	try {
		const filteredFiles = data.files.filter(async (item) => {
			let stats = await fs.lstat(item.path);
			return stats.isFile() ? true : false;
		});
		const filteredTemplates = data.templates.filter(async (item) => {
			let stats = await fs.lstat(item.path);
			return stats.isFile() ? true : false;
		});

		// console.log(filteredTemplates);
		return { ...data, files: filteredFiles, templates: filteredTemplates };
	} catch (err) {
		console.log(err);
	}
};

files.FILTER_TYPES = (data) => {
	try {
		const filteredFiles = data.files.filter((item) => {
			if (item.type == ".svg") {
				return item;
			}
		});
		return { ...data, files: filteredFiles };
	} catch (err) {
		console.log(err);
	}
};

files.GET_FILE_DATA = async (data) => {
	try {
		return Promise.all(
			data.files.map(async (file) => {
				return {
					...file,
					data: await fs.readFile(file.path).then((result) => {
						// console.log(result.toString());
						return result.toString();
					})
				};
			})
		).then((result) => {
			return { ...data, files: result };
		});
	} catch (err) {
		console.log(err);
	}
};

files.CLEANUP_DEST = async (data) => {
	if (data.settings.removeOld)
		await rimraf.sync(data.settings.dest + "/*", {}, () => {
			console.log("Cleaned destination folder");
		});
	return data;
};

module.exports = files;
