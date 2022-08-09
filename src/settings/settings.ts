
// @ts-nocheck
import yargs from 'yargs';

import { SettingsType } from '../types';

export const settings = (): SettingsType => {
	const cs = yargs.options({
		src: { required: true, type: 'string', default: null, alias: 'source' },
		dest: {
			required: true,
			type: 'string',
			default: null,
			alias: 'destination'
		},
		o: { required: false, type: 'boolean', default: true, alias: 'optimize' },
		t: { required: false, type: 'string', default: null, alias: 'template' },
		p: { required: false, type: 'string', default: '', alias: 'prefix' },
		l: {
			required: false,
			type: 'boolean',
			default: false,
			alias: 'list'
		},
		lt: {
			required: false,
			type: 'array',
			default: [],
			alias: 'listTemplate'
		},
		ir: { required: false, type: 'boolean', default: false, alias: 'inRoot' },
		type: {
			required: false,
			type: 'string',
			default: null
		},
		ra: {
			required: false,
			type: 'array',
			default: ['fill', 'id', 'class'],
			alias: 'removeAttrs'
		},
		rt: {
			required: false,
			type: 'array',
			default: ['svg'],
			alias: 'removeTags'
		},
		ro: { type: 'boolean', default: false, alias: 'removeOld' },
		ss: { type: 'boolean', default: false, alias: 'stripStyle' },
		svg: { type: 'boolean', default: false, alias: 'svgOnly' },
		idx: {
			required: false,
			type: 'boolean',
			default: false,
			alias: 'index'
		},
		idxt: {
			required: false,
			type: 'array',
			default: [],
			alias: 'indexTemplate'
		}
	}).argv;

	return {
		src: cs.src,
		dest: cs.dest,
		optimize: cs.o,
		template: cs.t,
		inRoot: cs.ir,
		removeOld: cs.ro,
		stripStyle: cs.ss,
		prefix: cs.p,
		list: cs.lt.filter(Boolean).length > 0 ? true : cs.l, // If the listTemplate is set, the list is true otherwise, set the value of list.
		listTemplate: cs.lt,
		type: cs.type,
		removeAttrs: cs.ra,
		removeTags: cs.rt,
		svgOnly: cs.svg,
		index: cs.idxt.filter(Boolean).length > 0 ? true : cs.idx, // If the indexTemplate is set, the index is true otherwise, set the value of index.
		indexTemplate: cs.idxt
	};
};
