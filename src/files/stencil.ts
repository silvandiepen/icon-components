import ejs from 'ejs';
import { kebabCase, PascalCase, fileName, prefixedName } from '../helpers';
import svgtojsx from 'svg-to-jsx';
import { getTemplate } from '../get';

export const STENCIL_SPEC = async (fileData: any, settings: any) => {
	const currentFileName = prefixedName(fileData.name, settings.prefix);
	let template = await getTemplate('stencil_spec');

	return ejs.render(template, {
		title: PascalCase(currentFileName),
		filename: settings.prefix
			? settings.prefix
			: `icon-${kebabCase(fileName(fileData.name))}`
	});
};
export const STENCIL_E2E = async (fileData: any, settings: any) => {
	const currentFileName = prefixedName(fileData.name, settings.prefix);
	let template = await getTemplate('stencil_e2e');

	return ejs.render(template, {
		title: PascalCase(currentFileName),
		filename: settings.prefix
			? settings.prefix
			: `icon-${kebabCase(fileName(fileData.name))}`
	});
};
export const STENCIL_CSS = async (fileData: any, settings: any) => {
	let template = await getTemplate('stencil_css');

	return ejs.render(template, {
		settings: settings,
		file: fileData
	});
};

export const STENCIL_TSX = async (fileData: any, settings: any) => {
	const currentFileName = prefixedName(fileData.name, settings.prefix);
	let template = await getTemplate('stencil_tsx');

	return await svgtojsx(fileData.data).then(function (jsx) {
		return ejs.render(template, {
			data: jsx,
			fileName: currentFileName,
			title_lowercase: kebabCase(fileName(fileData.name)),
			title: PascalCase(currentFileName)
		});
	});
};
