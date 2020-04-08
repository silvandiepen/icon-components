import yargs from 'yargs';

export const settings = yargs.options({
	src: { type: 'string', default: null },
	dest: { type: 'string', default: null },
	ext: { type: 'string', default: null },
	filelist: { type: 'array', default: [] },
	files: { type: 'array', default: [] },
	error: { type: 'array', default: [] },
	template: { type: 'string', default: null },
	inRoot: { type: 'boolean', default: false },
	removeOld: { type: 'boolean', default: false },
	prefix: { type: 'string', default: '' },
	list: { type: 'array', default: [] }
}).argv;
