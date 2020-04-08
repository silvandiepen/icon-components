import ejs from 'ejs';
import { PascalCase, removeTags, removeAttrs, prefixedName } from '../helpers';
import { getTemplate } from '../get';

export const FROM_TEMPLATE = async (fileData: any, settings: any) => {
	let template = await getTemplate(settings.template, true);
	return ejs.render(template, {
		...settings,
		data: fileData,
		data_clean: removeAttrs(fileData.data, ['id', 'fill']),
		data_stripped: removeAttrs(removeTags(fileData.data, ['svg', 'title']), [
			'id',
			'fill'
		]),
		name: fileData.name,
		title: PascalCase(fileData.name),
		title_lowercase: fileData.name.toLowerCase(),
		fileName: prefixedName(fileData.name, settings.prefix),
		componentName: PascalCase(prefixedName(fileData.name, settings.prefix))
	});
};
