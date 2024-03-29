// @ts-nocheck
import yargs from 'yargs';

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
	const cs = yargs.options({
		src: { required: true, type: 'string', default: defaultSettings.src, alias: 'source' },
		dest: {
			required: true,
			type: 'string',
			default: defaultSettings.dest,
			alias: 'destination'
		},
		sd: { required: true, type: 'string', default: defaultSettings.styleDir, alias: 'styleDir' },
		o: { required: false, type: 'boolean', default: defaultSettings.optimize, alias: 'optimize' },
		t: { required: false, type: 'string', default: defaultSettings.template, alias: 'template' },
		p: { required: false, type: 'string', default: defaultSettings.prefix, alias: 'prefix' },
		c: { required: false, type: 'array', default: defaultSettings.copy, alias: 'copy' },
		l: {
			required: false,
			type: 'boolean',
			default: defaultSettings.list,
			alias: 'list'
		},
		lt: {
			required: false,
			type: 'array',
			default: defaultSettings.listTemplate,
			alias: 'listTemplate'
		},
		ir: { required: false, type: 'boolean', default: defaultSettings.inRoot, alias: 'inRoot' },
		type: {
			required: false,
			type: 'string',
			default: defaultSettings.type,
		},
		ra: {
			required: false,
			type: 'array',
			default: defaultSettings.removeAttrs,
			alias: 'removeAttrs'
		},
		rt: {
			required: false,
			type: 'array',
			default: defaultSettings.removeTags,
			alias: 'removeTags'
		},
		rs: {
			required: false,
			type: 'boolean',
			default: defaultSettings.removeStyle,
			alias: 'removeStyle'
		},
		ro: { type: 'boolean', default: defaultSettings.removeOld, alias: 'removeOld' },
		rmPrx: { type: 'string', default: defaultSettings.removePrefix, alias: 'removePrefix' },
		rmAfx: { type: 'string', default: defaultSettings.removeAffix, alias: 'removeAffix' },
		rmStr: { type: 'string', default: defaultSettings.removeString, alias: 'removeString' },
		ss: { type: 'boolean', default: defaultSettings.stripStyle, alias: 'stripStyle' },
		svg: { type: 'boolean', default: defaultSettings.svgOnly, alias: 'svgOnly' },
		idx: {
			required: false,
			type: 'boolean',
			default: defaultSettings.index,
			alias: 'index'
		},
		idxt: {
			required: false,
			type: 'array',
			default: defaultSettings.indexTemplate,
			alias: 'indexTemplate'
		},
		tps: {
			required: false,
			type: 'boolean',
			default: defaultSettings.types,
			alias: 'types'
		},
		tpst: {
			required: false,
			type: 'array',
			default: defaultSettings.typesTemplate,
			alias: 'typesTemplate'
		},
		pidx: {
			required: false,
			type: 'boolean',
			default: defaultSettings.parentIndex,
			alias: 'parentIndex'
		},
		ppl: {
			required: false,
			type: 'string',
			default: defaultSettings.prependLine,
			alias: 'prependLine'
		},
		if: {
			required: false,
			type: 'string',
			default: defaultSettings.iconFolder,
			alias: 'iconFolder'
		},
		ft: {
			required: false,
			type: 'string',
			default: defaultSettings.filter,
			alias: 'filter'
		}
	}).argv;




	return {
		src: cs.src,
		dest: cs.dest,
		styleDir: cs.sd,
		optimize: cs.o,
		template: cs.t,
		inRoot: cs.ir,
		copy: cs.c,
		removeOld: cs.ro,
		removePrefix: cs.rmPrx,
		removeAffix: cs.rmAfx,
		removeString: cs.rmStr,
		stripStyle: cs.ss,
		prefix: cs.p,
		list: cs.lt.filter(Boolean).length > 0 ? true : cs.l, // If the listTemplate is set, the list is true otherwise, set the value of list.
		listTemplate: cs.lt,
		type: cs.type,
		removeStyle: cs.rs,
		removeAttrs: cs.ra,
		removeTags: cs.rt,
		svgOnly: cs.svg,
		index: cs.idxt.filter(Boolean).length > 0 ? true : cs.idx, // If the indexTemplate is set, the index is true otherwise, set the value of index.
		indexTemplate: cs.idxt,
		types: cs.tpst.filter(Boolean).length > 0 ? true : cs.tps, // If the indexTemplate is set, the index is true otherwise, set the value of index.
		typesTemplate: cs.tpst,
		parentIndex: cs.pidx,
		prependLine: cs.ppl,
		iconFolder: cs.if,
		filter: cs.ft
	};
};
