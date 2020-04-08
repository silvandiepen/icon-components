import SVGO from 'svgo';
import path from 'path';

import { promises as fs } from 'fs';
import { kebabCase, asyncForEach, WAIT, fileName } from './helpers';

export const getSourceFiles = async (settings) => {
	await WAIT();
	return { ...settings };
};

const getFileData = async (filedata, srcFileName: string) => {
	try {
		return fs.readFile(path.join(filedata.src, srcFileName)).then((file) => {
			return file.toString();
		});
	} catch (err) {
		console.warn(err);
	}
};

export const getFileList = async (data) => {
	// Genereate a list of svg files from the source folder.
	let files = await fs.readdir(data.src);

	await asyncForEach(files, async (fileName) => {
		if (path.extname(fileName) == '.svg') {
			try {
				data.filelist.push(fileName);
			} catch (err) {
				console.log(err);
			}
		}
	});
	return data;
};

export const getDataFromFiles = async (data) => {
	const svgo = new SVGO({
		removeAttrs: {
			attrs: ['xmlns']
		}
	});

	await asyncForEach(data.filelist, async (file) => {
		try {
			await getFileData(data, file).then((fileData) => {
				const optimizedSVG = svgo.optimize(fileData).then((result) => {
					if (data.optimize) fileData = optimizedSVG.data;
				});

				data.files.push({ name: kebabCase(fileName(file)), data: fileData });
			});
		} catch (err) {
			console.warn(err);
		}
	});

	return data;
};

// Get the template
export const getTemplate = async (
	srcFileName: string,
	external: boolean = false
) => {
	let currentPath = external
		? srcFileName
		: path.join(__dirname, '../src/templates', srcFileName + '.template');
	try {
		return fs.readFile(currentPath).then((file) => {
			return file.toString();
		});
	} catch (err) {
		console.warn(err);
	}
};
