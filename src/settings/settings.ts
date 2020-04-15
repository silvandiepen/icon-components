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
			type: 'string',
			default: null,
			alias: 'listTemplate'
		},
		ir: { required: false, type: 'boolean', default: false, alias: 'inRoot' },
		type: {
			required: false,
			type: 'string',
			default: null
		},

		ro: { type: 'boolean', default: false, alias: 'removeOld' }
	}).argv;

	return {
		src: cs.src,
		dest: cs.dest,
		optimize: cs.o,
		template: cs.t,
		inRoot: cs.ir,
		removeOld: cs.ro,
		prefix: cs.p,
		list: cs.lt ? cs.lt : cs.l, // If the listTemplate is set, the list is true otherwise, set the value of list.
		listTemplate: cs.lt,
		type: cs.type
	};
};
