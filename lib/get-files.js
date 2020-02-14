const GET = {};
const fsp = require("fs").promises;
const SVGO = require("svgo");
const path = require("path");
const { join } = require("path");
const settings = require("./settings");

const { kebabCase, fileName } = require("./helpers.js");

GET.SrcFiles = async (log) => {
	try {
		// Get the files
		await GET.FolderList();
		await GET.FileList();
		await GET.FilesData();
	} catch (err) {
		console.log(err);
	}
	return log;
};

GET.Files = async (files) => {
	files.map((fileName) => {
		if (path.extname(fileName) == ".svg") {
			try {
				settings.filelist.push(fileName);
			} catch (err) {
				console.log(err);
			}
		} else {
			console.log(fileName, "is not a valid icon file");
		}
	});
	return;
};

GET.FolderList = async () => {
	if (!settings.deep) return;

	let directories = await fsp.readdir(settings.src);
	settings.srcFolders = [];
	directories.forEach(async (dir) => {
		const stats = await fsp.lstat(join(settings.src, dir));

		if (stats.isDirectory()) {
			console.log(dir, "is a directory");
			settings.srcFolders.push(dir);
		}

		// console.log(dir, typeof dir);
	});
	return;
};

GET.FileList = async () => {
	let files = [];
	if (settings.srcFolders) {
		console.log(settings.srcFolders);
		settings.srcFolders.forEach(async (dir) => {
			allFiles = await fsp.readdir(join(settings.src, dir));
			files = [...files, ...allFiles];
		});
	} else {
		allFiles = await fsp.readdir(settings.src);
		files = allFiles;
	}
	console.log(files);
	GET.Files(files);
	return;
};

GET.FilesData = async () => {
	// Go through each file and write it to the settings.
	let files = [];

	const svgo = new SVGO({
		removeAttrs: {
			attrs: ["xmlns"]
		}
	});

	await Promise.all(
		settings.filelist.map(async (srcFileName) => {
			try {
				await GET.FileData(srcFileName).then((fileData) => {
					const optimizedSVG = svgo.optimize(fileData).then((result) => {
						if (settings.optimize) fileData = optimizedSVG.data;
					});

					let file = { name: kebabCase(fileName(srcFileName)), data: fileData };
					settings.files.push(file);
				});
			} catch (err) {
				console.warn(err);
			}
		})
	);
};

GET.FileData = async (srcFileName) => {
	console.log(srcFileName);
	try {
		return fsp.readFile(join(settings.src, srcFileName)).then((file) => {
			return file.toString();
		});
	} catch (err) {
		console.warn(err);
	}
};

module.exports = GET;
