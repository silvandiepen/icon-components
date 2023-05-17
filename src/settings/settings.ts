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
		sd: { required: true, type: 'string', default: '', alias: 'styleDir' },
		o: { required: false, type: 'boolean', default: true, alias: 'optimize' },
		t: { required: false, type: 'string', default: null, alias: 'template' },
		p: { required: false, type: 'string', default: '', alias: 'prefix' },
		c: { required: false, type: 'array', default: [], alias: 'copy' },
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
		rs: {
			required: false,
			type: 'boolean',
			default: false,
			alias: 'removeStyle'
		},
		ro: { type: 'boolean', default: false, alias: 'removeOld' },
		rp: { type: 'string', default: '', alias: 'removePrefix' },
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
		},
		tps: {
			required: false,
			type: 'boolean',
			default: false,
			alias: 'types'
		},
		tpst: {
			required: false,
			type: 'array',
			default: [],
			alias: 'typesTemplate'
		},
		pidx: {
			required: false,
			type: 'boolean',
			default: false,
			alias: 'parentIndex'
		},
		ppl: {
			required: false,
			type: 'string',
			default: '',
			alias: 'prependLine'
		},
		if: {
			required: false,
			type: 'string',
			default: '',
			alias: 'iconFolder'
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
		removePrefix: cs.rp,
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
		iconFolder: cs.if
	};
};
