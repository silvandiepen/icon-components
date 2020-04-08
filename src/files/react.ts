import ejs from 'ejs';
import { PascalCase, removeTags, prefixedName } from '../helpers';
import svgtojsx from 'svg-to-jsx';
import { getTemplate } from '../get';

export const REACT_MATERIAL = async (fileData: any, options: any) => {
	const currentFileName = prefixedName(fileData.name, options.prefix);
	let template = await getTemplate('react-material');

	return ejs.render(template, {
		data: removeTags(fileData.data, ['svg', 'title']),
		title: PascalCase(currentFileName)
	});
};

export const REACT = async (fileData: any, options: any) => {
	const currentFileName = prefixedName(fileData.name, options.prefix);
	let template = await getTemplate('react');
	let svg = fileData.data;

	return await svgtojsx(svg).then(function () {
		return ejs.render(template, {
			data: svg,
			title: PascalCase(currentFileName)
		});
	});
};
