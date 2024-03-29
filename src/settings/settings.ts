// @ts-nocheck
import yargs from 'yargs';
import { getArgs } from '@sil/args';

import { SettingsType } from '@/types';

export const defaultSettings: SettingsType = {
	src: '',
	dest: '',
	styleDir: '',
	optimize: true,
	template: null,
	inRoot: false,
	copy: [],
	removeOld: false,
	removePrefix: '',
	removeAffix: '',
	removeString: '',
	stripStyle: false,
	prefix: '',
	list: false,
	listTemplate: [],
	type: '',
	removeStyle: false,
	removeAttrs: ['fill', 'id', 'class'],
	removeTags: ['svg'],
	svgOnly: false,
	index: false,
	indexTemplate: [],
	types: false,
	typesTemplate: [],
	parentIndex: false,
	prependLine: '',
	iconFolder: '',
	filter: ''
}

export const settings = (): SettingsType => {

	const args = getArgs();
	
	return {
		src: args.src || defaultSettings.src,
		dest: args.dest || defaultSettings.dest,
		styleDir: args.styleDir || defaultSettings.styleDir,
		optimize: args.optimize || defaultSettings.optimize,
		template: args.template || defaultSettings.template,
		inRoot: args.inRoot || defaultSettings.inRoot,
		copy: args.copy || defaultSettings.copy,
		removeOld: args.removeOld || defaultSettings.removeOld,
		removePrefix: args.removePrefix || defaultSettings.removePrefix,
		removeAffix: args.removeAffix || defaultSettings.removeAffix,
		removeString: args.removeString || defaultSettings.removeString,
		stripStyle: args.stripStyle || defaultSettings.stripStyle,
		prefix: args.prefix || defaultSettings.prefix,
		list: args.list || defaultSettings.list,
		listTemplate: args.listTemplate || defaultSettings.listTemplate,
		type: args.type || defaultSettings.type,
		removeStyle: args.removeStyle || defaultSettings.removeStyle,
		removeAttrs: args.removeAttrs || defaultSettings.removeAttrs,
		removeTags: args.removeTags || defaultSettings.removeTags,
		svgOnly: args.svgOnly || defaultSettings.svgOnly,
		index: args.index || defaultSettings.index,
		indexTemplate: args.indexTemplate || defaultSettings.indexTemplate,
		types: args.types || defaultSettings.types,
		typesTemplate: args.typesTemplate || defaultSettings.typesTemplate,
		parentIndex: args.parentIndex || defaultSettings.parentIndex,
		prependLine: args.prependLine || defaultSettings.prependLine,
		iconFolder: args.iconFolder || defaultSettings.iconFolder,
		filter: args.filter || defaultSettings.filter
	}
};
